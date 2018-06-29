import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  MPText,
  MPGradientButton
} from '../../components';
import { MPRegisterPayment } from './MPRegisterPayment';
import { MPCheckBox } from '../forms';
import { MPAddPlanSuccess } from './MPAddPlanSuccess';

class MPAddPaymentComponent extends React.Component {
    confirmPayment(){
        this.props.navigation.navigate('message', { component: MPAddPlanSuccess, title: 'Cadastre seu cartão, é 100% seguro' });
    }
  render() {
    return (
        <View style={styles.container}>
            <MPText style={styles.title}>O valor de R$550,00 será cobrado anualmente no cartão cadastrado abaixo.</MPText>
            <MPRegisterPayment />
            <MPCheckBox style={styles.checkbox} title={'Esta é minha forma de pagamento preferida.'}/>
            <MPGradientButton title={'Confirmar'} onPress={this.confirmPayment.bind(this)} textSize={16} style={{marginHorizontal: 80}} />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: '#fff',
  },
  checkbox: {
    paddingHorizontal: 40,
    marginVertical: 30
  },
  title:{
      textAlign: 'center',
      marginTop: 30,
      marginHorizontal: 40,
      fontSize: 16,
      fontFamily: 'probaProRegular',
      color: '#686868',
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPAddPayment = connect(mapStateToProps)(MPAddPaymentComponent);
export { MPAddPayment };