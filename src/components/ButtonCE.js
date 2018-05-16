import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo';
import PropTypes from 'prop-types';

class ButtonCE extends Component{

    render() {
        let {style, title} = this.props;

        return (
            <TouchableOpacity style={style || {}}>
                <LinearGradient
                    colors={linearColors}
                    start={[0.0, 0]}
                    end={[1.0, 0]}
                    style={styles.linear}>
                    <Text style={styles.text}>
                        {title}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

ButtonCE.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.any
};

const linearColors = ['#bb1a1a', '#2e2c9d'];
const styles = StyleSheet.create({
    linear: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 25
    },
    text: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold'
    }
});

export {ButtonCE};

