import React, { Component } from 'react'; 
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';

class ButtonCE extends Component{
	
	render() {
		let {style, title, selected} = this.props;
		let linearColorOptions = [['#bb1a1a', '#2e2c9d'], ['transparent', 'transparent']];
		let linearColor = selected ? linearColorOptions[0] : linearColorOptions[1];
		let textStyle = selected ? {} : {color: "#e13223", fontWeight: 'normal'};
		
		return (
			<TouchableOpacity style={style || {}}>
				<LinearGradient colors={linearColor} start={[0.0, 0]} end={[1.0, 0]} style={styles.linear} selected={true}>
					<Text style={[styles.text, textStyle]}>
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