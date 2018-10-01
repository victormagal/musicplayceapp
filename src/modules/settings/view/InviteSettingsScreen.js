import React from 'react';
import { 
  FlatList, 
  ScrollView, 
  StyleSheet, 
  View,
  Clipboard,
  Share
} from 'react-native';
import { MPArrowRightIcon, MPClipboardIcon } from '../../../assets/svg';
import { MPHeader, MPItemList } from '../../../components';

class InviteSettingsScreen extends React.Component {
  list = {
    data: [
      /*{
        id: '00',
        onChooseOption: 'homeSettings',
        title: 'Enviar por e-mail',
        iconNext: MPArrowRightIcon
      },
      {
        id: '01',
        onChooseOption: 'homeSettings',
        title: 'Enviar por Facebook',
        iconNext: MPArrowRightIcon
      },
      {
        id: '02',
        onChooseOption: 'homeSettings',
        title: 'Enviar por SMS',
        iconNext: MPArrowRightIcon
      },*/
      {
        id: '02',
        onChooseOption: () => Share.share({
          title: 'Musicplayce',
          message: 'Gostaria de te convidar a participar do Musicplayce...',
          dialogTitle: 'Convidar amigos',
        }),
        title: 'Escolher modo de convite',
        iconNext: MPArrowRightIcon
      },
      {
        id: '04',
        onChooseOption: () => {
          Clipboard.setString('musicplayce link');
        },
        title: 'Copiar o link',
        iconNext: MPClipboardIcon
      }
    ]
  };

  handleBack = () => {
    const { navigation } = this.props;
    if (navigation.state.params && navigation.state.params.profile) {
      navigation.dangerouslyGetParent().goBack();
    } else {
      navigation.pop();
    }
  };

  render() {
    return (
      <View style={styles.parent}>
        <MPHeader
          back={true}
          onBack={this.handleBack}
          title={"Convide seus amigos para o MusicPlayce"}
        />
        <ScrollView style={styles.scroll}>
          <FlatList
            style={styles.container}
            data={this.list.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <MPItemList
                  item={item}
                  {...this.props}
                />
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
