import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import {LinearGradient} from 'expo';
import PropTypes from 'prop-types';
import {
  MPTabBar, MPProfileInfo, MPShowLanguages, MPHeader,
  MPFollowButton, ProfileIndicatorCE, MPAddSongButton, MPAddChangePhoto,
  MPUploadFirstSong, MPShowFollowers, MPShowAgencies, MPReportProfile, MPShowFolderSongs, MPGradientButton,
  MPConfirmStopFollow, MPConfirmExcludeSong, MPConfirmUnpublishSong, MPConfirmReportProfile, MPIconButton,
  MPText
} from '../../../components/';
import {
  MPProfileArrowIcon, MPSettingsIcon
} from '../../../assets/svg/'
import {MPUpgradeButton} from '../../../components/profile/MPUpgradeButton';
import {saveProfile} from '../../../state/action';


class ProfileComponent extends React.Component {
  scrollViewRef = null;

  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
  }

  goToScreen = (rota) => {
    this.props.navigation.navigate(rota)
  };

  handleScrollEnd = () => {
    this.scrollViewRef.current.scrollToEnd();
  };

  toggleFollow = () => {
    if(this.props.profile.isFollowing){
      this.props.navigation.navigate('message', {component: MPConfirmStopFollow})
    }else{
      this.props.dispatch(saveProfile({isFollowing: true}))
    }
  };

  onEdit = () => {
    this.props.navigation.navigate('message', {component: MPConfirmStopFollow})
  };

  excludeSong = () => {
    this.props.navigation.navigate('message', {component: MPConfirmExcludeSong})
  }

  unpublishSong = () => {
    this.props.navigation.navigate('message', {component: MPConfirmUnpublishSong})
  }

  reportProfile = () => {
    this.props.navigation.navigate('message', {component: MPConfirmReportProfile})
  };

  handleClickPhoto = () => {

  };

  renderHeaderMenuRight() {
    return [
      <MPIconButton key={Math.random()} icon={MPSettingsIcon} onPress={this.goToScreen.bind(this, 'settings')}/>
    ];
  }

  renderHeaderMenuLeft() {
    return [
      <MPIconButton key={Math.random()}
                    title="Sair"
                    titleStyle={styles.headerMenuText}
                    onPress={this.props.onLogoutClick} />
    ];
  }

  renderHeader(){
    if(this.props.me){
      return <MPHeader iconsLeft={this.renderHeaderMenuLeft()} icons={this.renderHeaderMenuRight()}/>
    }

    return <MPHeader />;
  }

  render() {
    let {profile} = this.props;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView style={styles.flexOne} ref={this.scrollViewRef}>

          {!profile ? (
            <View style={styles.containerLoading}>
              <View style={styles.contentLoading}>
                  <ActivityIndicator size="large" color="#BB1A1A" />
                  <MPText style={styles.textLoading}>Carregando perfil...</MPText>
              </View>
            </View>
          )
          : (
          <View>
            <View style={styles.linearContainer}>
              <LinearGradient
                colors={["rgba(0, 0, 0, 0.2)", "#e13223"]}
                style={styles.gradient}>
                {profile.visiting && <MPFollowButton isFollowing={profile.isFollowing} onPress={this.toggleFollow.bind(this)}/>}
                {!profile.visiting && <MPAddChangePhoto onPressPhoto={this.handleClickPhoto} hasPhoto={profile.hasPhoto}/> }

                <View>
                  <MPProfileInfo profile={profile} editDescription={this.goToScreen.bind(this, 'EditProfileDescription')}/>

                  <View style={styles.profileIndicatorContainer}>
                    <ProfileIndicatorCE style={styles.flexOne} title="Indicações Feitas" subtitle="Explore"
                                        count={profile.indicationCount}/>
                    <ProfileIndicatorCE style={styles.flexOne} title="Seguidores" subtitle="Convide seus amigos"
                                        count={profile.followerCount}
                                        onEmptyClick={this.props.onFollowersEmptyClick}/>
                  </View>
                  {profile.languages && (
                    <MPShowLanguages languages={profile.languages}/>
                  )}
                  {profile.agencies && (
                    <MPShowAgencies agencies={profile.agencies} isArtist={profile.isArtist}/>
                  )}

                  <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', marginBottom: 20}}
                                    onPress={this.handleScrollEnd}>
                    <MPProfileArrowIcon />
                  </TouchableOpacity>
                </View>

              </LinearGradient>
            </View>


            <MPTabBar firstTabTitle="MINHAS MÚSICAS" secondTabTitle="MÚSICAS SALVAS">
              <View>
                {profile.mySongsFolder && (
                  <View>
                    <MPShowFolderSongs edit={!profile.visiting} folderName={profile.mySongsFolder[0].folderName}
                                       onEdit={this.goToScreen.bind(this, 'EditFolder')}
                                       excludeSong={this.excludeSong.bind(this)}
                                       unpublishSong={this.unpublishSong.bind(this)}/>
                    {!profile.visiting && (
                      <View style={styles.whiteBackground}>
                        <MPGradientButton title={'Cadastrar nova música'} textSize={16}
                                          icon={MPSettingsIcon}
                                          onPress={this.props.onSongAddClick}/>
                      </View>
                    )}
                  </View>
                )}

                {!profile.mySongsFolder && (
                  <View>
                    {!profile.song && <MPUploadFirstSong onPress={this.props.onSongAddClick} />}
                    {profile.song && <MPUpgradeButton song={profile.song}/>}
                  </View>
                )}
              </View>
              <View>
                {profile.savedSongsFolder && (
                  <View>
                    <MPShowFolderSongs edit={!profile.visiting} folderName={profile.savedSongsFolder[0].folderName}
                                       onEdit={this.goToScreen.bind(this, 'EditFolder')}
                                       excludeSong={this.excludeSong.bind(this)}
                                       unpublishSong={this.unpublishSong.bind(this)}/>
                    {!profile.visiting && (
                      <View style={styles.whiteBackground}>
                        <MPGradientButton icon={MPSettingsIcon} title={'Cadastrar nova música'} textSize={16}
                                          onPress={this.props.onSongAddClick}/>
                      </View>
                    )}
                  </View>
                )}

                {!profile.savedSongsFolder && (
                  <View>
                    {!profile.song && <MPUploadFirstSong onPress={this.props.onSongAddClick}  />}
                    {profile.song && <MPUpgradeButton song={profile.song}/>}
                  </View>
                )}
              </View>
            </MPTabBar>

            <MPShowFollowers />
            { profile.visiting && <MPReportProfile onPress={ this.reportProfile.bind(this)}/>}

            <MPAddSongButton isColored={true}/>
          </View>
          )}
        </ScrollView>
      </View>
    )
  }
}


ProfileComponent.propTypes = {
  profile: PropTypes.object,
  me: PropTypes.bool,
  onFollowersEmptyClick: PropTypes.func,
  onSongAddClick: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexOne: {
    flex: 1
  },
  linearContainer: {
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
    alignContent: 'flex-start',
  },
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
    fontFamily: 'montSerrat',
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
    fontFamily: 'probaProRegular',
    fontSize: 18,
    color: '#000',
  }
});

export {ProfileComponent};
