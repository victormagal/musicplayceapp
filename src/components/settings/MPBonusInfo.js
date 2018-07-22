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
import { MPBonusIcon, MPBonusDisabledIcon } from '../../assets/svg'

class MPBonusInfoComponent extends React.Component {

  render() {
    let {bonus} = this.props;
    let backgroundStyle = bonus.valid ? {} : {backgroundColor : '#FCFCFC'};

    if(bonus.valid == true){
        return (
            <View style={styles.container}>
                <MPBonusIcon style={{marginHorizontal: 20}} />
                <View>
                    <MPText style={styles.title}>Cupom <MPText style={styles.titleEmph}>{bonus.name}</MPText></MPText>
                    <MPText style={styles.date}>Valido até {bonus.dueDate}</MPText>
                    <MPText>BONUS R${bonus.value}</MPText>
                </View>
            </View>
        );
    }else{
        return (
            <View style={[styles.container, backgroundStyle]}>
                <MPBonusDisabledIcon style={{marginHorizontal: 20}} />
                <View>
                    <MPText style={[styles.title, styles.textDisabled]}>Cupom <MPText style={[styles.titleEmph, styles.textDisabled]}>{bonus.name}</MPText></MPText>
                    <MPText style={[styles.date, styles.textDisabled]}>Valido até {bonus.dueDate}</MPText>
                    <MPText style={[styles.bonus, styles.textDisabled]}>R${bonus.value} utilizados</MPText>
                </View>
            </View>
        );
    }
  }

}

const styles = StyleSheet.create({
  container: {
      display: 'flex',
      alignContent: 'flex-start',
      flexDirection: 'row',
      backgroundColor: '#FFF',
      height: 109,
      marginHorizontal: 20,
      paddingVertical: 20,
      marginBottom: 20,
      borderRadius: 4,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.15,
      shadowRadius: 4,
  },
  title:{
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color : '#000',
    marginBottom: 5,
  },
  titleEmph: {
    fontFamily: 'Montserrat-Bold',
    color: '#5994db',
  },
  date:{
    fontSize: 14,
    fontFamily: 'ProbaPro-Regular',
    color: '#686868',
    marginBottom: 10,
  },
  bonus:{
    fontSize: 16, 
    fontFamily: 'Montserrat-Regular',
    color: '#000',
  },
  textDisabled: {
      color : '#777',
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPBonusInfo = connect(mapStateToProps)(MPBonusInfoComponent);
export { MPBonusInfo };
