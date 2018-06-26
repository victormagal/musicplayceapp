import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { MPText } from '../general';
import { MPReportIcon } from '../../assets/svg';

class MPReportProfileComponent extends Component{

    render() {
        let { onPress } = this.props;
        return (
            <TouchableOpacity style={ styles.parent } onPress={onPress}>
                <MPReportIcon style={{alignSelf: 'center'}} />
                <MPText style={ styles.reportText }>Denunciar perfil</MPText>
            </TouchableOpacity>
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
        marginStart: 5,
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPReportProfile = connect(mapStateToProps)(MPReportProfileComponent);
export { MPReportProfile };

