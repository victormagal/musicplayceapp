import React from 'react';
import {
  StyleSheet, View, TouchableOpacity
} from 'react-native';


class MPFormButton extends React.Component {

  defaultOnPress = null;

  componentDidMount(){
    let button = this.getButton();
    this.defaultOnPress = button.props.onPress;
  }

  handlePress = (e) => {
    const {onSubmit, onBeforeSubmit} = this.props;
    onBeforeSubmit && onBeforeSubmit();

    if(onSubmit()){
      this.defaultOnPress && this.defaultOnPress();
    }
  };

  getButton(){
    let button = null;
    if(Array.isArray(this.props.children)){
      button = this.props.children[0];
    }else{
      button = React.Children.only(this.props.children);
    }
    return button;
  }

  render() {
    let button = this.getButton();
    return React.cloneElement(button, {onPress: this.handlePress});
  }
}

export {MPFormButton};
