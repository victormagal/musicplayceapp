import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
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


class ProfileComponent extends React.Component {
  scrollViewRef = null;

  state = {
    tabIndex: 0
  };

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
    this.props.navigation.navigate('IndicateSongFullScreen', {song});
  };

  reportProfile = () => {
    this.props.navigation.navigate('message', {component: MPConfirmReportProfile})
  };

  handleClickPhoto = () => {

  };

  handleChangeTab = (index) => {
    this.setState({tabIndex: index});
  };

  renderHeaderMenuRight() {
    return [
      <MPIconButton key={Math.random()} icon={MPSettingsIcon} onPress={this.goToScreen.bind(this, 'settings')}/>
    ];
  }

  renderHeaderMenuLeft() {
    return [
      <MPIconButton key={Math.random()}
                    style={styles.logout}
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
    let {profile, mySongs, myFollowers, myIndications} = this.props;
    let followers = (myFollowers && myFollowers.followers) || [];
    let countFollowers =  (myFollowers && myFollowers.count);
    let countIndications =  (myIndications && myIndications.count);

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
          ) : (
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
                    <ProfileIndicatorCE style={styles.flexOne} title="Indicação Feita" titlePlural="Indicações Feitas" subtitle="Explore"
                                        count={countIndications}/>
                    <ProfileIndicatorCE style={styles.flexOne} title="Seguidor" titlePlural="Seguidores"  subtitle="Convide seus amigos"
                                        count={countFollowers}
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


            <View>
              <MPTabBar
                titles={['MINHAS MÚSICAS', 'MÚSICAS SALVAS']} onTabChange={this.handleChangeTab}
                index={this.state.tabIndex}/>

              {this.state.tabIndex === 0 && (
                <View>
                  {mySongs && (
                    <View>
                      <MPShowFolderSongs folderName='Outras'
                                         songs={mySongs.data}
                                         onIndicateClick={this.handleIndicateSong}
                                         onRemoveClick={this.handleRemoveSong}
                                         onUnpublishClick={this.handleUnpublishSong}
                                         onEditClick={this.handleEditSong}/>
                      {!profile.visiting && (
                        <View style={styles.whiteBackground}>
                          <MPGradientButton title={'Cadastrar nova música'} textSize={16}
                                            icon={MPSongAddIcon}
                                            onPress={this.props.onSongAddClick}/>
                        </View>
                      )}
                    </View>
                  )}

                  {!mySongs && (
                    <View>
                      {(!mySongs || mySongs.data.length === 0) && <MPUploadFirstSong onPress={this.props.onSongAddClick} />}
                      {profile.song && <MPUpgradeButton song={profile.song}/>}
                    </View>
                  )}
                </View>
              )}
              {this.state.tabIndex === 1 && (
                <View>
                  {profile.songSaves && (
                    <View>
                      <MPShowFolderSongs folderName='Outras'
                                         songs={profile.songSaves}
                                         onIndicateClick={this.handleIndicateSong}
                                         onRemoveClick={this.handleRemoveSong}
                                         onUnpublishClick={this.handleUnpublishSong}/>

                      {!profile.visiting && (
                        <View style={styles.whiteBackground}>
                          <MPGradientButton title='Cadastrar nova música' textSize={16}
                                            icon={MPSongAddIcon}
                                            onPress={this.props.onSongAddClick}/>
                        </View>
                      )}
                    </View>
                  )}

                  {!profile.songSaves && (
                    <View>
                      {!profile.song && <MPUploadFirstSong onPress={this.props.onSongAddClick} />}
                      {profile.song && <MPUpgradeButton song={profile.song}/>}
                    </View>
                  )}
                </View>
              )}
            </View>

            <MPShowFollowers followers={followers} />
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
