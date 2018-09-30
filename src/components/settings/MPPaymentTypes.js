import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  MPTextField,
  MPText,
  MPEditPayment,
  MPGradientButton,
} from '../../components';

class MPPaymentTypesComponent extends React.Component {

  render() {
    let {cards, onAddPayment, onEditPayment} = this.props;

    const favoriteCard = cards.filter(c => c.favorite);
    const otherCards = cards.filter(c => !c.favorite);

    return (
      <View style={styles.container}>
        {favoriteCard.map((card, index) => {
          return (
            <View key={index}>
              <MPText style={styles.text}>Forma de pagamento principal</MPText>
              <MPEditPayment card={card} editPayment={onEditPayment.bind(this, card)}/>
            </View>
          )
        })}
        {otherCards.length > 0 && (
          <View>
            <MPText style={styles.text}>Outras formas de pagamento</MPText>
            {
              cards.map((card, index) => {
                if (!card.favorite) {
                  return (
                    <MPEditPayment key={index} card={card} editPayment={onEditPayment.bind(this,card)}/>
                  )
                }
              })
            }
          </View>
        )}
        <MPGradientButton title={'Adicionar cartão'} style={styles.button} textSize={16} onPress={onAddPayment}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingBottom: 30,
    backgroundColor: '#fff',
    flex: 1
  },
  button: {
    marginTop: 30,
    marginHorizontal: 50,
  },
  text: {
    marginTop: 30,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  }
});

const mapStateToProps = ({plansReducer}) => {
  return {...plansReducer};
};

const MPPaymentTypes = connect(mapStateToProps)(MPPaymentTypesComponent);
export {MPPaymentTypes};
