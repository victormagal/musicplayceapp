import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MPText} from '../general';


class MPGradientBorderButton extends Component {

  render() {
    let {onPress, style, title} = this.props;
    let titleText = title ? title : 'Editar';

    return (
      <TouchableOpacity style={[styles.parent, style || {}]} onPress={ onPress }>
        <LinearGradient
          colors={['#BB1A1A', '#2E2C9D']}
          style={styles.outButton}
          selected={true}>
          <View style={ styles.inButton}>
            <MPText style={styles.inText}>{titleText}</MPText>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  parent: {
    alignSelf: 'flex-end',
  },
  outButton: {
    padding: 1,
    borderRadius: 25,
    overflow: 'hidden',
  },
  inButton: {
    backgroundColor: '#FCFCFC',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  inText: {
    color: '#000',
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
  }
});

export {MPGradientBorderButton};

