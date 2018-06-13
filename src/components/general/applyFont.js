import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

export const applyFont = (WrapperComponent) => {
  return class extends Component {
    render() {
      let newProps = {...this.props};
      let {style} = this.props;
      delete newProps.style;

      style = style || {};

      if (!this.props.fontLoaded && style) {
        if (Array.isArray(style)) {
          for (let i in style) {
            if (!isNaN(style[i])) {
              style[i] = StyleSheet.flatten([style[i]]);
            }

            delete style[i]['fontFamily'];
          }
        } else {
          if (!isNaN(style)) {
            style = StyleSheet.flatten([style]);
          }
          delete style.fontFamily;
        }
      }

      return <WrapperComponent style={style} {...newProps} />
    }
  }
};