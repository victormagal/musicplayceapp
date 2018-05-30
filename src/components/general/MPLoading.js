import React from 'react';
import { View, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import PropTypes from 'prop-types';

class MPLoading extends React.Component {

  render() {
    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.visible}>
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#bb1a1a" />
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
    backgroundColor: '#00000077'
  }
});

export { MPLoading };
