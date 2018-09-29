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
      number: '',
      dueDate: '',
      cvv: '',
      cpf: '',
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
        <MPInput label={'Número do cartão'} name="number" value={this.state.card.number} onChangeText={this.handleChangeText}/>
        <View style={{flexDirection: 'row'}}>
            <MPInput label={'Vencimento'} name="dueDate" value={this.state.card.dueDate} style={{flex: 1, marginEnd: 20}} onChangeText={this.handleChangeText}/>
            <MPInput label={'CVV'} name="cvv" value={this.state.card.cvv} style={{flex: 1,}} onChangeText={this.handleChangeText}/>
        </View>
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
