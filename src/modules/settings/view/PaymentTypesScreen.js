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
  MPConfirmRemovePayment,
  MPIconButton,
  MPLoading
} from '../../../components';
import {addCard} from '../../../state/action';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from '../../../../node_modules/react-native-keyboard-aware-scroll-view';

class PaymentTypesScreenContainer extends React.Component {

  headerLeft = () => {
    return [<MPIconButton onPress={this.handleBack}  key={1} title={'Cancelar'}/>];
  };
  
  headerRight = () => {
    return [<MPIconButton onPress={this.handleAddChangeCard}  key={2} title={'Enviar'}/>];
  };

  handleAddChangeCard = () => {
    this.props.dispatch(addCard(this.props.card));
    this.handleBack();
  };

  addPayment(){
    this.props.navigation.navigate('message', { component: MPAddNewPayment, title: 'Cadastre seu cartão, é 100% seguro', headerLeft: this.headerLeft(), headerRight: this.headerRight()});
  }

  editPayment(card){
    this.props.navigation.navigate('message', { component: MPChangeRemovePayment, title: 'Cadastre seu cartão, é 100% seguro', headerLeft: this.headerLeft(), headerRight: this.headerRight(), card: card});
  }

  handleBack = () => {
    this.props.navigation.pop();
  };

  render() {
    // let creditBonus = 60;
    return (
      <View style={styles.parent}>
        <MPHeader
          back={true}
          onBack={this.handleBack}
          title={"Mantenha sua carteira atualizada"}
        />
        <KeyboardAwareScrollView style={styles.scroll}>
          <MPPaymentTypes 
            onAddPayment={this.addPayment.bind(this)}
            onEditPayment={this.editPayment.bind(this)} />

          <MPLoading visible={this.props.loading}/>
        </KeyboardAwareScrollView>
      </View>
    );
  }
  
}

/** BONUS VIEW
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
 */



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

const mapStateToProps = ({plansReducer}) => {
  return {...plansReducer};
};

const PaymentTypesScreen = connect(mapStateToProps)(PaymentTypesScreenContainer);
export { PaymentTypesScreen };
