import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { MPText } from '../general';

class MPAddChangePhotoComponent extends Component{

    render() {
        let { hasPhoto } = this.props;
        
        return (
                hasPhoto ? (
                    <View style={ styles.hasPhotoContainer }>
                        <View style={ styles.photoButtonContainer }>
                            <MPText style={ styles.photoButtonText }>Alterar foto</MPText>
                        </View>
                    </View>
                ) : (
                    <View style={ styles.noPhotoContainer }>
                        <View style={ styles.noPhotoIcon }></View>
                        <MPText style={ styles.photoButtonText }>Adicionar foto</MPText>
                    </View>
                )
        )
    }
}

const styles = StyleSheet.create({
    hasPhotoContainer: {
        height: 220,
        justifyContent: 'flex-end',
        marginStart: 20,
        marginEnd: 206,
        marginBottom: 20,
    },
    photoButtonContainer: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 14,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    photoButtonText:{
        color: '#fff',
        fontSize: 12,
        fontFamily: 'montSerrat'
    },
    noPhotoContainer: {
        height: 220,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection : 'row', 
        marginHorizontal: 20,
        marginBottom: 20,
    },
    noPhotoIcon: {
        width: 66, 
        height: 66,
        backgroundColor: '#06f',
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPAddChangePhoto = connect(mapStateToProps)(MPAddChangePhotoComponent);
export { MPAddChangePhoto };

