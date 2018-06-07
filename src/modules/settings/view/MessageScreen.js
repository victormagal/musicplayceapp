import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  View 
} from 'react-native';
import { MPHeader } from '../../../components';

class MessageScreen extends React.Component {

  render() {
    let Content = this.props.navigation.state.params.component || View;
    return (
      <View style={styles.parent}>
        <MPHeader />
        <Content {...this.props} />
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

export {MessageScreen};
