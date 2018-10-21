import React from 'react';
import {
  Alert, View, StyleSheet, ScrollView, TouchableOpacity,
  ActivityIndicator, ImageBackground, Dimensions, FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import {
  MPTabBar, MPProfileInfo, MPShowLanguages, MPHeader,
  MPFollowButton, ProfileIndicatorCE, MPAddSongButton, MPAddChangePhoto,
  MPUploadFirstSong, MPShowFollowers, MPShowAgencies, MPReportProfile, MPShowFolderSongs, MPGradientButton,
  MPConfirmStopFollow, MPConfirmUnpublishSong, MPConfirmReportProfile, MPIconButton,
  MPText, MPLoading
} from '../../../components/';
import {
  MPProfileArrowIcon, MPSettingsIcon, MPSongAddIcon
} from '../../../assets/svg/'
import {uploadImage, followUser, removeSong} from "../../../state/action";
import ImagePicker from 'react-native-image-picker';
import {MPGroupIcon, MPProfileIcon} from "../../../assets/svg";
import {MPFloatingNotification} from "../../../components/general";
import Toast from 'react-native-easy-toast';

class ProfileComponent extends React.Component {
  scrollViewRef = null;

  static UPLOAD_SIZE = 3;

  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
    this.state = {
      tabIndex: 0,
      linearGradientHeight: 0,
      isFollowing: false,
      imageSizeError: false,
      addSongButtonRed: true
    };
  }

  componentWillReceiveProps(nextProps){
    const { profile } = this.props;
    if (profile !== nextProps.profile) {
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
    const { onFollowUpClick } = this.props;
    if (this.props.followingUser) {
      this.refs.toast.show('Parou de seguir este usuário');
      // navigation.navigate('message', { component: MPConfirmStopFollow, profile });
    } else {
      this.refs.toast.show('Seguindo usuário');
      onFollowUpClick();
    }
  };

  handleEditFolder = (folder) => {
    this.goToScreen('EditFolder', {folder})
  };

  handleEditSong = (song) => {
    this.goToScreen('RegisterSongScreen', {song});
  };

  handlePlaySong = (song) => {
    this.props.navigation.navigate('player', {song});
  };

  handleRemoveSong = (song) => {
    Alert.alert(
      'Excluir',
      'Deseja excluir essa música?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            const { profile } = this.props;
            this.props.dispatch(removeSong(song.id, profile.id));
          }
        },
      ]
    );
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
    let {user} = this.props;
    this.goToScreen('message', { component: MPConfirmReportProfile, user })
  };

  handleClickPhoto = () => {
    // @todo refactoring to component capture image with options default and i18n
    /* const options = {
      title: 'Selecionar uma foto',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }; */

    const options = {
      title: 'Selecionar imagem de perfil',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tirar foto ...',
      chooseFromLibraryButtonTitle: 'Selecionar foto ...',
      cameraType: 'front',
      mediaType: 'photo',
      quality: 0,
      permissionDenied: {
        title: 'Permissão negada',
        text: 'Para captura ou escolha do avatar é necessário conceder permissão à Câmera ou Storage',
        reTryTitle: 'Permitir',
        okTitle: 'OK' 
      },
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      const { fileSize } = response;
      if (fileSize) {
        const megabytes = (fileSize / 1024) / 1024;
        if (megabytes > ProfileComponent.UPLOAD_SIZE) {
          // @todo state error
          this.setState({ imageSizeError: true });
          setTimeout(() => {
            this.setState({ imageSizeError: false });
          }, 2000);
          return;
        }
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
    console.log( e.nativeEvent.contentOffset);
    this.setState({
      addSongButtonRed: e.nativeEvent.contentOffset.y <= 10
    });
  };

  renderListLoadingFooter = (loading) => {
    if(loading) {
      return (
        <View style={styles.listFooterLoading}>
          <ActivityIndicator size="large" color="#BB1A1A" style={styles.listLoading}/>
        </View>
      );
    }
    return null;
  };

  renderFolder = (item) => {
    const { me, songDraft} = this.props;
    const onSongPagination = this.state.tabIndex === 1 ? this.props.onFavoriteSongPagination : this.props.onSongPagination;

    return (
      <MPShowFolderSongs
        {...this.props}
        edit={me && item.editable}
        key={item.id}
        folder={item}
        me={me}
        hideSettings={!me || this.state.tabIndex === 1}
        songs={item.songs.data}
        onSongPagination={onSongPagination}
        onEditClick={this.handleEditSong}
        onEditFolder={this.handleEditFolder.bind(this, item)}
        onRemoveClick={this.handleRemoveSong}
        onUnpublishClick={this.handleUnpublishSong}
        onPlayClick={this.handlePlaySong}
        songDraft={me && songDraft}
      />
    )
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
        title='Sair'
        titleStyle={styles.headerMenuText}
        onPress={this.props.onLogoutClick}
      />
    ];
  }

  render() {
    const { me, profile, imageLoading } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {this.renderHeader(me)}
        <Toast ref="toast" />
        <ScrollView
          style={{ flex: 1 }}
          ref={this.scrollViewRef}
          onScroll={this.handleScrollChange}>
          { this.renderContent(profile) }
          {
            me && <MPLoading visible={imageLoading} />
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
            <MPText style={styles.textLoading}>Carregando...</MPText>
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
        { profile.language_songs &&
          <MPShowLanguages languages={profile.language_songs} />
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
    const { me, mySongs, myFavoriteSongs, songDraft, songsLoading } = this.props;

    if(tabIndex === 0) {
      return (
        <View>
          {songsLoading && (
            <View style={{ backgroundColor: '#FFF' }}>
              <View style={[styles.contentLoading, {paddingVertical: 40}]}>
                <ActivityIndicator size='large' color='#BB1A1A'/>
                <MPText style={styles.textLoading}>
                  Carregando...
                </MPText>
              </View>
            </View>
          )}

          {!songsLoading && mySongs && mySongs.data.length > 0 ?
            <View style={styles.songsScroll}>
              {mySongs.data.map(folder => this.renderFolder(folder))}
            </View>
            :
            <View>
              { (me && (!mySongs || mySongs.data.length === 0)) &&
              <MPUploadFirstSong onPress={this.props.onSongAddClick}/>
              }
            </View>
          }
        </View>
      );
    }

    return (
      <View style={{ backgroundColor: '#FFF' }}>
        {myFavoriteSongs && myFavoriteSongs.data.length > 0 ?
          <View style={styles.songsScroll}>
            {myFavoriteSongs.data.map(folder => this.renderFolder(folder))}
          </View>
          :
          <View style={styles.noSongsSaved}>
            <MPGroupIcon style={{ width: 50, height: 50 }}/>
            <MPText style={styles.noContent}>
              Você não salvou {'\n'} nenhuma música ainda.
            </MPText>
          </View>
        }
      </View>
    );
  }
}

ProfileComponent.propTypes = {
  profile: PropTypes.object,
  me: PropTypes.bool,
  imageLoading: PropTypes.bool,
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
  },
  songsScroll: {
    backgroundColor: '#fff',
    paddingBottom: 16
  },
  listFooterLoading: {
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'center',
    backgroundColor: '#FCFCFC'
  },
  listLoading: {
    alignSelf:'center'
  },
});

export {ProfileComponent};
