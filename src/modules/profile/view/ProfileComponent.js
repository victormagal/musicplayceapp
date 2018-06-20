import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {LinearGradient} from 'expo';
import PropTypes from 'prop-types';
import { MPTabBar, MPProfileInfo, MPShowLanguages, MPHeader, MPFooter, MPFollowButton, ProfileIndicatorCE, MPAddSongButton, MPAddChangePhoto, MPText, MPUploadFirstSong, MPShowFollowers, MPShowAgencies, MPReportProfile, MPShowFolderSongs, MPGradientButton } from '../../../components/';
import { MPProfileArrowIcon } from '../../../assets/svg/'
import { MPUpgradeButton } from '../../../components/profile/MPUpgradeButton';


class ProfileComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            profileOption: true,
        }
    }

    toggleState = () => {
        this.setState({[profileOption]: !this.state.profileOption});
      }

    render() {
        let {profile} = this.props;

        return (
            <ScrollView style={styles.container}>
                <LinearGradient
                    colors={["rgba(0, 0, 0, 0.2)", "#e13223"]}
                    style={styles.gradient}>
                    <MPHeader transparent={true} title={""}/>
                    {
                        profile.visiting ? (
                            <MPFollowButton isFollowing={profile.isFollowing} />
                        ) : (
                            <MPAddChangePhoto hasPhoto={profile.hasPhoto} />
                        )
                    }
                    <View style={{flex: 1}}>
                        <MPProfileInfo profile={profile} />
                        <View style={{flexDirection: 'row', marginBottom: 20, marginHorizontal: 20}}>
                            <ProfileIndicatorCE style={{ flex: 1}} title="Indicações Feitas" subtitle="Explore" count={profile.indicationCount}/>
                            <ProfileIndicatorCE style={{ flex: 1}} title="Seguidores" subtitle="Convide seus amigos" count={profile.followerCount}/>
                        </View>
                        {
                            profile.languages != '' ? (
                                <MPShowLanguages languages={profile.languages} />
                            ) : null
                        }
                        {
                            profile.agencies != '' ? (
                                <MPShowAgencies agencies={profile.agencies} isArtist={profile.isArtist}/>
                            ) : null
                        }
                        <View style={{alignSelf: 'center', justifyContent: 'center', marginBottom: 20}} onPress={this.toggleState.bind(this)}>
                            <MPProfileArrowIcon />
                        </View>
                    </View>
                </LinearGradient>
                {
                    this.state.profileOption ? (
                        <MPTabBar firstTabTitle={'MINHAS MÚSICAS'} secondTabTitle={"MÚSICAS SALVAS"}>
                            <View style={{flex:1}}>
                                {
                                    profile.mySongsFolder != '' ? (
                                        <View>
                                            <MPShowFolderSongs folderName={profile.mySongsFolder[0].folderName} edit={true}/>
                                            <MPShowFolderSongs folderName={profile.mySongsFolder[1].folderName} edit={true}/>
                                            <View style={styles.whiteBackground}>
                                                <MPGradientButton title={'Cadastrar nova música'} textSize={16} />
                                            </View>
                                        </View>
                                    ) : (
                                        <View>
                                        {
                                            profile.song == '' ? (
                                                <MPUploadFirstSong />
                                            ) : (
                                                <MPUpgradeButton song={profile.song} />
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
                            <View style={{flex:1}}>
                                {
                                    profile.savedSongsFolder != '' ? (
                                        <View>
                                            <MPShowFolderSongs folderName={profile.savedSongsFolder[0].folderName} edit={true}/>
                                            <MPShowFolderSongs folderName={profile.savedSongsFolder[1].folderName} edit={true}/>
                                            <View style={styles.whiteBackground}>
                                                <MPGradientButton title={'Cadastrar nova música'} textSize={16} />
                                            </View>
                                        </View>

                                    ) : (
                                        <View>
                                        {
                                            profile.song == '' ? (
                                                <MPUploadFirstSong />
                                            ) : (
                                                <MPUpgradeButton song={profile.song} />
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
                    ) : null
                }
                <MPAddSongButton isColored={this.state.profileOption} />
            </ScrollView>
        );
    }
}

ProfileComponent.propTypes = {
  profile: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#000',
    },
    gradient: {
        flex: 3,
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
