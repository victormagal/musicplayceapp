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
import LinearGradient from 'react-native-linear-gradient';

class MPAddChangePlanComponent extends React.Component {
  state = {
      monthly: false,
  }

  toggleMonth(){
    this.setState({monthly: !this.state.monthly});
  }
  render() {
    let {onPress, plans} = this.props;
    let monthlyPlan = plans[1];
    let yearlyPlan = plans[0];

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
            {
                this.state.monthly == true ? (
                    <View>
                        <View style={{backgroundColor: '#FFF', marginHorizontal: 80, marginBottom: 2, paddingVertical: 20, borderRadius: 4}}>
                            <View>
                                <MPText style={styles.topTitle}>{monthlyPlan? monthlyPlan.attributes.title : null}</MPText>
                                <MPText style={styles.topSubTitle}>{monthlyPlan ? monthlyPlan.attributes.description : null}</MPText>
                            </View>
                        </View>
                        <View style={{backgroundColor: '#FFF', marginHorizontal: 80, marginBottom: 30}}>
                            <View>
                                <MPText style={styles.bottomTitle}>R$ <MPText style={styles.bottomTitleEmph}>{monthlyPlan ? monthlyPlan.attributes.value : null}</MPText></MPText>
                                <MPText style={styles.bottomSubTitle}>por mes</MPText>
                            </View>
                        </View>
                    </View>
                ) : (
                    <View>
                        <View style={{backgroundColor: '#FFF', marginHorizontal: 80, marginBottom: 2, paddingVertical: 20, borderRadius: 4}}>
                            <View>
                                <MPText style={styles.topTitle}>{yearlyPlan ? yearlyPlan.attributes.title: null}</MPText>
                                <MPText style={styles.topSubTitle}>{yearlyPlan ? yearlyPlan.attributes.description : null}</MPText>
                            </View>
                        </View>
                        <View style={{backgroundColor: '#FFF', marginHorizontal: 80, marginBottom: 30}}>
                            <View>
                                <MPText style={styles.bottomTitle}>R$ <MPText style={styles.bottomTitleEmph}>{yearlyPlan ? yearlyPlan.attributes.value : null}</MPText></MPText>
                                <MPText style={styles.bottomSubTitle}>por ano</MPText>
                            </View>
                        </View>
                    </View>
                )
            }
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
    fontFamily: 'Montserrat-Regular',
    fontSize: 14
  },
  selectedButton: {
    flex: 1,
    textAlign: 'center',
    color : '#FFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    padding: 10,
  },
  topTitle: {
      marginHorizontal: 44, 
      marginBottom: 10,
      fontFamily: 'Montserrat-Medium',
      fontSize: 16,
      color: '#000',
  },
  topSubTitle: {
      marginHorizontal: 20,
      fontFamily: 'ProbaPro-Regular',
      fontSize: 14,
      color : '#686868',
      textAlign: 'center',
  },
  bottomTitle: {
    fontSize: 16,
    marginHorizontal: 36,
    fontFamily: 'Montserrat-Medium',
    color: '#686868',
  },
  bottomTitleEmph: {
    fontSize: 36,
    fontFamily: 'Montserrat-Medium',
    color: '#5994db',
  },
  bottomSubTitle: {
    marginHorizontal: 69,
    fontSize: 16,
    color: '#686868',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 20,
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPAddChangePlan = connect(mapStateToProps)(MPAddChangePlanComponent);
export { MPAddChangePlan };
