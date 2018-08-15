import React from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';


class MPFade extends React.Component {

  state = {
    visible: false
  };

  fadeAnimation = null;

  constructor(props){
    super(props);
    this.state.visible = props.visible;
  }

  componentWillMount(){
    this.fadeAnimation = new Animated.Value(this.props.visible ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true });
    }
    Animated.timing(this.fadeAnimation, {
      toValue: nextProps.visible ? 1 : 0,
      duration: 10,
    }).start(() => {
      this.setState({ visible: nextProps.visible });
    });
  }

  render() {
    let {style} = this.props;

    const containerStyle = {
      opacity: this.fadeAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: this.fadeAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1],
          }),
        },
      ],
    };

    let styles = [containerStyle];

    if(this.state.visible){
      styles.push(style);
    }

    return (
      <Animated.View style={styles}>
        {this.state.visible && this.props.children}
      </Animated.View>
    );
  }
}

MPFade.propTypes = {
  visible: PropTypes.bool.isRequired
};

export { MPFade };
