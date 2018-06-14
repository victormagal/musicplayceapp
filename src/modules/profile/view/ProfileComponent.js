import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo';
import PropTypes from 'prop-types';
import { MPAddChangePhoto, MPProfileInfo, MPText } from '../../../components/';
import {MPLocationPinIcon} from '../../../assets/svg';


class ProfileComponent extends React.Component {
    render() {
        let {profile} = this.props;

        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={["rgba(1, 1, 1, 0.2)", "#e13223"]}
                    style={styles.gradient}>

                    <MPAddChangePhoto hasPhoto={true} />
                    <MPProfileInfo profile={profile} />
                </LinearGradient>
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