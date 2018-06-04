import React, {Component} from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import {MPText} from '../general/MPText';

class MPGradientButtonComponent extends Component {

  render() {
    let {style, title, selected, textSize, onPress, iconName, iconType} = this.props;

    if (selected == null) {
      selected = true;
    }

    let borderStyle = selected ? {} : {borderWidth: 1, borderColor: '#E13223'};

    let linearColorOptions = [['#bb1a1a', '#2E2C9D'], ['transparent', 'transparent']];
    let linearColor = selected ? linearColorOptions[0] : linearColorOptions[1];
    let textStyle = (selected ? {fontFamily: 'montSerratSemiBold'} : {color: "#E13223", fontFamily: 'montSerratSemiBold'});
    let textSizeStyle = textSize != null ? {fontSize: textSize} : {};

    return (
      <TouchableOpacity style={style || {}} onPress={onPress}>
        <LinearGradient
          colors={linearColor}
          start={[0.0, 0]}
          end={[1.0, 0]}
          style={[styles.linear, borderStyle]}
          selected={true}>
          { (() => {
            if (iconName != null && iconType != null) {
              return (<Icon name={ iconName } type={iconType} color='#fff' size={20} containerStyle={ styles.icon }/>);
            } else if (iconName != null) {
              return (<Icon name={ iconName } color='#fff' size={20} containerStyle={ styles.icon }/>);
            }
          })()
          }
          <MPText style={[styles.text, textStyle, textSizeStyle]}>
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
  iconName: PropTypes.string,
  iconType: PropTypes.string,
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

const MPGradientButton = MPGradientButtonComponent;
export { MPGradientButton };
