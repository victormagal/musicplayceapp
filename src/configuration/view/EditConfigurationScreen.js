import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { DarkHeader } from '../../components/configuration/DarkHeader';
import { TitleSectionForm } from '../../components/configuration/TitleSectionForm';
import { InputText } from '../../components/configuration/InputText';

class EditConfigurationScreen extends React.Component {

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.parent}>
        <DarkHeader style={styles.header} back={true} onBack={this.handleBackClick} title={"Mantenha seus dados cadastrais atualizados."} />
        <ScrollView style={styles.scroll}>
          <TitleSectionForm title={"Identificação"} textButton={"ALTERAR"} />
          <InputText label={"Usuário"} value={"@brunocaliman_oficial"} />
          <InputText label={"Nome"} value={"Bruno"} />
          <InputText label={"Sobrenome"} value={"Caliman"} />
          <View style={styles.separator} />
          <TitleSectionForm title={"Endereço de e-mail"} textButton={"ALTERAR"} />
          <InputText label={"E-mail"} value={"bruno@gmail.com"} />
          <View style={styles.separator} />
          <TitleSectionForm title={"Telefone celular"} textButton={"ALTERAR"} />
          <InputText label={"Nº de telefone"} value={"(61) 99999-9999"} />
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

export { EditConfigurationScreen };