import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo';
import PropTypes from 'prop-types';
import {MPText} from '../general/MPText';

class MPGradientButtonComponent extends Component {

  render() {
    let {style, title, selected, textSize, onPress, icon} = this.props;
    if (selected == null) {
      selected = true;
    }

    let borderStyle = selected ? {} : {borderWidth: 1, borderColor: '#E13223'};
    let linearColorOptions = [['#BB1A1A', '#2E2C9D'], ['transparent', 'transparent']];
    let linearColor = selected ? linearColorOptions[0] : linearColorOptions[1];
    textStyle.fontSize = textSize ? textSize : 12;
    textStyle.color = selected ? '#FFFFFF' : '#E13223';

    let textStyleRef = StyleSheet.create({textStyle}).textStyle;

    let Icon = icon;

    return (
      <TouchableOpacity style={[styles.container, style || {}]} onPress={onPress}>
        <LinearGradient
          colors={linearColor}
          start={[0.0, 0]}
          end={[1.0, 0]}
          style={[styles.linear, borderStyle]}
          selected={true}>
          {icon && <Icon style={styles.icon}/>}
          <MPText style={textStyleRef}>
            {title}
          </MPText>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

MPGradientButtonComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  textSize: PropTypes.number,
  style: PropTypes.any,
  selected: PropTypes.bool,
  icon: PropTypes.symbol
};

const textStyle = {
  fontFamily: 'montSerratSemiBold',
  backgroundColor: 'transparent',
  fontSize: 10,
  color: '#FFFFFF'
};

const styles = StyleSheet.create({
  container: {
    height: 40,
  },
  linear: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  icon: {
    position: 'absolute',
    left: 6
  }
});

const MPGradientButton = MPGradientButtonComponent;
export {MPGradientButton};
