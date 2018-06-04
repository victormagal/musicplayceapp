import React from 'react';
import {
  Animated, StyleSheet, View, Text, TouchableWithoutFeedback
} from 'react-native';
import {connect} from 'react-redux';
import {LinearGradient} from 'expo';
import Svg, { Path } from 'react-native-svg';
import {MPText} from '../general/MPText';


class MPSwitchComponent extends React.Component {

  state = {
    switchValue: false,
    switchAnim: new Animated.Value(0)
  };

  linearValues = {
    true: ['#bb1a1a', '#2e2c9d'],
    false: ['#dfdfdf', '#dfdfdf']
  };

  handleToggleSwitch = () => {
    let value = !this.state.switchValue;
    this.setState({switchValue: !this.state.switchValue});

    Animated.timing(
      this.state.switchAnim,
      {
        toValue: value ? 33 : 0,
        duration: 300
      }
    ).start();
  };

  render() {
    let { label } = this.props;
    return (
      <View style={styles.parent}>
        <View style={styles.areaSwitch}>
          <View style={styles.boxText}>
            <MPText style={styles.text}>{label}</MPText>
          </View>
          <TouchableWithoutFeedback onPress={this.handleToggleSwitch}>
            <LinearGradient
              colors={this.linearValues[this.state.switchValue]}
              start={[0.0, 0]}
              end={[1.0, 0]}
              style={styles.boxSwitch} >
                <Animated.View style={[styles.iconSwitch, {left: this.state.switchAnim}]}>
                  <Svg width="10" height="10" viewBox="0 0 10 10">
                    <Path fill="#E9E9E9" d="M1 0a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v8a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1z"/>
                  </Svg>
                </Animated.View>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    marginTop: 20,
    marginHorizontal: 40,
    display: 'flex',
    backgroundColor: '#FCFCFC',
    justifyContent: 'flex-end'
  },
  areaSwitch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  boxText: {
    alignItems: 'flex-start',
    flex: 0.8
  },
  text: {
    fontSize: 14,
    fontFamily: 'montSerratMedium',
    color: '#000000'
  },
  boxSwitch: {
    display: 'flex',
    width: 50,
    height: 26,
    borderRadius: 15,
    flex: 0.2
  },
  iconSwitch: {
    width: 22,
    height: 22,
    margin: 2,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const MPSwitch = connect(mapStateToProps)(MPSwitchComponent);
export {MPSwitch};
