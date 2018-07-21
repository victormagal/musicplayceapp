import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { MPText } from '../general';

class MPShowLanguagesComponent extends Component{

    render() {
        let { languages } = this.props;
        
        return (
            <View style={ styles.parent }>
                <MPText style={ styles.placeHolderText}>Músicas em</MPText>
                {languages.map(i => <MPText style={styles.languageText}>{i}</MPText>)}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parent: {
        flexDirection: 'row',
        marginHorizontal : 20,
        marginBottom: 20,
    },
    placeHolderText: {
        fontSize: 12,
        fontFamily: 'Montserrat-Medium',
        color : '#000',
        marginEnd: 12,
    },
    languageText: {
        fontSize: 12,
        fontFamily: 'Montserrat-Regular',
        color : '#FFF',
        marginEnd: 12,
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPShowLanguages = connect(mapStateToProps)(MPShowLanguagesComponent);
export { MPShowLanguages };

