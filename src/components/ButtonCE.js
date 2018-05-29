import React, { Component } from 'react'; 
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';

class ButtonCE extends Component{

    render() {
        let {style, title, selected, textSize, onPress} = this.props;

        if(selected == null){
            selected = true;
        }
        
        let borderStyle = selected ? {} : {borderWidth : 1, borderColor: '#E13223'};

        let linearColorOptions = [['#bb1a1a', '#2E2C9D'], ['transparent', 'transparent']];
        let linearColor = selected ? linearColorOptions[0] : linearColorOptions[1];

        let textStyle = selected ? {} : { color: "#E13223", fontWeight: 'normal', fontFamily: 'montSerrat' };

        let textSizeStyle = textSize != null ? {fontSize: textSize} : {};

        return (
            <TouchableOpacity style={style || {}} onPress={onPress}>
                <LinearGradient
                    colors={linearColor}
                    start={[0.0, 0]}
                    end={[1.0, 0]}
                    style={[styles.linear, borderStyle]}
                    selected={true}>
                    <Text style={[styles.text, textStyle, textSizeStyle]}>
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
    textSize: PropTypes.number,
	style: PropTypes.any,
	selected: PropTypes.bool
};

const styles = StyleSheet.create({
	linear: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		alignItems: 'center',
		borderRadius: 25,
	},
	text: {
		backgroundColor: 'transparent',
        fontSize: 10,
		color: '#fff'
	}
});

export { ButtonCE };