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
    tabIndex: 0,
    linearGradientHeight: 0
  };

  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
  }

  goToScreen = (rota) => {
    this.props.navigation.navigate(rota)
  };

  handleScrollEnd = () => {
    this.scrollViewRef.current.scrollTo({y: this.state.linearGradientHeight, animated: true})
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

  handleBack = () => {
    this.props.navigation.goBack();
  }

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
          <MPAddSongButton isColored={true}/>
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
          icons={[ <View key={Math.random()} /> ]}
        />
      )
    }
  }

  renderContent(profile) {
    const { me, myFollowers } = this.props;
    const followers = (myFollowers && myFollowers.followers) || [];
    let userFollowing = (profile && profile.userFollowing) || [];

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
        <LinearGradient
          onLayout={event => this.setState({ linearGradientHeight: event.nativeEvent.layout.height })}
          colors={['rgba(0, 0, 0, 0.2)', '#e13223']}
          style={{ flex: 1 }}>
          { this.renderProfileData(profile) }
          <TouchableOpacity
            style={{ alignSelf: 'center', justifyContent: 'center', marginBottom: 20 }}
            onPress={this.handleScrollEnd}
          >
            <MPProfileArrowIcon />
          </TouchableOpacity>
        </LinearGradient>
        { this.renderSongsData(profile) }
        { followers.length > 0 &&
          <MPShowFollowers following={userFollowing} followers={followers} />
        }
        { !me && <MPReportProfile onPress={ () => this.reportProfile()}/>}
      </View>
    )
  }

  renderProfileData(profile) {
    const { me, myFollowers, myIndications } = this.props;
    const countFollowers =  (myFollowers && myFollowers.count);
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
            subtitle={ me ? 'Explore' : '' }
            count={countIndications}
          />
          <ProfileIndicatorCE
            style={{ flex: 1 }}
            title='Seguidor'
            titlePlural='Seguidores'
            subtitle={ me ? 'Convide seus amigos' : ''}
            count={countFollowers}
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
    const { me } = this.props;
    return (
      <View>
        <MPTabBar
          titles={ me ? ['MINHAS MÚSICAS', 'MÚSICAS SALVAS'] : ['MÚSICAS DO ARTISTA']}
          onTabChange={this.handleChangeTab}
          index={tabIndex}
        />
        { this.renderTabsContent(profile, tabIndex) }
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
                  songs={mySongs.data}
                  onEditClick={this.handleEditSong}
                  onIndicateClick={this.handleIndicateSong}
                  onRemoveClick={this.handleRemoveSong}
                  onUnpublishClick={this.handleUnpublishSong}
                />
                { me &&
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
                                   songs={profile.songSaves}
                                   onEditClick={this.handleEditSong}
                                   onIndicateClick={this.handleIndicateSong}
                                   onRemoveClick={this.handleRemoveSong}
                                   onUnpublishClick={this.handleUnpublishSong}/>
                { me &&
                  <View style={styles.whiteBackground}>
                    <MPGradientButton
                      title='Cadastrar nova música'
                      textSize={16}
                      icon={MPSongAddIcon}
                      onPress={this.props.onSongAddClick}
                    />
                  </View>
                }
              </View>
            )}
            <View>
              { (me && (!mySongs || mySongs.data.length === 0)) &&
              <MPUploadFirstSong onPress={this.props.onSongAddClick} />
              }
              { (me && song) &&
              <MPUpgradeButton song={song}/>
              }
            </View>
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
