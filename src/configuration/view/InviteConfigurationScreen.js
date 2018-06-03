import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { MPEditConfigIcon, MPNotificationConfigIcon, MPInviteConfigIcon, MPHelpConfigIcon, MPArrowRightIcon, MPClipboardIcon } from '../../assets/svg';
import { MPHeader, MPItemList, MPFooter } from '../../components';

class InviteConfigurationScreen extends React.Component {

  list = {
    data: [
      {
        id: '00',
        rota: 'editConfiguration',
        title: 'Enviar por e-mail',
        iconNext: MPArrowRightIcon
      },
      {
        id: '01',
        rota: 'editConfiguration',
        title: 'Enviar por Facebook',
        iconNext: MPArrowRightIcon
      },
      {
        id: '02',
        rota: 'editConfiguration',
        title: 'Enviar por SMS',
        iconNext: MPArrowRightIcon
      },
      {
        id: '03',
        rota: 'editConfiguration',
        title: 'Copiar o link',
        iconNext: MPClipboardIcon
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