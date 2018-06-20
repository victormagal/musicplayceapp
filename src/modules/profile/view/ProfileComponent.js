import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo';
import PropTypes from 'prop-types';
import {
  MPTabBar,
  MPProfileInfo,
  MPShowLanguages,
  MPHeader,
  MPFollowButton,
  ProfileIndicatorCE,
  MPAddSongButton,
  MPAddChangePhoto,
  MPUploadFirstSong,
  MPShowFollowers,
  MPShowAgencies,
  MPReportProfile,
  MPShowFolderSongs
} from '../../../components/';
import {MPProfileArrowIcon} from '../../../assets/svg/'
import {MPUpgradeButton} from '../../../components/profile/MPUpgradeButton';


class ProfileComponent extends React.Component {

  scrollViewRef = null;

  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
  }

  handleScrollEnd = () => {
    this.scrollViewRef.current.scrollToEnd();
  };

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
                  <MPFollowButton isFollowing={profile.isFollowing}/>
                ) : (
                  <MPAddChangePhoto hasPhoto={profile.hasPhoto}/>
                )
            }
            <MPProfileInfo profile={profile}/>
            <View style={{flexDirection: 'row', marginBottom: 20, marginHorizontal: 20}}>
              <ProfileIndicatorCE style={{flex: 1}} title="Indicações Feitas"  subtitle="Explore"/>
              <ProfileIndicatorCE style={{flex: 1}} title="Seguidores" subtitle="Convide seus amigos"/>
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

            <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', marginBottom: 20}} onPress={this.handleScrollEnd}>
              <MPProfileArrowIcon />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <MPTabBar firstTabTitle={'MINHAS MÚSICAS'} secondTabTitle={"MÚSICAS SALVAS"}>
          <View style={{flex: 1}}>
            {
              profile.song == '' ? (
                  <MPUploadFirstSong />
                ) : (
                  <MPUpgradeButton song={profile.song}/>
                )
            }
            <MPShowFollowers />
            <MPReportProfile />
          </View>
          <View style={{flex: 1}}>
            <MPShowFolderSongs folderName={'Inspirações rock'} edit={true}/>
          </View>
        </MPTabBar>
        <MPAddSongButton isColored={true}/>
      </ScrollView>
    );
  }
}

ProfileComponent.propTypes = {
  profile: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 2
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
  }
});


export {ProfileComponent};
