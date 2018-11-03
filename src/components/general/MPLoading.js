import React from 'react';
import { 
  ActivityIndicator, 
  StyleSheet, 
  Modal,
  View 
} from 'react-native';
import PropTypes from 'prop-types';
import {MPText} from './MPText';

class MPLoading extends React.Component {

  render() {
    return (
      <Modal animationType="none" transparent={true} visible={this.props.visible} onRequestClose={()=> {}}>
        <View style={styles.container}>
          <View style={styles.content}>
            <ActivityIndicator size="large" color="#BB1A1A" />
            <MPText style={styles.text}>Carregando...</MPText>
          </View>
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
  content: {
    alignSelf: 'center'
  },
  text: {
    paddingTop: 15,
    fontFamily: 'ProbaPro-Regular',
    fontSize: 18,
    color: '#fff'
  }
});

export { MPLoading };
