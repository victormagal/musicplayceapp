import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  MPText,
  MPTextField,
  MPGradientButton
} from '../../components';

class MPConfirmRemovePaymentComponent extends React.Component {

  render() {

    return (
        <View style={styles.container}>
            <MPText style={styles.title}>Tem certeza que deseja remover o cartão:</MPText>
            <MPTextField style={{marginHorizontal:40}} label={'Cartão de crédito'} value={'1111 2222 3333 6578'} />
            <View style={{flex: 1,flexDirection: 'row', marginHorizontal: 40, marginTop: 30}}>
                <MPGradientButton style={{flex: 1, marginEnd :20}} title={'Manter'} textSize={16}/>
                <MPGradientButton style={{flex: 1}} title={'Excluir'} textSize={16}/>
            </View>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  title: {
      marginStart: 40,
      marginEnd: 92,
      marginTop: 30,
      flexWrap: 'wrap',
      color: '#686868',
      fontSize: 16,
      fontFamily: 'probaProRegular',
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPConfirmRemovePayment = connect(mapStateToProps)(MPConfirmRemovePaymentComponent);
export { MPConfirmRemovePayment };