import React from 'react';
import { 
  StyleSheet, 
  View 
} from 'react-native';
import {
  MPHeader
 } from '../../../components';

class MessageScreen extends React.Component {

  render() {
    let {component, title, ...rest} =  this.props.navigation.state.params;
    let Content = component || View;

    return (
      <View style={styles.parent}>
        <MPHeader title={title}/>
        <Content {...this.props} {...rest} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC',
  }
});

export { MessageScreen };
