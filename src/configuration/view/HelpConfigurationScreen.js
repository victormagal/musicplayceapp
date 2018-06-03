import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { MPHeader, MPItemList, MPTextField, MPToggleList, MPFooter } from '../../components';
import { MPArrowRightIcon } from '../../assets/svg/index';
import { connect } from 'react-redux';

class HelpConfigurationScreenComponent extends React.Component {

  list = {
    data: [
      {
        id: '00',
        rota: 'inviteConfiguration',
        title: 'Não encontrei minha dúvida',
        iconNext: MPArrowRightIcon
      }
    ]
  };

  render() {

    return (
      <View style={styles.parent}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Pesquise sua dúvida ou consulte na lista abaixo"} />
        <ScrollView style={styles.scroll}>
          <MPTextField label={"Pesquisar"} />
          {
            this.props.fontLoaded ? (
              <View style={styles.borda}>
                <MPToggleList title="Como faço para me cadastrar?">
                  <Text style={styles.text}>O sistema é bem simples e intuitivo.</Text>
                  <TouchableHighlight onPress={() => {return false;}} underlayColor="transparent">
                    <Text style={styles.link}>Clique para fazer o preenchimento do cadastro desde o começo</Text>
                  </TouchableHighlight>
                </MPToggleList>
                <MPToggleList title="Como encontrar outros usuários?">
                  <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nullam.</Text>
                </MPToggleList>
                <MPToggleList title="Existe algum custo de intermediação?">
                  <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor eleifend consectetur. Duis eu dui mauris. Maecenas elementum nullam.</Text>
                </MPToggleList>
                <MPToggleList title="Posso subir quantos trabalhos?">
                  <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor eleifend consectetur. Duis eu dui mauris. Maecenas elementum nullam.</Text>
                </MPToggleList>
                <MPToggleList title="Posso interagir com qualquer usuário?">
                  <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor eleifend consectetur. Duis eu dui mauris. Maecenas elementum nullam.</Text>
                </MPToggleList>
                <MPToggleList title="Como faço para me cadastrar?">
                  <Text style={styles.text}>O sistema é bem simples e intuitivo.</Text>
                  <TouchableHighlight onPress={() => { return false; }} underlayColor="transparent">
                    <Text style={styles.link}>Clique para fazer o preenchimento do cadastro desde o começo</Text>
                  </TouchableHighlight>
                </MPToggleList>
                <MPToggleList title="Como encontrar outros usuários?">
                  <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nullam.</Text>
                </MPToggleList>
                <MPToggleList title="Existe algum custo de intermediação?">
                  <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor eleifend consectetur. Duis eu dui mauris. Maecenas elementum nullam.</Text>
                </MPToggleList>
                <MPToggleList title="Posso subir quantos trabalhos?">
                  <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor eleifend consectetur. Duis eu dui mauris. Maecenas elementum nullam.</Text>
                </MPToggleList>
                <MPToggleList title="Posso interagir com qualquer usuário?">
                  <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor eleifend consectetur. Duis eu dui mauris. Maecenas elementum nullam.</Text>
                </MPToggleList>
                <FlatList
                  style={styles.lista}
                  data={this.list.data}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => {
                    return (
                      <MPItemList item={item} {...this.props} />
                    )
                  }}
                />
              </View>
            ) : null
          }
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
  borda: {
    borderTopWidth: 1,
    borderTopColor: '#DFDFDF',
    marginTop: 30
  },
  scroll: {
    flex: 2
  },
  lista: {
    marginTop: 30,
    marginBottom: 15
  },
  text: {
    fontSize: 16,
    fontFamily: 'montSerrat',
    color: '#686868'
  },
  link: {
    fontSize: 16,
    fontFamily: 'montSerrat',
    color: '#5994DB',
    textDecorationLine: 'underline'
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const HelpConfigurationScreen = connect(mapStateToProps)(HelpConfigurationScreenComponent);
export { HelpConfigurationScreen };