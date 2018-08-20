import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import {MPText} from "../general";

class MPCircleGradientButton extends Component {

  render() {
    let {style, onPress, icon, label, isImage} = this.props;
    let Icon = icon;
    return (
      <TouchableOpacity style={[styles.container, style || {}]} onPress={onPress}>
        {isImage ?
          <Image
            style={[styles.container, { borderRadius: 200 }, style || {}]}
            source={{ uri: icon }}
          />
          :
          <LinearGradient
            colors={['#BB1A1A', '#2E2C9D']}
            start={{x:0, y:0}}
            end={{x:1, y:0}}
            style={styles.linear}>
            {icon && <Icon style={styles.icon}/>}
            {label !== undefined &&
            <MPText style={{ color: '#FFF', padding: 8, paddingBottom: 0, textAlign: 'center' }}>
              {label}
            </MPText>
            }
          </LinearGradient>
        }
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
