import React from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { DarkHeader } from '../../components/configuration/DarkHeader';
import { ItemList } from '../../components/configuration/ItemList';
import { NavFooter } from '../../components/configuration/NavFooter';

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

  render() {
    return (
      <View style={styles.parent}>
        <DarkHeader style={styles.header} title={"Convide seus amigos para o MusicPlayce"} />
        <ScrollView style={styles.scroll}>
          <FlatList
            data={this.list.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <ItemList item={item} {...this.props} />
              )
            }}
          />
        </ScrollView>
        <NavFooter style={styles.footer} />
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
  footer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end'
  }
});

export { InviteConfigurationScreen };