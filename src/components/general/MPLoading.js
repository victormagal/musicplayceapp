import React from 'react';
import { 
  ActivityIndicator, 
  StyleSheet, 
  Modal,
  View 
} from 'react-native';
import PropTypes from 'prop-types';

class MPLoading extends React.Component {

  render() {
    return (
      <Modal animationType="none" transparent={true} visible={this.props.visible} onRequestClose={()=> {}}>
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
    backgroundColor: '#00000077'
  },
  text: {
    color: '#000000'
  }
});

export { MPLoading };
