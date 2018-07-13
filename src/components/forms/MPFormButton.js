import React from 'react';
import {
  StyleSheet, View, TouchableOpacity
} from 'react-native';


class MPFormButton extends React.Component {

  defaultOnPress = null;

  componentDidMount(){
    this.props.register(this.props.id, this);
    let button = React.Children.only(this.props.children);
    this.defaultOnPress = button.props.onPress
  }

  componentWillUnmount(){
    this.props.unregister(this.props.id);
  }

  handlePress = (e) => {
    if(this.props.onSubmit()){
      this.defaultOnPress && this.defaultOnPress();
    }
  };

  render() {
    let button = React.Children.only(this.props.children);
    return React.cloneElement(button, {onPress: this.handlePress});
  }
}

export {MPFormButton};
