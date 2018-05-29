import React from 'react';
import { Picker, ScrollView, StyleSheet, TouchableWithoutFeedback, Text, View } from 'react-native';
import { DarkHeader } from '../../components/configuration/DarkHeader';
import { InputText } from '../../components/configuration/InputText';
import { SelectArea } from '../../components/configuration/SelectArea';

class FeedbackConfigurationScreen extends React.Component {

  state = { 
    user: ''
  }

  render() {
    return (
      <View style={styles.parent}>
        <DarkHeader style={styles.header} back={true} onBack={this.handleBackClick} title={"Alguma sugestão? Ajude-nos a melhorar a plataforma."} />
        <ScrollView style={styles.scroll}>
          <SelectArea />
          <Text>{this.state.user}</Text>
          <InputText label={"Senha atual"} value={"Senha atual"} />
          <InputText label={"Nova senha"} value={"Nova senha"} />
          <InputText label={"Confirme a nova senha"} value={"Confirme a nova senha"} />
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
  },
  inputText: {
    borderBottomWidth: 1,
    borderBottomColor: '#5994DB',
    fontSize: 16,
    color: '#000000',
    fontFamily: 'montSerrat'
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    marginHorizontal: 40,
    marginVertical: 30
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

export { FeedbackConfigurationScreen };