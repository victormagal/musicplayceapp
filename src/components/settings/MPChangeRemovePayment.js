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
import { MPConfirmRemovePayment } from './MPConfirmRemovePayment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class MPChangeRemovePaymentComponent extends React.Component {

  removePayment(){
    this.props.navigation.navigate('message', { component: MPConfirmRemovePayment, title: 'Remover cartão' });
  }
  
  render() {
    let {card, onRemovePayment} = this.props;
    return (
        <KeyboardAwareScrollView style={styles.container}>
            <MPRegisterPayment card={card} />
            <MPCheckBox style={{paddingHorizontal: 40, marginTop: 30}} title={'Esta é minha forma de pagamento preferida.'}/>
            <MPGradientBorderButton title={'REMOVER CARTÃO'} style={{alignSelf: 'center', marginTop: 174}} onPress={this.removePayment.bind(this)}/>
        </KeyboardAwareScrollView>
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