import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { MPText } from '../general';

class MPShowAgenciesComponent extends Component{

    render() {
        let { agencies, isArtist } = this.props;
        
        return (
            <View style={ styles.parent }>
            {
                isArtist ? (
                    <MPText style={ styles.placeHolderText}>ARTISTA DA</MPText>
                ) : (
                    <MPText style={ styles.placeHolderText}>TRABALHA EM </MPText>    
                )
            }
            {
                agencies.map( i => {
                    return (<MPText style={styles.languageText}>{i}</MPText>)
                })
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parent: {
        flexDirection: 'row',
        paddingHorizontal : 20,
        marginBottom: 20,
        alignContent: 'center',
        height: 30,
        backgroundColor: '#e13223',
    },
    placeHolderText: {
        fontSize: 11,
        fontFamily: 'Montserrat-Medium',
        color : '#000',
        marginEnd: 12,
        alignSelf: 'center'
    },
    languageText: {
        fontSize: 12,
        fontFamily: 'Montserrat-Regular',
        color : '#FFF',
        textDecorationLine:'underline',
        alignSelf: 'center'
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPShowAgencies = connect(mapStateToProps)(MPShowAgenciesComponent);
export { MPShowAgencies };

