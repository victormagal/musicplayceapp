import React, {Component} from 'react';
import { 
  StyleSheet,
  TouchableOpacity 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

class MPCircleGradientButton extends Component {

  render() {
    let {style, onPress, icon} = this.props;
    let Icon = icon;

    return (
      <TouchableOpacity style={[styles.container, style || {}]} onPress={onPress}>
        <LinearGradient
          colors={['#BB1A1A', '#2E2C9D']}
          start={{x:0, y:0}}
          end={{x:1, y:0}}
          style={[styles.linear]}>
          {icon && <Icon style={styles.icon}/>}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

MPCircleGradientButton.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.any,
  icon: PropTypes.any
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: 44
  },
  linear: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 200
  },
  icon: {
    alignSelf: 'center'
  }
});

export {MPCircleGradientButton};
