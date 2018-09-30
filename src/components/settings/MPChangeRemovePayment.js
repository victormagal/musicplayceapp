import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Alert
} from 'react-native';
import {
  updateLocalCard, removeCard
} from '../../state/action';
import { MPRegisterPayment } from './MPRegisterPayment';
import { MPCheckBox } from '../forms';
import { MPGradientBorderButton } from '../profile';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class MPChangeRemovePaymentComponent extends React.Component {

  removePayment(){
    Alert.alert(
      'Excluir',
      'Deseja remover esse cartão?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            const { card } = this.props;
            this.props.dispatch(removeCard(card));
            this.props.navigation.pop();
          }
        },
      ]
    );
  }

  handleFavoriteCard = (checked) => {
    let {card} = this.props;
    card.favorite = checked;

    this.props.dispatch(updateLocalCard(card));
  };
  
  render() {
    let {card} = this.props;
    return (
        <KeyboardAwareScrollView style={styles.container}>
            <MPRegisterPayment card={card} />
            <MPCheckBox style={{paddingHorizontal: 40, marginTop: 30}} checked={card.favorite} title={'Esta é minha forma de pagamento preferida.'} onChange={this.handleFavoriteCard}/>
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

const mapStateToProps = () => {
  return {};
};

const MPChangeRemovePayment = connect(mapStateToProps)(MPChangeRemovePaymentComponent);
export { MPChangeRemovePayment };
