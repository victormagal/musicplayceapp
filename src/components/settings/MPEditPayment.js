import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  MPTextField,
  MPGradientBorderButton
} from '../../components';

class MPEditPaymentComponent extends React.Component {

  render() {
    let {card, editPayment} = this.props;

    return (
        <View style={styles.container}>
            <MPTextField label={'Cartão de crédito'} value={card.number} style={{flex: 4}}/>
            <MPGradientBorderButton style={{flex: 1, alignSelf: 'center', marginTop: 30, marginStart: 16}} onPress={editPayment}/>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'flex-start',
  },
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPEditPayment = connect(mapStateToProps)(MPEditPaymentComponent);
export { MPEditPayment };