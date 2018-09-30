import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  MPText,
  MPGradientButton
} from '../../components';
import {MPRegisterPayment} from './MPRegisterPayment';
import {MPCheckBox} from '../forms';
import {MPAddPlanSuccess} from './MPAddPlanSuccess';
import {updateLocalCard} from '../../state/action';

class MPAddPaymentComponent extends React.Component {

  confirmPayment() {
    //TODO: call action to add card and upgrade plan
    //this.props.dispatch(addCard(this.props.card));
    //this.props.navigation.navigate('message', {component: MPAddPlanSuccess, title: 'Assinatura ativa!'});
  }

  handleFavoriteCard = (checked) => {
    let {card} = this.props;
    if(!card){
      card = {};
    }

    card.favorite = checked;
    this.props.dispatch(updateLocalCard(card));
  };


  render() {
    const price = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(this.props.plan.attributes.value).replace('R$', '');

    return (
      <View style={styles.container}>
        <MPText style={styles.title}>O valor de R$ {price} será cobrado mensalmente no cartão cadastrado abaixo.</MPText>
        <MPRegisterPayment />
        <MPCheckBox style={styles.checkbox} title={'Esta é minha forma de pagamento preferida.'} onChange={this.handleFavoriteCard}/>
        <MPGradientButton title={'Confirmar'} onPress={this.confirmPayment.bind(this)} textSize={16}
                          style={{marginHorizontal: 80}}/>
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
  title: {
    textAlign: 'center',
    marginTop: 30,
    marginHorizontal: 40,
    fontSize: 16,
    fontFamily: 'ProbaPro-Regular',
    color: '#686868',
  }
});

const mapStateToProps = ({plansReducer}) => {
  return {...plansReducer};
};

const MPAddPayment = connect(mapStateToProps)(MPAddPaymentComponent);
export {MPAddPayment};
