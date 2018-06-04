import React from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import PropTypes from 'prop-types';
import {MPHeader} from './MPHeader';

class MPModal extends React.Component {

  render() {
    return (
        <Modal animationType="slide" visible={this.props.visible}>
          <MPHeader title={this.props.title}/>
          <View style={styles.container}>
            {this.props.children}
          </View>
        </Modal>
    );
  }
}

MPModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  }
});

export { MPModal };
