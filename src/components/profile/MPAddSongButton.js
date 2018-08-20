import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { MPAddMusicIcon, MPAddMusicRedIcon } from '../../assets/svg';

class MPAddSongButton extends Component{
  render() {
    const { isColored, onPress } = this.props;
    const linearColorOptions = [['#BB1A1A', '#2E2C9D'], ['#FFF', '#FFF']];
    const linearColor = isColored ? linearColorOptions[0] : linearColorOptions[1];

    return (
      <TouchableOpacity style={styles.parent} onPress={onPress}>
        <LinearGradient
          colors={linearColor}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linear}
          selected={true}>
            <View style={styles.buttonContainer}>
              {isColored ? <MPAddMusicIcon style={styles.icon} /> : <MPAddMusicRedIcon style={styles.icon} />}
            </View>
        </LinearGradient>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  parent:{
    position: 'absolute',
    bottom: 20,
    right: 20
  },
  buttonContainer: {
    flex: 1,
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  linear: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  icon: {
    width: 40,
    height: 40
  }
});

export { MPAddSongButton };

