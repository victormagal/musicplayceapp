import React from 'react';
import { connect } from 'react-redux';
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

    return (
      <View style={styles.container}>
        {
          cards.map(card => {
            if(card.isFavorite){
              return(
                <View>
                  <MPText style={styles.text}>Forma de pagamento principal</MPText>
                  <MPEditPayment card={card} editPayment={onEditPayment.bind(this, card)} />
                </View>
              )
            }
          })
        }
        {
          cards.length > 1 ? (
            <View>
              <MPText style={styles.text}>Outras formas de pagamento</MPText>
              {
                cards.map(card => {
                  if(!card.isFavorite){
                    return(
                      <MPEditPayment card={card} editPayment={onEditPayment.bind(this,card)} />
                    )
                  }
                })
              }
            </View>
          ) : null
        }
        <MPGradientButton title={'Adicionar cartão'} style={styles.button} textSize={16} onPress={onAddPayment}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
      paddingHorizontal: 40,
      paddingBottom: 30,
      backgroundColor: '#fff'
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

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPPaymentTypes = connect(mapStateToProps)(MPPaymentTypesComponent);
export { MPPaymentTypes };
