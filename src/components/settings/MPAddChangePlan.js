import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import {
  MPText,
  MPTextField,
  MPGradientButton
} from '../../components';
import {LinearGradient} from 'expo';

class MPAddChangePlanComponent extends React.Component {
  state = {
      monthly: false,
  }

  toggleMonth(){
    this.setState({monthly: !this.state.monthly});
  }
  render() {
      let {onPress} = this.props;
    let monthValue = '50,00';
    let yearValue = '550,00';

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#BB1A1A', '#2E2C9D']}
                style={styles.outButton}
                selected={true}>
                {
                    this.state.monthly == true ? (
                        <View style={styles.inButton}>
                            <LinearGradient colors={['#BB1A1A', '#2E2C9D']} style={{flex: 1}} selected={true}>
                                <MPText style={styles.selectedButton}>Mensal</MPText>
                            </LinearGradient>
                            <TouchableWithoutFeedback  onPress={this.toggleMonth.bind(this)}>
                                <View style={{flex: 1}}>
                                    <MPText style={styles.notSelectedButton}>Anual</MPText>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    ) : (
                        <View style={styles.inButton}>
                            <TouchableWithoutFeedback  onPress={this.toggleMonth.bind(this)}>
                                <View style={{flex: 1}}>
                                    <MPText style={styles.notSelectedButton}>Mensal</MPText>
                                </View>
                            </TouchableWithoutFeedback>
                            <LinearGradient colors={['#BB1A1A', '#2E2C9D']} style={{flex: 1}} selected={true}>
                                <MPText style={styles.selectedButton}>Anual</MPText>
                            </LinearGradient>
                        </View>
                    )
                }
            </LinearGradient>
            <View style={{backgroundColor: '#FFF', marginHorizontal: 80, marginBottom: 2, paddingVertical: 20, borderRadius: 4}}>
            {
                this.state.monthly == true ? (
                    <View>
                        <MPText style={styles.topTitle}>Plano Básico 1</MPText>
                        <MPText style={styles.topSubTitle}>In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam.</MPText>
                    </View>
                ) : (
                    <View>
                        <MPText style={styles.topTitle}>Plano Básico 2</MPText>
                        <MPText style={styles.topSubTitle}>In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam.</MPText>
                    </View>
                )
            }
            </View>
            <View style={{backgroundColor: '#FFF', marginHorizontal: 80, marginBottom: 30}}>
            {
                this.state.monthly == true ? (
                    <View>
                        <MPText style={styles.bottomTitle}>R$<MPText style={styles.bottomTitleEmph}>{monthValue}</MPText></MPText>
                        <MPText style={styles.bottomSubTitle}>por ano</MPText>
                    </View>
                ) : (
                    <View>
                        <MPText style={styles.bottomTitle}>R$<MPText style={styles.bottomTitleEmph}>{yearValue}</MPText></MPText>
                        <MPText style={styles.bottomSubTitle}>por ano</MPText>
                    </View>
                )
            }
            </View>
            <MPGradientButton style={{marginHorizontal: 80}} title={'Fazer upgrade'} textSize={16} onPress={onPress} />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FCFCFC',
      paddingTop: 30,
  },
  outButton: {
    padding: 1,
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 80,
    marginBottom: 30,
    height: 40,
  },
  inButton: {
      flex: 1,
      borderRadius: 4,
      overflow: 'hidden',
      flexDirection: 'row',
  },
  notSelectedButton: {
    backgroundColor: '#FFF',
    textAlign: 'center',
    padding: 10,
    color : '#e13223',
    fontFamily: 'montSerrat',
    fontSize: 14
  },
  selectedButton: {
    flex: 1,
    textAlign: 'center',
    color : '#FFF',
    fontFamily: 'montSerratBold',
    fontSize: 14,
    padding: 10,
  },
  topTitle: {
      marginHorizontal: 44, 
      marginBottom: 10,
      fontFamily: 'montSerratMedium',
      fontSize: 16,
      color: '#000',
  },
  topSubTitle: {
      marginHorizontal: 20,
      fontFamily: 'probaProRegular',
      fontSize: 14,
      color : '#686868',
      textAlign: 'center',
  },
  bottomTitle: {
    fontSize: 16,
    marginHorizontal: 36,
    fontFamily: 'montSerratMedium',
    color: '#686868',
  },
  bottomTitleEmph: {
    fontSize: 36,
    fontFamily: 'montSerratMedium',
    color: '#5994db',
  },
  bottomSubTitle: {
    marginHorizontal: 69,
    fontSize: 16,
    color: '#686868',
    fontFamily: 'montSerrat',
    marginBottom: 20,
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPAddChangePlan = connect(mapStateToProps)(MPAddChangePlanComponent);
export { MPAddChangePlan };