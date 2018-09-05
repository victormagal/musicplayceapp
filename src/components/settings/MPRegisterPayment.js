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
  state = {
    card: {
      number: '',
      dueDate: '',
      cvv: '',
      cpf: '',
    }
  }

  componentDidMount(){
    let {card} = this.props;
    if(card){
      this.setState({card: card});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MPTextField label={'Número do cartão'} value={this.state.card.number}/>
        <View style={{flexDirection: 'row'}}>
            <MPTextField label={'Vencimento'} value={this.state.card.dueDate} style={{flex: 1, marginEnd: 20}}/>
            <MPTextField label={'CVV'} value={this.state.card.cvv} style={{flex: 1,}}/>
        </View>
        <MPTextField label={'CPF do titular'} value={this.state.card.cpf}/>
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