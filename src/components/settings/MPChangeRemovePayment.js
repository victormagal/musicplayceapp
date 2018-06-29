import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  MPText,
  MPTextField,
  MPGradientButton
} from '../../components';
import { MPRegisterPayment } from './MPRegisterPayment';
import { MPCheckBox } from '../forms';
import { MPGradientBorderButton } from '../profile';

class MPChangeRemovePaymentComponent extends React.Component {

  render() {

    return (
        <View style={styles.container}>
            <MPRegisterPayment />
            <MPCheckBox style={{paddingHorizontal: 40, marginTop: 30}} title={'Esta é minha forma de pagamento preferida.'}/>
            <MPGradientBorderButton title={'REMOVER CARTÃO'} style={{alignSelf: 'center', marginTop: 174}} />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPChangeRemovePayment = connect(mapStateToProps)(MPChangeRemovePaymentComponent);
export { MPChangeRemovePayment };