import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {MPText} from '../general';


class MPContainerLoading extends Component{

  render(){
    return this.props.visible && (
      <View style={styles.containerLoading}>
        <View style={styles.contentLoading}>
          <ActivityIndicator size="large" color="#BB1A1A" />
          <MPText style={styles.textLoading}>{message || 'Aguarde...'}</MPText>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center'
  },
  contentLoading:{
    alignSelf: 'center'
  },
  textLoading: {
    fontFamily: 'ProbaPro-Regular',
    fontSize: 18,
    color: '#000',
  }
});

export {MPContainerLoading};
