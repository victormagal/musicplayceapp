import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { MPConfigurationIcon, MPNotificationIcon, MPProfileIcon } from '../../assets/svg';

class MPFooter extends React.Component {

  onPress = () => {
    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.onPress} activeOpacity={0.5} underlayColor="transparent">
          <MPConfigurationIcon />
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.onPress} activeOpacity={0.5} underlayColor="transparent">
          <MPNotificationIcon />
        </TouchableHighlight>
        <TouchableHighlight style={styles.buttonActive} onPress={this.onPress} activeOpacity={0.5} underlayColor="transparent">
          <MPProfileIcon />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 0
    }
  },
  button: {
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1
  },
  buttonActive: {
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#E13223'
  }
});

export { MPFooter };
