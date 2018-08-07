import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground, Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import {
  MPTabBar, MPProfileInfo, MPShowLanguages, MPHeader,
  MPFollowButton, ProfileIndicatorCE, MPAddSongButton, MPAddChangePhoto,
  MPUploadFirstSong, MPShowFollowers, MPShowAgencies, MPReportProfile, MPShowFolderSongs, MPGradientButton,
  MPConfirmStopFollow, MPConfirmExcludeSong, MPConfirmUnpublishSong, MPConfirmReportProfile, MPIconButton,
  MPText
} from '../../../components/';
import {
  MPProfileArrowIcon, MPSettingsIcon, MPSongAddIcon
} from '../../../assets/svg/'
import {MPUpgradeButton} from '../../../components/profile/MPUpgradeButton';
import {saveProfile} from '../../../state/action';
import {MPProfileSuccess} from "../../../components";
import {MPGroupIcon} from "../../../assets/svg";


class ProfileComponent extends React.Component {
  scrollViewRef = null;

  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
    this.state = {
      tabIndex: 0,
      linearGradientHeight: 0,
      favoritesFolder: []
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.favoritesFolder){
      this.setState({favoritesFolder: nextProps.favoritesFolder});
    }
  }

  goToScreen = (rota, params = {}) => {
    this.props.navigation.navigate(rota, params)
  };

  handleScrollEnd = () => {
    this.scrollViewRef.current.scrollTo({y: this.state.linearGradientHeight, animated: true})
  };

  toggleFollow = () => {
    if(this.props.profile.isFollowing){
      this.props.navigation.navigate('message', {component: MPConfirmStopFollow, profile: this.props.profile});
    }else{
      this.props.onFollowUpClick();
    }
  };

  handleEditSong = (song) => {
    this.props.navigation.navigate('RegisterSongScreen', {song});
  };

  handlePlaySong = (song) => {
    this.props.navigation.navigate('player', {song});
  };

  handleRemoveSong = (song) => {
    this.props.navigation.navigate('message', {component: MPConfirmExcludeSong, song});
  };

  handleUnpublishSong = (song) => {
    this.props.navigation.navigate('message', {component: MPConfirmUnpublishSong, song});
  };

  handleIndicateSong = (song) => {
    song = {...song, user: this.props.profile};
    this.props.navigation.navigate('IndicateSongFullScreen', {song});
  };

  reportProfile = () => {
    this.props.navigation.navigate('message', {component: MPConfirmReportProfile})
  };

  handleClickPhoto = () => {

  };

  handleBack = () => {
    this.props.navigation.goBack();
  };

  handleChangeTab = (index) => {
    this.setState({tabIndex: index});
  };

  renderHeaderMenuRight() {
    return [
      <MPIconButton
        key={Math.random()}
        icon={MPSettingsIcon}
        onPress={() => this.goToScreen('settings')}
      />
    ];
  }

  renderHeaderMenuLeft() {
    return [
      <MPIconButton
        key={Math.random()}
        style={styles.logout}
        title='Sair'
        titleStyle={styles.headerMenuText}
        onPress={this.props.onLogoutClick}
      />
    ];
  }

  render() {
    const { me, profile } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {this.renderHeader()}
        <ScrollView style={{ flex: 1 }} ref={this.scrollViewRef}>
          { this.renderContent(profile) }
        </ScrollView>
        { (profile && me) &&
          <MPAddSongButton isColored={true} onPress={this.props.onSongAddClick} />
        }
      </View>
    )
  }

  renderHeader(){
    if (this.props.me) {
      return (
        <MPHeader
          iconsLeft={this.renderHeaderMenuLeft()}
          icons={this.renderHeaderMenuRight()}
        />
      )
    } else {
      return (
        <MPHeader
          back={true}
          onBack={this.handleBack}
        />
      )
    }
  }

  renderContent(profile) {
    const { me, followers, navigation } = this.props;
    const userFollowers = followers || [];
    const userFollowing = (profile && profile.userFollowing) || [];

    if (!profile) {
      return (
        <View style={styles.containerLoading}>
          <View style={styles.contentLoading}>
            <ActivityIndicator size='large' color='#BB1A1A' />
            <MPText style={styles.textLoading}>
              { `Carregando ${me ? 'perfil' : 'artista'}...` }
            </MPText>
          </View>
        </View>
      )
    }

    return (
      <View style={{ backgroundColor: '#000' }}>
        <ImageBackground
          style={{ flex: 1, width: '100%' }}
          source={profile.cover_picture_url ? { uri: profile.cover_picture_url } : null}
        >
          <LinearGradient
            onLayout={event => this.setState({ linearGradientHeight: event.nativeEvent.layout.height })}
            colors={['rgba(0, 0, 0, 0.2)', '#e13223']}
          >
            { this.renderProfileData(profile) }
            <TouchableOpacity style={styles.profileArrow} onPress={this.handleScrollEnd}>
              <MPProfileArrowIcon />
            </TouchableOpacity>
          </LinearGradient>
        </ImageBackground>
        { this.renderSongsData(profile) }
        <MPShowFollowers
          navigation={navigation}
          following={userFollowing}
          followers={userFollowers}
        />
        { me ?
          <View style={{ backgroundColor: '#FFF', height: 90 }} />
          :
          <MPReportProfile onPress={() => this.reportProfile()}/>
        }
      </View>
    )
  }

  renderProfileData(profile) {
    const { me, myIndications, navigation } = this.props;

    const countIndications =  (myIndications && myIndications.count);
    return (
      <View>
        { me ?
          <MPAddChangePhoto
            onPressPhoto={this.handleClickPhoto}
            hasPhoto={profile.cover_picture_url}
          />
          :
          <MPFollowButton isFollowing={profile.isFollowing} onPress={() => this.toggleFollow()}/>
        }
        <MPProfileInfo
          isMe={me}
          profile={profile}
          navigation={navigation}
        />
        <View style={styles.profileIndicatorContainer}>
          <ProfileIndicatorCE
            style={{ flex: 1 }}
            title='Indicação Feita'
            titlePlural='Indicações Feitas'
            subtitle='Explore'
            me={me}
            count={countIndications}
          />
          <ProfileIndicatorCE
            style={{ flex: 1 }}
            title='Seguidor'
            titlePlural='Seguidores'
            subtitle='Convide seus amigos'
            count={profile.followerCount}
            me={me}
            onEmptyClick={this.props.onFollowersEmptyClick}
          />
        </View>
        { profile.languages &&
          <MPShowLanguages languages={profile.languages} />
        }
        { profile.agencies && (
          <MPShowAgencies agencies={profile.agencies} isUser={profile.isUser}/>
        )}
      </View>
    )
  }

  renderSongsData(profile) {
    const { tabIndex } = this.state;
    const { me, mySongs } = this.props;
    return (
      <View>
        {me && (
          <MPTabBar
            titles={['MINHAS MÚSICAS', 'MÚSICAS SALVAS']}
            onTabChange={this.handleChangeTab}
            index={tabIndex}
          />
        )}
        { this.renderTabsContent(profile, tabIndex) }
        { me && (mySongs && mySongs.data && mySongs.data.length > 0) &&
          <View style={styles.whiteBackground}>
            <MPGradientButton
              title={'Cadastrar nova música'}
              textSize={16}
              icon={MPSongAddIcon}
              onPress={this.props.onSongAddClick}
            />
          </View>
        }
      </View>
    )
  }

  renderTabsContent(profile, tabIndex) {
    const { me, mySongs, song } = this.props;
    switch (tabIndex) {
      case 0:
        return (
          <View>
            { mySongs ?
              <View>
                <MPShowFolderSongs
                  folderName='Outras'
                  me={me}
                  songs={mySongs.data}
                  onEditClick={this.handleEditSong}
                  onIndicateClick={this.handleIndicateSong}
                  onRemoveClick={this.handleRemoveSong}
                  onUnpublishClick={this.handleUnpublishSong}
                  onPlayClick={this.handlePlaySong}
                />
              </View>
              :
              <View>
                { (me && (!mySongs || mySongs.data.length === 0)) &&
                  <MPUploadFirstSong onPress={this.props.onSongAddClick} />
                }
                { (me && song) &&
                  <MPUpgradeButton song={song}/>
                }
              </View>
            }
          </View>
        )
      case 1:
        return (
          <View style={{ backgroundColor: '#FFF' }}>
            {this.state.favoritesFolder  && this.state.favoritesFolder.length > 0 ?
            this.state.favoritesFolder.map(favoriteFolder => (
              <MPShowFolderSongs
                key={favoriteFolder.id}
                folderName={favoriteFolder.name}
                me={me}
                songs={favoriteFolder.songs}
                onEditClick={this.handleEditSong}
                onIndicateClick={this.handleIndicateSong}
                onRemoveClick={this.handleRemoveSong}
                onUnpublishClick={this.handleUnpublishSong}
                onPlayClick={this.handlePlaySong}
              />
            )):
              <View style={styles.noSongsSaved}>
                <MPGroupIcon style={{ width: 50, height: 50 }}/>
                <MPText style={styles.noContent}>
                  Você não salvou {'\n'} nenhuma música ainda.
                </MPText>
              </View>
            }
          </View>
        )
    }
  }
}

ProfileComponent.propTypes = {
  profile: PropTypes.object,
  me: PropTypes.bool,
  onFollowersEmptyClick: PropTypes.func,
  onSongAddClick: PropTypes.func
};

const styles = StyleSheet.create({
  button: {
    width: 230
  },
  whiteBackground: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    backgroundColor: '#FFF',
  },
  profileIndicatorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginHorizontal: 20
  },
  headerMenuText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#fff'
  },
  containerLoading: {
    paddingTop: 200,
    justifyContent: 'center'
  },
  contentLoading:{
    alignSelf: 'center'
  },
  textLoading: {
    fontFamily: 'ProbaPro-Regular',
    fontSize: 18,
    color: '#000',
  },
  logout: {
    padding: 10
  },
  profileArrow: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: -20
  },
  noSongsSaved: {
    width: Dimensions.get('screen').width,
    alignItems: 'center',
    marginVertical: 40
  },
  noContent: {
    marginTop: 8,
    color: '#626262',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular'
  }
});

export {ProfileComponent};
