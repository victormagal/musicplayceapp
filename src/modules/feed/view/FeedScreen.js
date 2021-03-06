import React from 'react';
import {
  FlatList, ScrollView, StyleSheet, View, ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';
import {
  MPUser, MPUserFull, MPFeedNotification, MPHeader, MPTabBar, MPText,
  MPTextField, MPIconButton, MPConfirmStopFollow, MPUserNotification, MPLoading
} from '../../../components'
import {MPSearchRedIcon, MPCloseFilledRedIcon} from '../../../assets/svg';
import {fetchFeeds, getFollowNotifications, followUser, stopFollowUser} from '../../../state/action';
import Toast from 'react-native-easy-toast';

class FeedScreenContainer extends React.Component {

  searchTimer = null;
  swiperRef = null;

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      textValue: '',
      searching: false,
      searchingNotFound: false,
      feed: null,
      songsListOne: [],
      songsListTwo: [],
      followSuccess: null
  };
    this.swiperRef = React.createRef();
  }

  handleEndlessNotifications = () => {
    let {meta} = this.props.userFollowNotifications;
    let current_page = meta.pagination.current_page;
    if(this.state.userFollowNotifications.length > 0 &&
        current_page < meta.pagination.total_pages){
      this.props.dispatch(getFollowNotifications(current_page + 1));
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchFeeds(''));
    this.props.dispatch(getFollowNotifications());
  }

  componentWillReceiveProps(nextProps) {
    const {feed, userFollowNotifications} = nextProps;
    const {searching} = this.state;
    if (feed) {
      if (feed.artists && feed.artists.length === 0 &&
        feed.songs && feed.songs.length === 0
        && searching
      ) {
        this.setState({searchingNotFound: true});
      }

      this.setState({feed, ...this.splitSongs(feed.songs), searchingNotFound: false});
    }

    if (userFollowNotifications) {
      const followingNotifications = userFollowNotifications.data.map((notification, index) => {
        return {
          id: index,
          type: notification.attributes.type,
          data: JSON.parse(notification.attributes.data),
          time: notification.attributes.time
        };
      });
      this.setState({userFollowNotifications: followingNotifications});
    }
  }

  componentWillUnmount() {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
  }

  splitSongs = (songs) => {
    let songsListOne = [];
    let songsListTwo = [];

    if(songs && songs.length) {
      songsListOne = songs.slice(0, 3);
      songsListTwo = songs.slice(3);
    }

    return {songsListOne, songsListTwo};
  };

  handleNavigateMusic = (song) => {
    this.props.navigation.navigate('player', {song});
  };

  handleNavigateUserProfile = (userId) => {
    this.props.navigation.navigate('userProfile', {userId});
  };

  handleSearchChange = (textValue) => {
    this.setState({textValue});

    if (textValue.length >= 3) {
      this.handleSearch(textValue);
      return;
    }

    if (textValue) {
      this.setState({searching: true, searchingNotFound: false});
    } else {
      this.handleClearClick();
    }
  };

  handleSearch = (value) => {

    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }

    this.searchTimer = setTimeout(() => {
      this.props.dispatch(fetchFeeds(value));
      this.setState({searching: true});
      clearTimeout(this.searchTimer);
    }, 800);
  };

  handleClearClick = () => {
    this.setState({textValue: '', feed: {}, searching: false, searchingNotFound: false});
    this.props.dispatch(fetchFeeds(''));
  };

  handleChangeTab = (index) => {
    this.swiperRef.current.scrollBy(index === 1 ? 1 : -1, true);
    this.setState({tabIndex: index});
  };

  handleChangeTabSwipe = (index) => {
    this.setState({tabIndex: index});
  };

  renderSearchUsers = (from, {item}) => {
    return (
      <MPUser
        key={item.id}
        user={item}
        onPress={() => this.handleNavigateUserProfile(item.id)}
        onToggleFollowUser={this.handleToggleFollowUser.bind(this, from)}
        hideSettings={this.props.loggedUser.id === item.id}
      />
    );
  };

  handleSongNavigate = (song) => {
    this.props.navigation.navigate('player', {song});
  };

  handleToggleFollowUser = (from, user) => {
    if (user.isFollowing) {
      this.props.dispatch(stopFollowUser(user, from));
      this.refs.toast.show('Parou de seguir este usu??rio');
      // this.props.navigation.navigate('message', { component: MPConfirmStopFollow, profile: user, from});
    } else{
      this.props.dispatch(followUser(user, from));
      this.refs.toast.show('Seguindo usu??rio');
    }    
  };

  renderFooterFollowingLoading = () => {
    if(this.props.userFollowingPaginationLoading){
      return (
        <View style={styles.followingFooterLoading}>
          <ActivityIndicator size="large" color="#BB1A1A" style={styles.followingLoading}/>
        </View>
      );
    }

    return null;
  };

  render() {
    const {
      feed,
      textValue,
      searching,
      searchingNotFound,
      userFollowNotifications
    } = this.state;
    if (feed === null || feed === {}) {
      return <ActivityIndicator />
    }
    return (
      <View style={styles.container}>
        <Toast
          ref="toast"
          position='top'
          opacity={0.8}
        />
        <MPHeader inverse={true}/>
        <View style={styles.content}>
          <MPTextField
            label='Pesquise pelo nome, m??sicas e temas'
            value={textValue}
            onChangeText={this.handleSearchChange}
          />
          { textValue.length < 3 ?
            <MPSearchRedIcon style={styles.searchIcon}/>
            :
            <MPIconButton
              style={styles.searchIcon}
              icon={MPCloseFilledRedIcon}
              onPress={this.handleClearClick}
            />
          }
        </View>

        { searching && !searchingNotFound &&
        <ScrollView style={{ flex: 2, backgroundColor: '#FCFCFC' }}>
          <MPText style={ styles.searchTitle }>
            Resultados para <MPText style={ styles.searchTitleEmph}>
            "{ this.state.textValue }"
          </MPText>
          </MPText>
          { feed.artists && feed.artists.length > 0 &&
          <View style={styles.topUsersContainer}>
            <MPText style={ styles.searchUserRollText}>
              Artistas com o nome <MPText style={ styles.searchUserRollTextEmph}>
              "{this.state.textValue}"
            </MPText>
            </MPText>
            <FlatList
              data={feed.artists}
              keyExtractor={(item) => item.id}
              renderItem={this.renderSearchUsers.bind(this, 'feed')}
              horizontal={true}
            />
          </View>
          }
          { feed.songs && feed.songs.length > 0 &&
          <View>
            <MPText style={styles.relatedSongs}>
              M??sicas relacionadas a busca <MPText style={{color: '#5994db'}}>
              { this.state.textValue }
            </MPText>
            </MPText>
            { feed.songs.map(song => (
              <MPUserFull
                key={song.id}
                userName={song.artist && song.artist.name}
                songName={song.name}
                song={song}
                userImagePath={song.artist && song.artist.picture_url}
                onPressUser={() => this.handleNavigateUserProfile(song.artist && song.artist.id)}
                onPressMusic={this.handleNavigateMusic}
              />
            ))}
          </View>
          }
        </ScrollView>
        }
        { searchingNotFound &&
        <View style={{ flex: 1, backgroundColor: '#FCFCFC' }}>
          <MPText style={ styles.searchTitle }>
            Sem resultados para <MPText style={ styles.searchTitleEmph}>
            "{ this.state.textValue }"
          </MPText>
          </MPText>
          <MPText style={ styles.searchNotFoundTextTitle }>
            Id??ias que podem ajudar na sua busca
          </MPText>
          <MPText style={ styles.searchNotFoundText }>Amor</MPText>
          <MPText style={ styles.searchNotFoundText }>Morena</MPText>
          <MPText style={ styles.searchNotFoundText }>Pessoas</MPText>
          <MPText style={ styles.searchNotFoundText }>Sertanejo</MPText>
          <MPText style={ styles.searchNotFoundText }>Rock</MPText>
          <MPText style={ styles.searchNotFoundText }>MPB</MPText>
        </View>
        }
        { !searching &&
        <View style={styles.tabContainer}>
          <MPTabBar
            titles={['PARA VOC??','SEGUINDO']}
            onTabChange={this.handleChangeTab}
            index={this.state.tabIndex}
          />
          <Swiper
            ref={this.swiperRef}
            showsPagination={false}
            loop={false}
            onIndexChanged={this.handleChangeTabSwipe}
          >
            <View style={styles.firstSliderContainer}>
              <ScrollView style={styles.firstSliderScroll} contentContainerStyle={styles.contentScroll}>
                <MPText style={styles.maybeYouLike}>
                  Talvez voc?? goste dessas m??sicas:
                </MPText>
                <View>
                  { this.state.songsListOne.map(song => (
                    <MPUserFull
                      key={song.id}
                      userName={song.artist && song.artist.name}
                      songName={song.name}
                      song={song}
                      imagePath={song.artist !== undefined ? song.artist.picture_url: song.picture_url}
                      userImagePath={song.artist && song.artist.picture_url}
                      onPressUser={() => this.handleNavigateUserProfile(song.artist && song.artist.id)}
                      onPressMusic={this.handleNavigateMusic}
                    />
                  ))}
                </View>
                <View style={styles.topUsersContainer}>
                  <MPText style={styles.topArtists}>
                    Artistas em alta
                  </MPText>
                  <FlatList
                    data={feed.artists || []}
                    keyExtractor={(item) => item.id}
                    renderItem={this.renderSearchUsers.bind(this, 'users')}
                    horizontal={true}
                  />
                </View>
                <View>
                  { this.state.songsListTwo.map(song => (
                    <MPUserFull
                      key={song.id}
                      userName={song.artist && song.artist.name}
                      songName={song.name}
                      song={song}
                      imagePath={song.artist !== undefined ? song.artist.picture_url: song.picture_url}
                      userImagePath={song.artist && song.artist.picture_url}
                      onPressUser={() => this.handleNavigateUserProfile(song.artist && song.artist.id)}
                      onPressMusic={this.handleNavigateMusic}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
            <View style={styles.secondSliderContainer}>
                <FlatList
                  data={userFollowNotifications}
                  keyExtractor={(item) => String(item.id)}
                  refreshing={this.props.refreshUserFollowings}
                  onEndReachedThreshold={0.3}
                  onEndReached={this.handleEndlessNotifications}
                  onRefresh={() => {
                    this.props.dispatch(getFollowNotifications(0, true));
                  }}
                  ListFooterComponent={this.renderFooterFollowingLoading}
                  renderItem={({item}) => {
                    return (
                      <MPFeedNotification
                        key={item.id.toString()}
                        handleNavigateUserProfile={this.handleNavigateUserProfile}
                        handleSongNavigate={this.handleSongNavigate}
                        notification={item}
                      />
                    )
                  }}
                />
            </View>
          </Swiper>
        </View>
        }
        <MPUserNotification />
        <MPLoading visible={this.props.searching}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    marginTop: 0,
    marginHorizontal: 20
  },
  maybeYouLike: {
    fontFamily: 'ProbaPro-Regular',
    fontSize: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    marginTop: 20
  },
  topArtists: {
    fontSize: 20,
    fontFamily: 'ProbaPro-Regular',
    marginBottom: 16,
    color: '#000'
  },
  firstSliderContainer: {
    flex: 1,
    backgroundColor: '#FCFCFC'
  },
  firstSliderScroll: {
    flex: 2
  },
  contentScroll: {
    paddingBottom: 20
  },
  secondSliderContainer: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  topUsersContainer: {
    backgroundColor: '#f3f3f3',
    padding: 20,
    marginBottom: 20,
  },
  relatedSongs: {
    marginHorizontal: 20,
    marginBottom: 16,
    fontSize: 20,
    fontFamily: 'ProbaPro-Regular',
    color: '#000',
  },
  searchTitle: {
    fontSize: 14,
    marginHorizontal: 20,
    marginVertical: 20,
    fontFamily: 'Montserrat-Italic',
    color: '#000',
  },
  searchTitleEmph: {
    fontFamily: 'Montserrat-BoldItalic',
    color: '#5994db'
  },
  searchNotFoundTextTitle: {
    fontSize: 20,
    fontFamily: 'ProbaPro-Regular',
    color: '#000',
    marginStart: 20,
    marginBottom: 20
  },
  searchNotFoundText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    textDecorationLine: 'underline',
    color: '#5994db',
    marginBottom: 20,
    marginStart: 40,
  },
  searchUserRollText: {
    fontSize: 20,
    fontFamily: 'ProbaPro-Regular',
    marginBottom: 16,
    color: '#000'
  },
  searchUserRollTextEmph: {
    color: '#5994db'
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    bottom: 15
  },
  tabContainer: {
    flex: 1,
    marginTop: 20
  },
  followingFooterLoading: {
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center'
  },
  followingLoading: {
    alignSelf:'center'
  }
});

const mapStateToProps = ({feedsReducer, userReducer, authReducer}) => {
  const {userFollowNotifications, refreshUserFollowings, userFollowingPaginationLoading} = userReducer;
  return {
    ...feedsReducer,
    userFollowNotifications,
    refreshUserFollowings,
    userFollowingPaginationLoading,
    loggedUser: authReducer.loggedUser
  };
};

const FeedScreen = connect(mapStateToProps)(FeedScreenContainer);
export {FeedScreen};
