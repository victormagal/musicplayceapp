import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View 
} from 'react-native';
import { 
  MPHeader, 
  MPFooter,
  MPText
} from '../../../components';
import { connect } from 'react-redux';
import { MPRegisterPayment } from '../../../components/settings/MPRegisterPayment';

class PaymentTypesScreenContainer extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.parent}>
        <MPHeader back={true} onBack={this.handleBack} title={"Mantenha sua carteira atualizada"} />
        <ScrollView style={styles.scroll}>
          <MPRegisterPayment />
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

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const PaymentTypesScreen = connect(mapStateToProps)(PaymentTypesScreenContainer);
export { PaymentTypesScreen };