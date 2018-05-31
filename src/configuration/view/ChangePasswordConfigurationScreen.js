import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MPHeader, MPTextField, MPFooter } from '../../components';

class ChangePasswordConfigurationScreen extends React.Component {

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.parent}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Troque sua senha de acesso"} />
        <ScrollView style={styles.scroll}>
          <MPTextField label={"Senha atual"} value={"Senha atual"} />
          <MPTextField label={"Nova senha"} value={"Nova senha"} />
          <MPTextField label={"Confirme a nova senha"} value={"Confirme a nova senha"} />
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

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

export { ChangePasswordConfigurationScreen };