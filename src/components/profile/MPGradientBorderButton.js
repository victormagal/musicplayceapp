import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import { LinearGradient} from 'expo';
import { MPText } from '../general';
import { MPFollowingIcon, MPFollowIcon } from '../../assets/svg';

class MPGradientBorderButtonComponent extends Component{

    render() {
        let { onPress } = this.props;
        
        return (
            <TouchableOpacity style={styles.parent} onPress={ onPress }>
                <LinearGradient   
                    colors={['#BB1A1A', '#2E2C9D']}
                    style={styles.outButton}
                    selected={true}>
                    <View style={ styles.inButton}>
                        <MPText style={styles.inText}>Editar</MPText>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    parent:{
        width: 64,
        alignSelf: 'flex-end',
    },
    outButton: {
        padding: 1,
        borderRadius: 25,
        overflow: 'hidden',
    },
    inButton: {
        backgroundColor: '#FCFCFC',
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 8,
    },
    inText: {
        color: '#000',
        fontSize: 10,
        fontFamily: 'montSerratMedium',
        textAlign: 'center',
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPGradientBorderButton = connect(mapStateToProps)(MPGradientBorderButtonComponent);
export { MPGradientBorderButton };

