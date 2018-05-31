import React from 'react';
import { Picker, ScrollView, StyleSheet, TouchableWithoutFeedback, Text, View } from 'react-native';
import { MPHeader, MPSelect, MPTextField, MPSwitch } from '../../components';

class FeedbackConfigurationScreen extends React.Component {

  render() {
    return (
      <View style={styles.parent}>
        <MPHeader style={styles.header} back={true} onBack={this.handleBackClick} title={"Alguma sugestão? Ajude-nos a melhorar a plataforma."} />
        <ScrollView style={styles.scroll}>
          <MPSelect />
          <MPTextField label={"Envie sua mensagem"} value={""} />
          <MPTextField />
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
  header: {
    flex: 1
  },
  scroll: {
    flex: 2
  }
});

export { FeedbackConfigurationScreen };
