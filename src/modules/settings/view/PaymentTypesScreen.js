import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import { 
  MPHeader, 
  MPPaymentTypes,
  MPCreditBonus,
  MPAddBonus,
  MPShowBonuses,
  MPAddNewPayment,
  MPChangeRemovePayment,
  MPConfirmRemovePayment
} from '../../../components';
import { connect } from 'react-redux';

class PaymentTypesScreenContainer extends React.Component {

  state = {
    cards: [
      {
        number: '1111 2222 3333 3535',
        dueDate: '17/12',
        cvv: '353',
        cpf: '037.487.923-01',
        isFavorite: true,
      },
      {
        number: '1111 2222 3333 6578',
        dueDate: '18/12',
        cvv: '657',
        cpf: '037.487.923-02',
        isFavorite: false,
      },
      {
        number: '1111 2222 3333 5565',
        dueDate: '19/12',
        cvv: '556',
        cpf: '037.487.923-03',
        isFavorite: false,
      },
      {
        number: '1111 2222 3333 4465',
        dueDate: '20/12',
        cvv: '446',
        cpf: '037.487.923-04',
        isFavorite: false,
      },
    ],
    bonus: [
      {
        id: '00',
        name: 'Lançamento',
        dueDate: '15/09/2018',
        value: '45,00',
        valid: true,
      },
      {
        id: '01',
        name: 'Lançamento',
        dueDate: '15/09/2018',
        value: '45,00',
        valid: false,
      },
      {
        id: '02',
        name: 'Lançamento',
        dueDate: '15/09/2018',
        value: '45,00',
        valid: false,
      },
      ,
      {
        id: '02',
        name: 'Lançamento',
        dueDate: '15/09/2018',
        value: '45,00',
        valid: false,
      },
    ]
  }

  addPayment(){
    this.props.navigation.navigate('message', { component: MPAddNewPayment, title: 'Cadastre seu cartão, é 100% seguro' });
  }

  editPayment(){
    this.props.navigation.navigate('message', { component: MPChangeRemovePayment, title: 'Cadastre seu cartão, é 100% seguro' });
  }

  handleBack = () => {
    this.props.navigation.pop();
  };

  render() {
    let creditBonus = 60;
    return (
      <View style={styles.parent}>
        <MPHeader
          back={true}
          onBack={this.handleBack}
          title={"Mantenha sua carteira atualizada"}
        />
        <ScrollView style={styles.scroll}>
          <MPPaymentTypes 
            cards={this.state.cards}
            onAddPayment={this.addPayment.bind(this)}
            onEditPayment={this.editPayment.bind(this)} />
          {
            creditBonus ? (
              <MPCreditBonus creditBonus={creditBonus} />
            ) : null
          }
          <MPAddBonus />
          {
            this.state.bonus ? (
              <MPShowBonuses bonus={this.state.bonus}/>
            ) : null
          }
        </ScrollView>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'flex-end'
  },
  scroll: {
    flex: 2
  },
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const PaymentTypesScreen = connect(mapStateToProps)(PaymentTypesScreenContainer);
export { PaymentTypesScreen };
