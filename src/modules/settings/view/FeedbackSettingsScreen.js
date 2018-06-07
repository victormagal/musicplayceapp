import React from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  View 
} from 'react-native';
import { 
  MPHeader, 
  MPSelect, 
  MPTextField, 
  MPFooter 
} from '../../../components';

class FeedbackSettingsScreen extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.parent}>
        <MPHeader back={true} onBack={this.handleBack} title={"Alguma sugestão? Ajude-nos a melhorar a plataforma"} />
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <MPSelect label={"Manolo"} />
            <MPTextField label={"Envie sua mensagem"} value={""} />
          </View>
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
  },
  container: {
    marginVertical: 30
  }
});

export { FeedbackSettingsScreen };
