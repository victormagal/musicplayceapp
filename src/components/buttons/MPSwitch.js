import React from 'react';
import {
  Animated, StyleSheet, View, Text, TouchableWithoutFeedback
} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import {MPText} from '../general/MPText';


class MPSwitchComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      switchAnim: new Animated.Value(0),
      value: !!props.value,
    };
  }

  linearValues = {
    true: ['#bb1a1a', '#2e2c9d'],
    false: ['#dfdfdf', '#dfdfdf']
  };

  componentDidMount(){
    if(typeof this.props.value !== undefined){
      this.animateSwitch(this.props.value, 0);
    }
  }

  componentWillReceiveProps(nextProps){
    if(typeof nextProps.value !== undefined){
      this.setState({value: nextProps.value});
      this.animateSwitch(nextProps.value, 300);
    }
  }

  handleToggleSwitch = () => {
    let {name, onChangeSwitch} = this.props;

    let value = !this.state.value;
    this.setState({value});
    this.animateSwitch(value, 300);
    onChangeSwitch && onChangeSwitch({name, value});
  };

  animateSwitch = (value, duration) => {
    Animated.timing(
      this.state.switchAnim,
      {
        toValue: value ? 33 : 0,
        duration: duration
      }
    ).start();
  }

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
              colors={this.linearValues[this.state.value]}
              start={{x:0, y: 0}}
              end={{x:1, y:0}}
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
    fontFamily: 'Montserrat-Medium',
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

const mapStateToProps = ({userReducer}) => {
  return {...userReducer};
};

const MPSwitch = connect(mapStateToProps)(MPSwitchComponent);
export {MPSwitch};
