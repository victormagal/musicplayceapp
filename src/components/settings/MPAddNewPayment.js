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

class MPAddNewPaymentComponent extends React.Component {

  render() {

    return (
        <View>
            <MPRegisterPayment />
            <MPCheckBox style={{paddingHorizontal: 40, marginTop: 30}} title={'Esta é minha forma de pagamento preferida.'}/>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#fff',
  },
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPAddNewPayment = connect(mapStateToProps)(MPAddNewPaymentComponent);
export { MPAddNewPayment };