import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo';
import PropTypes from 'prop-types';
import {
  MPTabBar,
  MPProfileInfo,
  MPShowLanguages,
  MPHeader,
  MPFooter,
  MPFollowButton,
  ProfileIndicatorCE,
  MPAddSongButton,
  MPAddChangePhoto,
  MPText,
  MPUploadFirstSong,
  MPShowFollowers,
  MPShowAgencies,
  MPReportProfile,
  MPShowFolderSongs,
  MPGradientButton,
  MPConfirmStopFollow,
  MPConfirmExcludeSong,
  MPConfirmUnpublishSong
} from '../../../components/';
import {MPProfileArrowIcon} from '../../../assets/svg/'
import {MPUpgradeButton} from '../../../components/profile/MPUpgradeButton';
import {connect} from 'react-redux';
import {fetchProfile, saveProfile} from '../../../state/action';

class ProfileComponent extends React.Component {
  scrollViewRef = null;

  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
  }

  goToScreen = (rota) =>{
    this.props.navigation.navigate(rota)
  }

  handleScrollEnd = () => {
    this.scrollViewRef.current.scrollToEnd();
  };

  toggleFollow = () => {
    this.props.profile.isFollowing == true ? (
      this.props.navigation.navigate('message', { component: MPConfirmStopFollow})
    ) : (
      this.props.dispatch(saveProfile({isFollowing: true}))
    );
  }

  onEdit= () => {
    this.props.navigation.navigate('message', {component: MPConfirmStopFollow})
  }

  excludeSong = () => {
    this.props.navigation.navigate('message', {component: MPConfirmExcludeSong})
  }

  unpublishSong = () => {
    this.props.navigation.navigate('message', {component: MPConfirmUnpublishSong})
  }

  render() {

    let {profile} = this.props;

    return (
      <ScrollView style={styles.container} ref={this.scrollViewRef}>
        <View style={styles.linearContainer}>
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.2)", "#e13223"]}
            style={styles.gradient}>
            <MPHeader transparent={true} title={""}/>
            {
              profile.visiting ? (
                  <MPFollowButton isFollowing={profile.isFollowing} onPress={this.toggleFollow.bind(this)}/>
                ) : (
                  <MPAddChangePhoto hasPhoto={profile.hasPhoto}/>
                )
            }
            <View>
              <MPProfileInfo profile={profile} editDescription={this.goToScreen.bind(this, 'EditProfileDescription')}/>
              <View style={{flexDirection: 'row', marginBottom: 20, marginHorizontal: 20}}>
                <ProfileIndicatorCE style={{flex: 1}} title="Indicações Feitas" subtitle="Explore"
                                    count={profile.indicationCount}/>
                <ProfileIndicatorCE style={{flex: 1}} title="Seguidores" subtitle="Convide seus amigos"
                                    count={profile.followerCount}/>
              </View>
              {
                profile.languages != '' ? (
                    <MPShowLanguages languages={profile.languages}/>
                  ) : null
              }
              {
                profile.agencies != '' ? (
                    <MPShowAgencies agencies={profile.agencies} isArtist={profile.isArtist}/>
                  ) : null
              }
              <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', marginBottom: 20}}
                                onPress={this.goToScreen.bind(this, 'EditProfileDescription')}>
                <MPProfileArrowIcon />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <MPTabBar firstTabTitle={'MINHAS MÚSICAS'} secondTabTitle={"MÚSICAS SALVAS"} >
          <View>
            {
              profile.mySongsFolder != '' ? (
                  <View>
                    <MPShowFolderSongs edit={!profile.visiting} folderName={profile.mySongsFolder[0].folderName} onEdit={this.goToScreen.bind(this, 'EditFolder')} excludeSong={this.excludeSong.bind(this)} unpublishSong={this.unpublishSong.bind(this)} />
                    {
                      !profile.visiting ? (
                        <View style={styles.whiteBackground}>
                          <MPGradientButton title={'Cadastrar nova música'} textSize={16} onPress={ () => {} }/>
                        </View>
                      ) : null
                    }
                  </View>
                ) : (
                  <View>
                    {
                      profile.song == '' ? (
                          <MPUploadFirstSong />
                        ) : (
                          <MPUpgradeButton song={profile.song}/>
                        )
                    }
                  </View>
                )
            }
            <MPShowFollowers />
            {
              profile.visiting ? (
                  <MPReportProfile />
                ) : null
            }
          </View>
          <View>
            {
              profile.savedSongsFolder != '' ? (
                  <View>
                    <MPShowFolderSongs edit={!profile.visiting} folderName={profile.savedSongsFolder[0].folderName} onEdit={this.goToScreen.bind(this, 'EditFolder')}  excludeSong={this.excludeSong.bind(this)} unpublishSong={this.unpublishSong.bind(this)} />
                    {
                      !profile.visiting ? (
                        <View style={styles.whiteBackground}>
                          <MPGradientButton title={'Cadastrar nova música'} textSize={16} onPress={ () => {} }/>
                        </View>
                      ) : null
                    }
                  </View>

                ) : (
                  <View>
                    {
                      profile.song == '' ? (
                          <MPUploadFirstSong />
                        ) : (
                          <MPUpgradeButton song={profile.song}/>
                        )
                    }
                  </View>
                )
            }
            <MPShowFollowers />
            {
              profile.visiting ? (
                  <MPReportProfile />
                ) : null
            }
          </View>
        </MPTabBar>
        <MPAddSongButton isColored={true}/>
      </ScrollView>
    )
  }
}

ProfileComponent.propTypes = {
  profile: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});

export {ProfileComponent};
