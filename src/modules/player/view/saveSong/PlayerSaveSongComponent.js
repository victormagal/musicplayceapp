import React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image,
  TouchableWithoutFeedback, Modal
} from 'react-native';
import {
  MPHeader, MPIconButton, MPFolder, MPTextField, MPGradientButton, MPInput
} from '../../../../components';
import {withFixedBottom} from '../../../../connectors/withFixedBottom';

const InputFolder = withFixedBottom(MPInput);

class PlayerSaveSongComponent extends React.Component {

  handleSelectFolder = (index) => {
    this.props.onSelectFolder(index);
  };

  renderHeaderMenu() {
    return [
      <MPIconButton key={1} title="Salvar" titleStyle={styles.headerMenuText} onPress={this.props.onSave}/>
    ];
  }

  renderFolder = (item, index) => {
    return (
      <View key={index} style={styles.folder}>
        <MPFolder folderName={item.name} selected={item.selected} musicAmount={item.song_count} onPress={this.handleSelectFolder.bind(this, index)}/>
      </View>
    )
  };

  render() {
    return (
      <View style={styles.container}>

        <MPHeader title="Escolha ou crie uma pasta para salvar" back={true} onBack={this.props.onBack} icons={this.renderHeaderMenu()}/>

        <ScrollView style={styles.folderList}>
          {this.props.folders.map((item, index) => this.renderFolder(item, index))}
        </ScrollView>

        <View style={styles.inputFolderContainer}>
          <InputFolder label="Nome da nova pasta" value={this.props.folderName} onChangeText={this.props.onChangeText} />
          <MPGradientButton style={styles.inputButtonAdd} title="Criar"
                            onPress={this.props.onAddFolder}/>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc'
  },
  folder:{
    marginHorizontal: 30
  },
  folderList:{
    paddingTop: 20,
    marginTop: 10
  },
  inputFolderContainer: {
    marginHorizontal: 40,
    marginVertical: 30
  },
  inputButtonAdd: {
    position: 'absolute',
    width: 61,
    height: 24,
    right: 0,
    bottom: 14
  }
});


export {PlayerSaveSongComponent};
