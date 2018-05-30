import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { MPHeader } from '../../components';
import { MPTextField } from '../../components';

class ChangePasswordConfigurationScreen extends React.Component {

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.parent}>
        <MPHeader style={styles.header} back={true} onBack={this.handleBackClick} title={"Troque sua senha de acesso"} />
        <ScrollView style={styles.scroll}>
          <MPTextField label={"Senha atual"} value={""} />
          <MPTextField label={"Nova senha"} value={"Nova senha"} />
          <MPTextField label={"Confirme a nova senha"} value={"Confirme a nova senha"} />
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

export { ChangePasswordConfigurationScreen };