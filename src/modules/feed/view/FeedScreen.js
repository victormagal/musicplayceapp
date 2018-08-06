import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';
import {
  MPUser,
  MPUserFull,
  MPFeedNotification,
  MPHeader,
  MPTabBar,
  MPText,
  MPTextField,
  MPIconButton,
  MPLoading
} from '../../../components'
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';
import images from '../../../assets/img';
import {MPSearchRedIcon, MPCloseFilledRedIcon} from '../../../assets/svg';
import {  fetchFeeds, searchUsers, getFollowNotifications } from '../../../state/action';

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
      users: [],
    };
    this.swiperRef = React.createRef();
  }

  componentDidMount(){
    this.props.dispatch(searchUsers(''));
    this.props.dispatch(fetchFeeds(''));
    this.props.dispatch(getFollowNotifications());
  }

  componentWillReceiveProps(nextProps) {
    const { users, feed, userFollowNotifications } = nextProps;
    const { searching } = this.state;

    if (feed) {
      this.setState({ feed, searchingNotFound: false });
      if (feed.artists && feed.artists.length === 0 &&
        feed.songs && feed.songs.length === 0
        && searching
      ){
        this.setState({ searchingNotFound: true });
      }
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
        this.setState({ userFollowNotifications: followingNotifications });
    }

    if (users) {
      this.setState({users: users.data});
    }
  }

  componentWillUnmount() {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
  }

  handleNavigateMusic = (song) => {
    this.props.navigation.navigate('player', { song });
  };

  handleNavigateUserProfile = (userId) => {
    this.props.navigation.navigate('userProfile', { userId });
  };

  handleSearchChange = (textValue) => {
    this.setState({ textValue });

    if (textValue.length >= 3){
      this.handleSearch(textValue);
      return;
    }

    if (textValue) {
      this.setState({ searching: false, searchingNotFound: false });
    } else {
      this.setState({ feed: [], searching: false, searchingNotFound: false });
    }
  };

  handleSearch = (value) => {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }

    this.searchTimer = setTimeout(() => {
      this.props.dispatch(fetchFeeds(value));
      this.setState({ searching: true });
      clearTimeout(this.searchTimer);
    }, 800);
  };

  handleClearClick = () => {
    this.setState({ textValue: '', feed: [], searching: false, searchingNotFound: false });
  };

  handleChangeTab = (index) => {
    this.swiperRef.current.scrollBy(index === 1 ? 1 : -1, true);
    this.setState({ tabIndex: index });
  };

  handleChangeTabSwipe = (index) => {
    this.setState({ tabIndex: index });
  };

  renderItemTopUsers = ({item}) => (
    <MPUser
      key={item.id}
      user={item}
      onPress={() => this.handleNavigateUserProfile(item.id)}
    />
  );

  renderSearchUsers = ({ item }) => {
    return (
      <MPUser
        user={item}
        onPress={() => this.handleNavigateUserProfile(item.id)}
      />
    );
  };

  renderItemFeed = ({ item }) => (
    <MPFeedNotification
      key={item.type}
      notification={item}
    />
  );

  render() {
    const {
      feed,
      users,
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
        <MPHeader inverse={true} />
        <MPLoading visible={this.props.loading} />
        <View style={styles.content}>
          <MPTextField
            label='Pesquise pelo nome, músicas e temas'
            value={textValue}
            onChangeText={this.handleSearchChange}
          />
          { textValue.length < 3 ?
            <MPSearchRedIcon style={styles.searchIcon} />
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
                  renderItem={this.renderSearchUsers}
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
                    userName={song.user.name}
                    songName={song.name}
                    song={song}
                    imagePath={images.daftPunk120}
                    userImagePath={song.user.picture_url}
                    onPressUser={() => this.handleNavigateUserProfile(song.user.id)}
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
                          userName={song.user.name}
                          songName={song.name}
                          song={song}
                          imagePath={song.picture_url}
                          userImagePath={song.user.picture_url}
                          onPressUser={() => this.handleNavigateUserProfile(song.user.id)}
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
                      data={users}
                      keyExtractor={(item) => item.id}
                      renderItem={this.renderItemTopUsers}
                      horizontal={true}
                    />
                  </View>
                  { feed.songs && feed.songs.length > 0 &&
                    <View>
                      { feed.songs.map(song => (
                        <MPUserFull
                          key={song.id}
                          userName={song.user.name}
                          songName={song.name}
                          song={song}
                          imagePath={song.picture_url}
                          userImagePath={song.user.picture_url}
                          onPressUser={() => this.handleNavigateUserProfile(song.user.id)}
                          onPressMusic={this.handleNavigateMusic}
                        />
                      ))}
                    </View>
                  }
                </ScrollView>
              </View>
              <View style={styles.secondSliderContainer}>
                <ScrollView style={{ flex: 2 }}>
                  <FlatList
                    data={userFollowNotifications}
                    keyExtractor={(item) => item.id}
                    renderItem={this.renderItemFeed}
                  />
                </ScrollView>
              </View>
            </Swiper>
          </View>
        }
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

const mapStateToProps = ({ feedsReducer, userReducer }) => {
  return {...feedsReducer, ...userReducer};
};

const FeedScreen = connect(mapStateToProps)(FeedScreenContainer);
export { FeedScreen };
