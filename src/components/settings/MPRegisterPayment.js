import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  MPInput
} from '../../components';
import {updateLocalCard} from '../../state/action';

class MPRegisterPaymentComponent extends React.Component {
  state = {
    card: {
      card_number: '',
      month: '',
      year: '',
      cvc: '',
      cardHolderName: '',
      cpf: '',
      favorite: ''
    }
  };

  componentDidMount(){
    let {card} = this.props;
    if(card){
      this.setState({card: card});
    }
  }

  handleChangeText = ({name, value}) => {
    let card = {...this.state.card};
    card[name] = value;
    this.setState({card});
    this.props.dispatch(updateLocalCard(card));
  };

  render() {
    return (
      <View style={styles.container}>
        <MPInput label={'Número do cartão'} name="card_number" value={this.state.card.card_number} onChangeText={this.handleChangeText}/>
        <View style={{flexDirection: 'row'}}>
          <MPInput label={'CVV'} name="cvc" value={this.state.card.cvc} style={{flex: 1, marginEnd: 10}} onChangeText={this.handleChangeText}/>
          <MPInput label={'Mês'} name="month" value={this.state.card.month} style={{flex: 1, marginEnd: 10}} onChangeText={this.handleChangeText}/>
          <MPInput label={'Ano'} name="year" value={this.state.card.year} style={{flex: 1}} onChangeText={this.handleChangeText} />
        </View>
        <MPInput label="Nome do titular" name="cardHolderName" value={this.state.card.cardHolderName} onChangeText={this.handleChangeText}/>
        <MPInput label={'CPF do titular'} name="cpf" value={this.state.card.cpf} onChangeText={this.handleChangeText}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
      marginHorizontal: 40,
  },
});

const mapStateToProps = () => {
  return {};
};

const MPRegisterPayment = connect(mapStateToProps)(MPRegisterPaymentComponent);
export { MPRegisterPayment };
