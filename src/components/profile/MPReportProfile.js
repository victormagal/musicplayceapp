import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { MPText } from '../general';
import { MPReportIcon } from '../../assets/svg';

class MPReportProfileComponent extends Component{

    render() {
        return (
            <View style={ styles.parent }>
                <MPReportIcon style={{alignSelf: 'center'}} />
                <MPText style={ styles.reportText }>Denunciar perfil</MPText>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    parent: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        height: 76,
        backgroundColor: '#FCFCFC',
        borderTopWidth: 1,
        borderColor: '#fff'
    },
    reportText: {
        alignSelf: 'center',
        fontSize: 12,
        fontFamily: 'montSerratMedium',
        color: '#686868',
        textDecorationLine: 'underline',
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPReportProfile = connect(mapStateToProps)(MPReportProfileComponent);
export { MPReportProfile };

