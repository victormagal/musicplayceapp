import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {LinearGradient} from 'expo';
import PropTypes from 'prop-types';
import { MPTabBar, MPProfileInfo, MPShowLanguages, MPHeader, MPFooter, MPFollowButton, ProfileIndicatorCE, MPAddSongButton, MPAddChangePhoto, MPText, MPUploadFirstSong, MPShowFollowers } from '../../../components/';
import { MPProfileArrowIcon } from '../../../assets/svg/'


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
                    colors={["rgba(1, 1, 1, 0.2)", "#e13223"]}
                    style={styles.gradient}>
                    <MPHeader transparent={true} title={""}/>
                    {
                        profile.visiting ? (
                            <MPFollowButton isFollowing={profile.isFollowing} />
                        ) : (
                            <MPAddChangePhoto hasPhoto={profile.hasPhoto} />
                        )
                    }
                    <MPProfileInfo profile={profile} />
                    <View style={{flexDirection: 'row', marginBottom: 20, marginHorizontal: 20}}>
                        <ProfileIndicatorCE style={{ flex: 1}} title="Indicações Feitas" subtitle="Explore" />
                        <ProfileIndicatorCE style={{ flex: 1}} title="Seguidores" subtitle="Convide seus amigos"/>
                    </View>
                    {
                        profile.languages != '' ? (
                            <MPShowLanguages languages={profile.languages} />
                        ) : null
                    }
                    <View style={{alignSelf: 'center', justifyContent: 'center', marginBottom: 20,}} onPress={this.toggleState.bind(this)}>
                        <MPProfileArrowIcon />
                    </View>
                </LinearGradient>
                {
                    this.state.profileOption ? (
                        <MPTabBar firstTabTitle={'MINHAS MÚSICAS'} secondTabTitle={"MÚSICAS SALVAS"}>
                            <View style={{flex:1}}>
                                <MPUploadFirstSong />
                                <MPShowFollowers />
                            </View>
                            <View style={{flex:1}}></View>
                        </MPTabBar>
                    ) : null
                }
                <MPAddSongButton isColored={true} />
            </ScrollView>
        );
    }
}

ProfileComponent.propTypes = {
  profile: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff'
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
