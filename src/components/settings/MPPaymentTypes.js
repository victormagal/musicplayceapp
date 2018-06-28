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
    let {cards} = this.props;

    return (
      <View style={styles.container}>
        {
          cards.map(card => {
            if(card.isFavorite){
              return(
                <View>
                  <MPText style={styles.text}>Forma de pagamento principal</MPText>
                  <MPEditPayment card={card} />
                </View>
              )
            }
          })
        }
        {
          cards.length > 1 ? (
            <View>
              <MPText style={styles.text}>Forma de pagamento principal</MPText>
              {
                cards.map(card => {
                  if(!card.isFavorite){
                    return(
                      <MPEditPayment card={card} />
                    )
                  }
                })
              }
            </View>
          ) : null
        }
        <MPGradientButton title={'Adicionar cartão'} style={styles.button} textSize={16}/>
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
    fontFamily: 'montSerratMedium',
    color: '#000',
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPPaymentTypes = connect(mapStateToProps)(MPPaymentTypesComponent);
export { MPPaymentTypes };