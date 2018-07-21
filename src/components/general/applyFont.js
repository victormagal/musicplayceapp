import React, {Component} from 'react';
import {StyleSheet, Platform} from 'react-native';

const fontNames = {
  'Montserrat-Regular': 'montSerrat',
  'Montserrat-Light': 'montSerratLight',
  'Montserrat-Bold': 'montSerratBold',
  'Montserrat-Medium': 'montSerratMedium',
  'Montserrat-SemiBold': 'montSerratSemiBold',
  'Montserrat-BoldItalic': 'montSerratBoldItalic',
  'Montserrat-Italic': 'montSerratItalic',
  'ProbaPro-Regular': 'probaProRegular'
};

export const applyFont = (WrapperComponent) => {
  return class extends Component {
    render() {
      let newProps = {...this.props};
      let {style} = this.props;
      delete newProps.style;

      style = style || {};
      if (Array.isArray(style)) {
        for (let i in style) {
          if (!isNaN(style[i])) {
            style[i] = StyleSheet.flatten([style[i]]);
          }
          let fontName = style[i]['fontFamily'];
          if(Platform.OS !== 'ios' && fontName){
            style[i] = {...style[i], fontFamily: fontNames[fontName]}
          }
        }
      } else {
        if (!isNaN(style)) {
          style = StyleSheet.flatten([style]);
        }
        if(Platform.OS !== 'ios' && style.fontFamily){
          style = {...style, fontFamily: fontNames[style.fontFamily]};
        }
      }

      newProps.style = style;
      return <WrapperComponent {...newProps} />
    }
  }
};
