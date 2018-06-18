import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import { MPText } from '../general';
import { LinearGradient } from 'expo';
import { MPFollowingIcon, MPFollowIcon, MPAddSongNoteIcon, MPAddSongPlusIcon, MPAddSongWhiteNoteIcon, MPAddSongWhitePlusIcon } from '../../assets/svg';

class MPAddSongButtonComponent extends Component{

    render() {
        let { isColored } = this.props;
        let linearColorOptions = [['#BB1A1A', '#2E2C9D'], ['#FFF', '#FFF']];
        let linearColor = isColored ? linearColorOptions[0] : linearColorOptions[1];

        return (
            <TouchableOpacity style={[styles.parent]}>
                <LinearGradient
                    colors={linearColor}
                    start={[0.0, 0]}
                    end={[1.0, 0]}
                    style={[styles.linear]}
                    selected={true}>
                    {
                        isColored ? (
                            <View style={styles.buttonContainer}>
                                <MPAddSongWhiteNoteIcon />
                                <MPAddSongWhitePlusIcon />
                            </View>
                        ) : (
                            <View style={styles.buttonContainer}>
                                <MPAddSongNoteIcon />
                                <MPAddSongPlusIcon />
                            </View>
                        )
                    }
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    parent:{
        width: 44,
        height: 44,
        borderRadius: 22,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    buttonContainer: {
        flex: 1,
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    linear: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
      },
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPAddSongButton = connect(mapStateToProps)(MPAddSongButtonComponent);
export { MPAddSongButton };

