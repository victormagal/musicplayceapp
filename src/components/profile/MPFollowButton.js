import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import { MPText } from '../general';
import { MPFollowingIcon, MPFollowIcon } from '../../assets/svg';

class MPFollowButtonComponent extends Component{

    render() {
        let { isFollowing } = this.props;
        
        return (
            <TouchableOpacity style={styles.parent}>
            {
                isFollowing ? (
                    <View style={styles.followingButtonContainer}>
                        <MPFollowingIcon />
                        <MPText style={styles.followingText}>Seguindo</MPText>
                    </View>
                    ) : (
                    <View style={styles.followButtonContainer}>
                        <MPFollowIcon />
                        <MPText style={styles.followText}>Seguir</MPText>
                    </View>
                )
            }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    parent:{
        height: 225,
        justifyContent: 'flex-end',
        marginStart: 20,
        marginEnd: 236,
        marginBottom: 20,
    },
    followingButtonContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#fff',
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    followButtonContainer: {
        borderWidth: 1,
        borderColor: '#fff',
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderRadius: 16,
        flexDirection: 'row',
    },
    followingText: {
        color : '#e13223',
        fontSize: 12,
        fontFamily: 'montSerrat',
        marginStart: 10,
    },
    followText: {
        color : '#fff',
        fontSize: 12,
        fontFamily: 'montSerrat',
        marginStart: 5,
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPFollowButton = connect(mapStateToProps)(MPFollowButtonComponent);
export { MPFollowButton };

