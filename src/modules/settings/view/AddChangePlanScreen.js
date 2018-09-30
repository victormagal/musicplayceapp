import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View,
  Alert
} from 'react-native';
import {
  MPIconButton,
  MPHeader, 
  MPAddChangePlan,
  MPAddPayment,
  MPText
} from '../../../components';
import { connect } from 'react-redux';


class AddChangePlanScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      plans: [],
    }
  }

  handleBack = () => {
    this.props.navigation.pop();
  };

  addPlan(){
    Alert.alert(
      'Alterar plano',
      'Deseja alterar o plano?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Alterar',
          onPress: () => {
            const { card } = this.props;
            //TODO: subscription, call API HERE
            this.props.navigation.pop();
          }
        },
      ]
    );
   // this.props.navigation.navigate('message', { component: MPAddPayment, title: 'Cadastre seu cartão, é 100% seguro' });
  }

  render() {
    return (
      <View style={styles.parent}>
        <MPHeader back={true} onBack={this.handleBack} title={"Assine o plano para ter mais vantagens"} />
        <ScrollView style={styles.scroll}>
          <MPAddChangePlan navigation={this.props.navigation} onPress={this.addPlan.bind(this)} />
        </ScrollView>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'flex-end'
  },
  scroll: {
    flex: 2
  },
});

const mapStateToProps = ({ plansReducer }) => {
  return {...plansReducer};
};

const AddChangePlanScreen = connect(mapStateToProps)(AddChangePlanScreenContainer);
export { AddChangePlanScreen };
