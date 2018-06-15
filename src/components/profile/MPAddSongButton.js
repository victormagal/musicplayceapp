import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import { MPText } from '../general';
import { MPFollowingIcon, MPFollowIcon, MPAddSongNoteIcon, MPAddSongPlusIcon } from '../../assets/svg';

class MPAddSongButtonComponent extends Component{

    render() {
        let { isColored } = this.props;
        let backgroundStyle = isColored ? {backgroundColor: '#f60'} : {backgroundColor: '#fff'};
        return (
            <TouchableOpacity style={[styles.parent, backgroundStyle]}>
            {
                isColored ? (
                    <View style={styles.buttonContainer}>
                        <MPAddSongNoteIcon />
                        <MPAddSongPlusIcon />
                    </View>
                    ) : (
                    <View style={styles.buttonContainer}>
                        <MPAddSongNoteIcon />
                        <MPAddSongPlusIcon />
                    </View>
                )
            }
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
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPAddSongButton = connect(mapStateToProps)(MPAddSongButtonComponent);
export { MPAddSongButton };

