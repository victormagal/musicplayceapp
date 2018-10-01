import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import { MPRegisterPayment } from './MPRegisterPayment';
import { MPCheckBox } from '../forms';
import {updateLocalCard} from '../../state/action'


class MPAddNewPaymentComponent extends React.Component {

  handleFavoriteCard = (checked) => {
    let {card} = this.props;
    if(!card){
      card = {};
    }

    card.favorite = checked;
    this.props.dispatch(updateLocalCard(card));
  };

  render() {
    return (
        <View style={styles.container}>
            <MPRegisterPayment />
            <MPCheckBox style={{paddingHorizontal: 40, marginTop: 30}} title={'Esta é minha forma de pagamento preferida.'}
                        onChange={this.handleFavoriteCard}/>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      backgroundColor: '#fff',
  },
});

const mapStateToProps = ({plansReducer}) => {
  return {...plansReducer};
};

const MPAddNewPayment = connect(mapStateToProps)(MPAddNewPaymentComponent);
export { MPAddNewPayment };
