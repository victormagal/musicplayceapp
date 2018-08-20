import React from 'react';
import {
  View, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, ImageBackground, Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import {
  MPTabBar, MPProfileInfo, MPShowLanguages, MPHeader,
  MPFollowButton, ProfileIndicatorCE, MPAddSongButton, MPAddChangePhoto,
  MPUploadFirstSong, MPShowFollowers, MPShowAgencies, MPReportProfile, MPShowFolderSongs, MPGradientButton,
  MPConfirmStopFollow, MPConfirmExcludeSong, MPConfirmUnpublishSong, MPConfirmReportProfile, MPIconButton,
  MPText, MPLoading
} from '../../../components/';
import {
  MPProfileArrowIcon, MPSettingsIcon, MPSongAddIcon
} from '../../../assets/svg/'
import {uploadImage, followUser} from "../../../state/action";
import ImagePicker from 'react-native-image-picker';
import {MPGroupIcon, MPProfileIcon} from "../../../assets/svg";
import {MPFloatingNotification} from "../../../components/general";

class ProfileComponent extends React.Component {
  scrollViewRef = null;

  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
    this.state = {
      tabIndex: 0,
      linearGradientHeight: 0,
      favoritesFolder: [],
      isFollowing: false,
      imageSizeError: false,
      addSongButtonRed: true
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.favoritesFolder){
      this.setState({favoritesFolder: nextProps.favoritesFolder});
    }

    if(nextProps.mySongs){
      this.setState({userFolders: nextProps.mySongs.data});
    }

    if (this.props.profile !== nextProps.profile) {
      this.props.onStopLoading()
    }
  }

  goToScreen = (rota, params = {}) => {
    this.props.navigation.navigate(rota, params);
  };

  handleScrollEnd = () => {
    this.scrollViewRef.current.scrollTo({
      y: this.state.linearGradientHeight,
      animated: true
    })
  };

  toggleFollow = () => {
    const { profile, navigation, onFollowUpClick } = this.props;
    if (this.props.followingUser) {
      navigation.navigate('message', { component: MPConfirmStopFollow, profile });
    } else {
      onFollowUpClick();
    }
  };

  handleEditFolder = (folderId) => {
    this.goToScreen('EditFolder', {folderId})
  };

  handleEditSong = (song) => {
    this.goToScreen('RegisterSongScreen', {song});
  };

  handlePlaySong = (song) => {
    this.props.navigation.navigate('player', {song});
  };

  handleRemoveSong = (song) => {
    this.goToScreen('message', { component: MPConfirmExcludeSong, song });
  };

  handleUnpublishSong = (song) => {
    this.goToScreen('message', { component: MPConfirmUnpublishSong, song });
  };

  handleIndicateSong = (song) => {
    this.goToScreen('IndicateSongFullScreen', { song });
  };


  handleToggleFollowUser = (user) => {
    if (user.isFollowing) {
      this.props.navigation.navigate('message', { component: MPConfirmStopFollow, profile: user});
    }else{
      this.props.dispatch(followUser(user));
    }
  };

  reportProfile = () => {
    let profile = this.props.profile;
    this.goToScreen('message', { component: MPConfirmReportProfile, profile })
  };

  handleClickPhoto = () => {
    const options = {
      title: 'Selecionar uma foto',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.fileSize > 2000000) {
        this.setState({ imageSizeError: true });
        const timer = setTimeout(() => {
          this.setState({ imageSizeError: false });
          clearTimeout(timer);
        }, 2000);
      } else {
        this.props.dispatch(uploadImage(response))
      }
    });
  };

  handleBack = () => {
    this.props.navigation.goBack();
  };

  handleChangeTab = (tabIndex) => {
    this.setState({ tabIndex });
  };

  handleScrollChange = (e) => {
    console.log("CHANGE")
    this.setState({
      addSongButtonRed: e.nativeEvent.contentOffset.y <= 10
    });
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
        {this.renderHeader(me)}
        <ScrollView
          style={{ flex: 1 }}
          ref={this.scrollViewRef}
          nestedScrollEnabled={true}
          onScroll={this.handleScrollChange}>
          { this.renderContent(profile) }
          {
            me && <MPLoading visible={this.props.imageLoading} />
          }
        </ScrollView>
        { (profile && me) &&
          <MPAddSongButton isColored={!this.state.addSongButtonRed} onPress={this.props.onSongAddClick} />
        }
        <MPFloatingNotification
          visible={this.state.imageSizeError}
          icon={<MPProfileIcon/>}
          text="Imagem muito grande. Tente usar outra."
        />
      </View>
    )
  }

  renderHeader(me){
    if (me) {
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
    const { me, loadingProfile } = this.props;
    if (loadingProfile) {
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
          source={profile.picture_url ? { uri: profile.picture_url } : null}
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
          hideSettings={!me}
          following={(this.props.userFollowings && this.props.userFollowings.data) || []}
          followers={(this.props.userFollowers && this.props.userFollowers.data) || []}
          onFollowerFollowingClick={this.props.onFollowerFollowingClick}
          onFollowingsPagination={this.props.onFollowingsPagination}
          onFollowersPagination={this.props.onFollowersPagination}
          onToggleFollowUser={this.handleToggleFollowUser}
          userFollowingLoading={this.props.userFollowingLoading}
          userFollowersLoading={this.props.userFollowersLoading}
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
    const { me, navigation, loggedUser } = this.props;
    const countIndications =  profile.indicationsCount || 0;
    const hiddenFollow = loggedUser && loggedUser.id === profile.id;

    return (
      <View style={styles.infoContainer}>
        { me ?
          <MPAddChangePhoto
            onPressPhoto={this.handleClickPhoto}
            hasPhoto={profile.picture_url}
          />
          :
          !hiddenFollow && <MPFollowButton isFollowing={this.props.followingUser} onPress={() => this.toggleFollow()}/>
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
    const { me, mySongs, songDraft, songsLoading } = this.props;
    switch (tabIndex) {
      case 0:
        return (
          <View>
            {songsLoading && (
              <View style={{ backgroundColor: '#FFF' }}>
                <View style={[styles.contentLoading, {paddingVertical: 40}]}>
                  <ActivityIndicator size='large' color='#BB1A1A' />
                  <MPText style={styles.textLoading}>
                    Carregando...
                  </MPText>
                </View>
              </View>
            )}

            {!songsLoading && this.state.userFolders && this.state.userFolders.length > 0 ?
            this.state.userFolders.map(userFolder => (
              <MPShowFolderSongs
                  {...this.props}
                  edit={me && userFolder.editable}
                  key={userFolder.id}
                  folder={userFolder}
                  me={me}
                  songs={userFolder.songs.data}
                  onSongPagination={this.props.onSongPagination}
                  onEditClick={this.handleEditSong}
                  onEditFolder={this.handleEditFolder.bind(this, userFolder.id)}
                  onRemoveClick={this.handleRemoveSong}
                  onUnpublishClick={this.handleUnpublishSong}
                  onPlayClick={this.handlePlaySong}
                  songDraft={me && songDraft}
                />
            ))
              :
              <View>
                { (me && (!mySongs || mySongs.data.length === 0)) &&
                  <MPUploadFirstSong onPress={this.props.onSongAddClick} />
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
                {...this.props}
                key={favoriteFolder.id}
                folder={favoriteFolder}
                edit={me && favoriteFolder.editable}
                me={me}
                hideSettings={true}
                songs={favoriteFolder.songs.data}
                onSongPagination={this.props.onFavoriteSongPagination}
                onEditClick={this.handleEditSong}
                onEditFolder={this.handleEditFolder.bind(this, favoriteFolder.id)}
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
  infoContainer: {
    paddingTop: 180
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
