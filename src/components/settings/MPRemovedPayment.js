import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
    MPText,
  MPGradientButton,
  MPHelpSuccess
} from '../../components';

class MPRemovedPaymentComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <MPText style={ styles.title }>Cartão removido da sua lista com sucesso.</MPText>
        <MPGradientButton style={ styles.button } title={'OK'}   textSize={16} onPress={this.handleBack.bind(this)}/>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor : '#fff',
    flex: 1,
  },
  title: {
    marginBottom: 20,
    marginHorizontal: 40,
    marginTop: 30,
    fontSize: 24,
    color : '#000',
    fontFamily: 'montSerrat',
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 133,
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPRemovedPayment = connect(mapStateToProps)(MPRemovedPaymentComponent);
export { MPRemovedPayment };