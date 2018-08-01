import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground
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
import {updateProfileData, uploadImage} from "../../../state/profile/profileAction";
import ImagePicker from 'react-native-image-picker';


class ProfileComponent extends React.Component {
  scrollViewRef = null;

  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
    this.state = {
      tabIndex: 0,
      linearGradientHeight: 0
    };
  }

  goToScreen = (rota) => {
    this.props.navigation.navigate(rota)
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

  handleRemoveSong = (song) => {
    this.props.navigation.navigate('message', {component: MPConfirmExcludeSong, song});
  };

  handleUnpublishSong = (song) => {
    this.props.navigation.navigate('message', {component: MPConfirmUnpublishSong, song});
  };

  handleIndicateSong = (song) => {
    song = {...song, artist: this.props.profile};
    this.props.navigation.navigate('IndicateSongFullScreen', {song});
  };

  reportProfile = () => {
    this.props.navigation.navigate('message', {component: MPConfirmReportProfile})
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
      } else {
        this.props.dispatch(uploadImage(response)).then(updateResponse => {
          console.log('updateResponse', updateResponse);
        })
      }
    });
  };

  handleBack = () => {
    this.props.navigation.goBack();
  };

  handleChangeTab = (index) => {
    this.setState({tabIndex: index});
  };

  renderHeaderMenuRight() {
    return [
      <MPIconButton key={Math.random()} icon={MPSettingsIcon} onPress={() => this.goToScreen('settings')}/>
    ];
  }

  renderHeaderMenuLeft() {
    return [
      <MPIconButton key={Math.random()}
                    style={styles.logout}
                    title='Sair'
                    titleStyle={styles.headerMenuText}
                    onPress={this.props.onLogoutClick} />
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
    const { me, myFollowers } = this.props;
    const followers = (myFollowers && myFollowers.followers) || [];
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
              <TouchableOpacity
                style={{ alignSelf: 'center', justifyContent: 'center', marginBottom: 20 }}
                onPress={this.handleScrollEnd}
              >
                <MPProfileArrowIcon />
              </TouchableOpacity>
            </LinearGradient>
          </ImageBackground>
        { this.renderSongsData(profile) }
        <MPShowFollowers following={userFollowing} followers={followers} />
        { !me && <MPReportProfile onPress={ () => this.reportProfile()}/>}
      </View>
    )
  }

  renderProfileData(profile) {
    const { me, myIndications } = this.props;
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
          onEditDescription={() => this.goToScreen('EditProfileDescription')}
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
          <MPShowAgencies agencies={profile.agencies} isArtist={profile.isArtist}/>
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
        { me && (mySongs && mySongs.data.length > 0) &&
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
          <View>
            {profile.songSaves && (
              <View>
                <MPShowFolderSongs folderName='Outras'
                                   me={me}
                                   songs={profile.songSaves}
                                   onEditClick={this.handleEditSong}
                                   onIndicateClick={this.handleIndicateSong}
                                   onRemoveClick={this.handleRemoveSong}
                                   onUnpublishClick={this.handleUnpublishSong}/>
              </View>
            )}
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
  }
});

export {ProfileComponent};
