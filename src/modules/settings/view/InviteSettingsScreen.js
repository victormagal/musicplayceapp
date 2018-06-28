import React from 'react';
import { 
  FlatList, 
  ScrollView, 
  StyleSheet, 
  View 
} from 'react-native';
import { 
  MPEditConfigIcon, 
  MPNotificationConfigIcon, 
  MPInviteConfigIcon, 
  MPHelpConfigIcon, 
  MPArrowRightIcon, 
  MPClipboardIcon 
} from '../../../assets/svg';
import { 
  MPHeader, 
  MPItemList, 
  MPFooter 
} from '../../../components';

class InviteSettingsScreen extends React.Component {

  list = {
    data: [
      {
        id: '00',
        rota: 'homeSettings',
        title: 'Enviar por e-mail',
        iconNext: MPArrowRightIcon
      },
      {
        id: '01',
        rota: 'homeSettings',
        title: 'Enviar por Facebook',
        iconNext: MPArrowRightIcon
      },
      {
        id: '02',
        rota: 'homeSettings',
        title: 'Enviar por SMS',
        iconNext: MPArrowRightIcon
      },
      {
        id: '03',
        rota: 'homeSettings',
        title: 'Copiar o link',
        iconNext: MPClipboardIcon
      }
    ]
  };

  handleBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.parent}>
        <MPHeader back={true} onBack={this.handleBack} title={"Convide seus amigos para o MusicPlayce"} />
        <ScrollView style={styles.scroll}>
          <FlatList
            style={styles.container}
            data={this.list.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <MPItemList item={item} {...this.props} />
              )
            }}
          />
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
  scroll: {
    flex: 2
  },
  container: {
    marginTop: 30,
    marginBottom: 10
  }
});

export { InviteSettingsScreen };
