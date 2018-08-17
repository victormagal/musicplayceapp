import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {
  MPHeader, MPIconButton, MPFolder, MPGradientButton, MPInput
} from '../../../../components';
import {withFixedBottom} from '../../../../connectors/withFixedBottom';

class PlayerSaveSongComponent extends React.Component {

  handleSelectFolder = (index) => {
    this.props.onSelectFolder(index);
  };

  renderHeaderMenu() {
    return [
      <MPIconButton key={1} title="Salvar" titleStyle={styles.headerMenuText} onPress={this.props.onSave}/>
    ];
  }

  renderFolder = ({item, index}) => {
    return (
      <MPFolder folderName={item.name} selected={item.selected} musicAmount={item.song_count} onPress={this.handleSelectFolder.bind(this, index)}/>
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <MPHeader
          title="Escolha ou crie uma pasta para salvar"
          back={true}
          onBack={this.props.onBack}
          icons={this.renderHeaderMenu()}
        />
        <FlatList
          style={styles.folderList}
          data={this.props.folders}
          renderItem={this.renderFolder}
          keyExtractor={(item) => item.id}
          onEndReached={this.props.onEndReached}
          onEndReachedThreshold={0.1}
        />
        <View style={styles.inputFolderContainer}>
          <MPInput
            label="Nome da nova pasta"
            value={this.props.folderName}
            onChangeText={this.props.onChangeText}
          />
          <MPGradientButton
            style={styles.inputButtonAdd}
            title="Criar"
            onPress={this.props.onAddFolder}
          />
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
  folderList:{
    paddingTop: 20,
    marginTop: 10,
    marginHorizontal: 30
  },
  inputFolderContainer: {
    paddingHorizontal: 25,
    paddingBottom: 20,
    paddingTop: 0
  },
  inputButtonAdd: {
    position: 'absolute',
    width: 61,
    height: 24,
    right: 25,
    bottom: 35
  }
});

const PlayerSaveSong = withFixedBottom(PlayerSaveSongComponent);
export {PlayerSaveSong};
