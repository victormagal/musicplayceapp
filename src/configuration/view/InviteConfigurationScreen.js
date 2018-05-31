import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { MPHeader, MPItemList, MPFooter } from '../../components';

class InviteConfigurationScreen extends React.Component {

  list = {
    data: [
      {
        id: '00',
        rota: 'editConfiguration',
        name: 'Enviar por e-mail',
        width: '20',
        height: '20',
        viewBox: '0 0 32 32'
      },
      {
        id: '01',
        rota: 'editConfiguration',
        name: 'Enviar por Facebook',
        width: '18',
        height: '22',
        viewBox: '0 0 26 32'
      },
      {
        id: '02',
        rota: 'editConfiguration',
        name: 'Enviar por SMS',
        width: '23',
        height: '20',
        viewBox: '0 0 37 32'
      },
      {
        id: '03',
        rota: 'editConfiguration',
        name: 'Copiar o link',
        width: '9',
        height: '19',
        viewBox: '0 0 18 32'
      }
    ]
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.parent}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Convide seus amigos para o MusicPlayce"} />
        <ScrollView style={styles.scroll}>
          <FlatList
            data={this.list.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <MPItemList item={item} {...this.props} />
              )
            }}
          />
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

export { InviteConfigurationScreen };