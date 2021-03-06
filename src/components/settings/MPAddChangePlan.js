import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback, Share, FlatList
} from 'react-native';
import {Card} from 'react-native-elements';
import {
  MPText,
  MPGradientButton,
  MPAddNewPayment,
  MPIconButton
} from '../../components';
import {updateLocalPlan, addCard, getPlans} from '../../state/action';
import LinearGradient from 'react-native-linear-gradient';


class MPAddChangePlanComponent extends React.Component {
  state = {
    monthly: true
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.plans) {
      this.props.dispatch(updateLocalPlan(this.state.monthly ? nextProps.plans[0] : nextProps.plans[1]));
    }
  }

  componentDidMount(){
    this.props.dispatch(getPlans());
  }

  toggleMonth() {
    const monthly = !this.state.monthly;
    this.setState({monthly});
    this.props.dispatch(updateLocalPlan(monthly ? this.props.plans[0] : this.props.plans[1]));
  }

  headerLeft = () => {
    return [<MPIconButton onPress={this.handleBack} key={1} title={'Cancelar'}/>];
  };

  headerRight = () => {
    return [<MPIconButton onPress={this.handleAddChangeCard} key={2} title={'Salvar'}/>];
  };

  handleAddChangeCard = () => {
    this.props.dispatch(addCard(this.props.card));
    this.handleBack();
  };

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleCardsDetail = () => {
    if (this.props.cards.length > 0) {
      this.props.navigation.navigate('paymentTypesSettings');
      return;
    }

    this.props.navigation.navigate('message', {
      component: MPAddNewPayment,
      title: 'Cadastre seu cartão, é 100% seguro',
      headerLeft: this.headerLeft(),
      headerRight: this.headerRight()
    });
  };

  renderPlanCard(plan) {
    return (
      <View>
        <View>
          <MPText style={styles.topTitle}>{plan ? plan.attributes.title : null}</MPText>
          <MPText style={styles.topSubTitle}>{plan ? plan.attributes.description : null}</MPText>
        </View>
        <View style={styles.priceContainer}>
          <MPText style={styles.bottomTitle}>R$ <MPText
            style={styles.bottomTitleEmph}>{plan && plan.price}</MPText></MPText>
          <MPText
            style={styles.bottomSubTitle}>{plan ? plan.attributes.description_value : null}</MPText>
        </View>
      </View>
    );
  }

  render() {
    let {onPress, plans} = this.props;
    let freePlan = plans[0];
    let premiumPlan = plans[1];
    let freePriceFormatted = '';
    let premiumPriceFormatted = '';

    if (freePlan) {
      freePriceFormatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(freePlan.attributes.value).replace('R$', '');
      freePlan.price = freePriceFormatted;
    }

    if (premiumPlan) {
      premiumPriceFormatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(premiumPlan.attributes.value).replace('R$', '');
      premiumPlan.price = premiumPriceFormatted;
    }

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#BB1A1A', '#2E2C9D']}
          style={styles.outButton}
          selected={true}>
          {
            this.state.monthly == true ? (
                <View style={styles.inButton}>
                  <LinearGradient colors={['#BB1A1A', '#2E2C9D']} style={{flex: 1}} start={{x: 0, y: 0}}
                                  end={{x: 1, y:0}} selected={true}>
                    <MPText style={styles.selectedButton}>{freePlan && freePlan.attributes.title}</MPText>
                  </LinearGradient>
                  <TouchableWithoutFeedback onPress={this.toggleMonth.bind(this)}>
                    <View style={{flex: 1}}>
                      <MPText style={styles.notSelectedButton}>{premiumPlan && premiumPlan.attributes.title}</MPText>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              ) : (
                <View style={styles.inButton}>
                  <TouchableWithoutFeedback onPress={this.toggleMonth.bind(this)}>
                    <View style={{flex: 1}}>
                      <MPText style={styles.notSelectedButton}>{freePlan ? freePlan.attributes.title : null}</MPText>
                    </View>
                  </TouchableWithoutFeedback>
                  <LinearGradient colors={['#BB1A1A', '#2E2C9D']} style={{flex: 1}} start={{x: 0, y: 0}}
                                  end={{x: 1, y:0}} selected={true}>
                    <MPText style={styles.selectedButton}>{premiumPlan ? premiumPlan.attributes.title : null}</MPText>
                  </LinearGradient>
                </View>
              )
          }
        </LinearGradient>
        <Card containerStyle={styles.cardContainerStyle}>
          {this.renderPlanCard(this.state.monthly ? freePlan : premiumPlan)}
        </Card>

        {this.props.cards.length > 0 && !this.state.monthly &&  (
          <MPGradientButton style={styles.upgradeButton} title={'Fazer upgrade'} textSize={16} onPress={onPress}/>
        )}

        <MPGradientButton style={styles.upgradeButton} title="Cartões" textSize={16} onPress={this.handleCardsDetail}/>
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
    color: '#e13223',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14
  },
  selectedButton: {
    flex: 1,
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    padding: 10,
  },
  topTitle: {
    paddingTop: 20,
    marginBottom: 10,
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: '#000',
    textAlign: 'center'
  },
  topSubTitle: {
    marginHorizontal: 20,
    fontFamily: 'ProbaPro-Regular',
    fontSize: 14,
    color: '#686868',
    textAlign: 'center',
  },
  bottomTitle: {
    fontSize: 16,
    marginHorizontal: 36,
    fontFamily: 'Montserrat-Medium',
    color: '#686868',
    textAlign: 'center',
  },
  bottomTitleEmph: {
    fontSize: 36,
    fontFamily: 'Montserrat-Medium',
    color: '#5994db',
    textAlign: 'center',
  },
  bottomSubTitle: {
    marginHorizontal: 69,
    fontSize: 16,
    color: '#686868',
    fontFamily: 'Montserrat-Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  containerList: {
    flex: 2,
    marginTop: 30,
    marginBottom: 10
  },
  priceContainer: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopColor: '#efefef',
    borderTopWidth: 2
  },
  upgradeButton: {
    marginHorizontal: 80,
    marginTop: 20
  },
  cardContainerStyle: {
    padding: 0,
    margin: 0,
    marginHorizontal: 80
  }
});

const mapStateToProps = ({plansReducer}) => {
  return {...plansReducer};
};

const MPAddChangePlan = connect(mapStateToProps)(MPAddChangePlanComponent);
export {MPAddChangePlan};
