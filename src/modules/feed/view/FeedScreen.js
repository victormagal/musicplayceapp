import React from 'react';
import {
  FlatList, ScrollView, StyleSheet, View, ActivityIndicator
} from 'react-native';
import {
  MPUser, MPUserFull, MPFeedNotification, MPHeader, MPTabBar, MPText,
  MPTextField, MPIconButton, MPConfirmStopFollow, MPUserNotification
} from '../../../components'
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';
import images from '../../../assets/img';
import {MPSearchRedIcon, MPCloseFilledRedIcon} from '../../../assets/svg';
import {fetchFeeds, searchUsers, getFollowNotifications, followUser} from '../../../state/action';
import {MPLoading} from "../../../components/general";


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
      refreshUserFollowings: false,
    };
    this.swiperRef = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch(searchUsers(''));
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

      this.setState({feed, searchingNotFound: false});
    }

    if (userFollowNotifications.data) {
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
      this.setState({searching: false, searchingNotFound: false});
    } else {
      this.setState({feed: [], searching: false, searchingNotFound: false});
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
    this.setState({textValue: '', feed: [], searching: false, searchingNotFound: false});
  };

  handleChangeTab = (index) => {
    this.swiperRef.current.scrollBy(index === 1 ? 1 : -1, true);
    this.setState({tabIndex: index});
  };

  handleChangeTabSwipe = (index) => {
    this.setState({tabIndex: index});
  };

  renderSearchUsers = (from, {item}) => (
    <MPUser
      key={item.id}
      user={item}
      onPress={() => this.handleNavigateUserProfile(item.id)}
      onToggleFollowUser={this.handleToggleFollowUser.bind(this, from)}
    />
  );

  handleSongNavigate = (song) => {
    this.props.navigation.navigate('player', {song});
  };

  handleToggleFollowUser = (from, user) => {
    if (user.isFollowing) {
      this.props.navigation.navigate('message', { component: MPConfirmStopFollow, profile: user, from});
    }else{
      this.props.dispatch(followUser(user, from));
    }
  };

  renderItemFeed = ({item}) => (
    <MPFeedNotification
      key={item.id.toString()}
      handleNavigateUserProfile={this.handleNavigateUserProfile}
      handleSongNavigate={this.handleSongNavigate}
      notification={item}
    />
  );

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
        <MPHeader inverse={true}/>
        <View style={styles.content}>
          <MPTextField
            label='Pesquise pelo nome, músicas e temas'
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
              Músicas relacionadas a busca <MPText style={{color: '#5994db'}}>
              { this.state.textValue }
            </MPText>
            </MPText>
            { feed.songs.map(song => (
              <MPUserFull
                key={song.id}
                userName={song.artist && song.artist.name}
                songName={song.name}
                song={song}
                imagePath={images.daftPunk120}
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
            Idéias que podem ajudar na sua busca
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
            titles={['PARA VOCÊ','SEGUINDO']}
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
                  Talvez você goste dessas músicas:
                </MPText>
                { feed.songs && feed.songs.length > 0 &&
                <View>
                  { feed.songs.map(song => (
                    <MPUserFull
                      key={song.id}
                      userName={song.artist && song.artist.name}
                      songName={song.name}
                      song={song}
                      imagePath={song.picture_url}
                      userImagePath={song.artist && song.artist.picture_url}
                      onPressUser={() => this.handleNavigateUserProfile(song.artist && song.artist.id)}
                      onPressMusic={this.handleNavigateMusic}
                    />
                  ))}
                </View>
                }
                <View style={styles.topUsersContainer}>
                  <MPText style={styles.topArtists}>
                    Artistas em alta
                  </MPText>
                  <FlatList
                    data={(this.props.users && this.props.users.data) || []}
                    keyExtractor={(item) => item.id}
                    renderItem={this.renderSearchUsers.bind(this, 'users')}
                    horizontal={true}
                  />
                </View>
                { feed.songs && feed.songs.length > 0 &&
                <View>
                  { feed.songs.map(song => (
                    <MPUserFull
                      key={song.id}
                      userName={song.artist && song.artist.name}
                      songName={song.name}
                      song={song}
                      imagePath={song.picture_url}
                      userImagePath={song.artist && song.artist.picture_url}
                      onPressUser={() => this.handleNavigateUserProfile(song.artist && song.artist.id)}
                      onPressMusic={this.handleNavigateMusic}
                    />
                  ))}
                </View>
                }
              </ScrollView>
            </View>
            <View style={styles.secondSliderContainer}>
                <FlatList
                  data={userFollowNotifications}
                  keyExtractor={(item) => item.id}
                  refreshing={this.state.refreshUserFollowings}
                  onRefresh={() => {
                    this.setState({refreshUserFollowings: true});
                    console.log('atualizando');
                    setTimeout(() => {
                      this.setState({refreshUserFollowings: false});
                      console.log('atualizado');
                    }, 3000);
                  }}
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
        <MPLoading visible={this.props.searching || this.props.loading}/>
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
  }
});

const mapStateToProps = ({feedsReducer, userReducer}) => {
  return {...feedsReducer, ...userReducer};
};

const FeedScreen = connect(mapStateToProps)(FeedScreenContainer);
export {FeedScreen};