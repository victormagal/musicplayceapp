import React from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  View,
  StyleSheet
} from 'react-native';
import {
  MPBonusInfo
} from '../../components';
import { MPGradientBorderButton } from '../profile';

class MPShowBonusesComponent extends React.Component {
  state = {
      maxRender: 3,
  }

  loadMore(){
      this.setState({maxRender: 2*this.state.maxRender});
  }

  render() {
    let {bonus} = this.props;

    return (
        <View>
            {
                bonus.map((item, index) => {
                    if(index < this.state.maxRender) {
                        return(
                            <MPBonusInfo bonus={item}/>
                        )
                    }
                })
            }
            <MPGradientBorderButton style={styles.button} title={'Carregar mais'} onPress={this.loadMore.bind(this)} />
        </View>
    )
  }

}

const styles = StyleSheet.create({
  button:{
      display: 'flex',
      alignSelf: 'center',
      marginHorizontal: 130,
      marginVertical: 20,
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPShowBonuses = connect(mapStateToProps)(MPShowBonusesComponent);
export { MPShowBonuses };