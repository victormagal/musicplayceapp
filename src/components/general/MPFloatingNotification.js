import React, {Component} from 'react';
import {View, Modal, StyleSheet} from 'react-native';
import {MPText} from '../general';


class MPFloatingNotification extends Component {

  renderIcon() {
    if (this.props.icon) {
      return (
        <View style={styles.icon}>
          {this.props.icon}
        </View>
      );
    }

    return null;
  }

  render() {
    return (
      <Modal animationType="none" transparent={true} visible={this.props.visible} onRequestClose={()=> {}}>
        <View style={styles.container}>
          <View style={styles.content}>
            {this.renderIcon()}
            <MPText style={styles.text}>{this.props.text}</MPText>
          </View>
        </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000066',
    flex: 1
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 45,
    marginTop: 60,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  icon: {
    marginLeft: 15,
    marginRight: 10,
    alignSelf: 'center'
  },
  text: {
    fontFamily: 'ProbaPro-Regular',
    fontSize: 16,
    color: '#767676',
    alignSelf: 'center'
  }
});

export {MPFloatingNotification};
