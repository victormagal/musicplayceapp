import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  MPText,
} from '../../components';

class MPCreditBonusComponent extends React.Component {

  render() {
    let {creditBonus} = this.props;

    return (
        <View style={styles.container}>
            <View style={ styles.creditBanner }>
                <MPText style={ styles.bannerText}>Você tem <MPText style={styles.bannerTextEmph}>R${creditBonus} reais</MPText> de crédito</MPText>
            </View>
            <MPText style={styles.creditText}>Cupons de desconto valem créditos para você usar no MusicPlayce.</MPText>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
      display: 'flex',
      backgroundColor: '#FCFCFC',
      height: 160,
  },
  creditBanner: {
      backgroundColor: '#FFF',
      height: 50,
      marginHorizontal: 20,
      marginTop: 30,
      alignItems: 'center',
      borderRadius: 4,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.15,
      shadowRadius: 4,
  },
  bannerText: {
      fontSize: 16,
      fontFamily: 'montSerratMedium',
      color : '#000',
      textAlign: 'center',
      paddingVertical: 15,
  },
  bannerTextEmph: {
      color: '#e13223',
  },
  creditText: {
    fontFamily: 'probaProRegular',
    fontSize: 16,
    color : '#686868',
    textAlign: 'center',
    marginHorizontal: 40,
    marginTop: 20,
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPCreditBonus = connect(mapStateToProps)(MPCreditBonusComponent);
export { MPCreditBonus };