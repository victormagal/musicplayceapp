import React from 'react';
import { 
  StyleSheet, 
  View 
} from 'react-native';
import {
  MPHeader
 } from '../../../components';

class MessageScreen extends React.Component {

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  render() {
    let {component, title, ...rest} =  this.props.navigation.state.params;
    let Content = component || View;

    return (
      <View style={styles.parent}>
        <MPHeader title={title} back={rest.back} onBack={this.handleBackClick}/>
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
