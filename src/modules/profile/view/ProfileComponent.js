import React from 'react';
import {View, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo';
import PropTypes from 'prop-types';
import { MPProfileInfo, MPShowLanguages, MPHeader, MPFooter, MPFollowButton } from '../../../components/';
import { MPAddSongButton } from '../../../components/profile/MPAddSongButton';


class ProfileComponent extends React.Component {
    render() {
        let {profile} = this.props;

        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={["rgba(1, 1, 1, 0.2)", "#e13223"]}
                    style={styles.gradient}>
                    <MPHeader back={true} onBack={this.handleBackClick} title={""}/>
                    <MPFollowButton isFollowing={false} />
                    {/* <MPAddChangePhoto hasPhoto={true} /> */}
                    <MPProfileInfo profile={profile} />
                    <MPShowLanguages languages={['Espanhol', 'Inglês', 'Português']} />
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
    },
    button: {
        width: 230
    }
});


export {ProfileComponent};
