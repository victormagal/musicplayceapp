import React from 'react';
import { View, StyleSheet, ActivityIndicator, Modal, Text } from 'react-native';
import PropTypes from 'prop-types';

class MPLoading extends React.Component {

  render() {
    return (
        <Modal animationType="slide" transparent={true} visible={this.props.visible}>
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#BB1A1A" />
          </View>
        </Modal>
    );
  }
}

MPLoading.propTypes = {
  visible: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  text: {
    color: '#000000'
  }
});

export { MPLoading };
