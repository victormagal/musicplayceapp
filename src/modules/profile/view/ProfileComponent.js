import React from 'react';
import {View, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo';
import PropTypes from 'prop-types';
import { MPProfileInfo, MPShowLanguages, MPHeader, MPFooter, MPFollowButton, ProfileIndicatorCE, MPAddSongButton, MPAddChangePhoto } from '../../../components/';


class ProfileComponent extends React.Component {
    render() {
        let {profile} = this.props;

        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={["rgba(1, 1, 1, 0.2)", "#e13223"]}
                    style={styles.gradient}>
                    <MPHeader back={true} onBack={this.handleBackClick} title={""}/>
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
                </LinearGradient>
                <MPAddSongButton isColored={false} />
            </View>
        );
    }
}

ProfileComponent.propTypes = {
  profile: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
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