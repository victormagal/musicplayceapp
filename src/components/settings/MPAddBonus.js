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

class MPAddBonusComponent extends React.Component {

  render() {

    return (
        <View style={styles.container}>
            <MPText style={styles.text}>Adicionar cupom de desconto</MPText>
            <MPTextField label={'Digite o código'} style={styles.textfield}/>
            <MPGradientButton title={'Adicionar'} textSize={16} style={styles.button}/>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
      display: 'flex',
      alignContent: 'flex-start',
      backgroundColor: '#FFF',
      height: 152,
      marginBottom: 50,
  },
  text:{
      marginHorizontal : 40,
      marginTop: 30,
      fontSize : 16,
      fontFamily: 'Montserrat-Medium',
      color : '#000',
      textAlign: 'center',
  },
  textfield: {
    marginHorizontal: 40,
  },
  button: {
      position: 'absolute',
      bottom: -20,
      alignSelf: 'center',
      marginHorizontal: 119,
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPAddBonus = connect(mapStateToProps)(MPAddBonusComponent);
export { MPAddBonus };
