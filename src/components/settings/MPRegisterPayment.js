import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  MPTextField,
} from '../../components';

class MPRegisterPaymentComponent extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <MPTextField label={'Número do cartão'}/>
        <View style={{flexDirection: 'row'}}>
            <MPTextField label={'Vencimento'} style={{flex: 1, marginEnd: 20}}/>
            <MPTextField label={'CVV'} style={{flex: 1,}}/>
        </View>
        <MPTextField label={'CPF do titular'}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
      marginHorizontal: 40,
  },
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPRegisterPayment = connect(mapStateToProps)(MPRegisterPaymentComponent);
export { MPRegisterPayment };