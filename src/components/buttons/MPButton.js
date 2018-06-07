import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo';
import PropTypes from 'prop-types';
import {MPText} from '../general/MPText';

class MPButton extends Component {

  render() {
    let {style, title, textSize, onPress, icon} = this.props;
    let textSizeStyle = textSize != null ? {fontSize: textSize} : {};
    let Icon = icon;

    return (
      <TouchableOpacity style={[style || {}, styles.linear]} onPress={onPress}>
        {icon && <Icon style={styles.icon}/>}
        <MPText style={[styles.text, {fontFamily: 'montSerratSemiBold'}, textSizeStyle]}>
          {title}
        </MPText>
      </TouchableOpacity>
    );
  }
}

MPButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  textSize: PropTypes.number,
  style: PropTypes.any,
  selected: PropTypes.bool,
  icon: PropTypes.symbol
};

const styles = StyleSheet.create({
  linear: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 10,
    color: '#fff'
  },
  icon: {
    position: 'absolute',
    left: 6
  }
});

export {MPButton};
