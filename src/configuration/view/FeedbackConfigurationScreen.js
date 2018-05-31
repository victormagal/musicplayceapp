import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MPHeader, MPSelect, MPTextField, MPFooter } from '../../components';

class FeedbackConfigurationScreen extends React.Component {

  render() {
    return (
      <View style={styles.parent}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Alguma sugestão? Ajude-nos a melhorar a plataforma"} />
        <ScrollView style={styles.scroll}>
          <MPSelect />
          <MPTextField label={"Envie sua mensagem"} value={""} multiline={true} />
        </ScrollView>
        <MPFooter />
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
  }
});

export { FeedbackConfigurationScreen };
