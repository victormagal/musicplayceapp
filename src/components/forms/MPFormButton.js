import React from 'react';
import {
  StyleSheet, View, TouchableOpacity
} from 'react-native';


class MPFormButton extends React.Component {

  defaultOnPress = null;

  componentDidMount(){
    let button = React.Children.only(this.props.children);
    this.defaultOnPress = button.props.onPress;
  }

  handlePress = (e) => {
    if(this.props.children.props.onPress){
      this.defaultOnPress && this.defaultOnPress();
    }
  };

  render() {
    let button = React.Children.only(this.props.children);
    return React.cloneElement(button, {onPress: this.handlePress});
  }
}

export {MPFormButton};
