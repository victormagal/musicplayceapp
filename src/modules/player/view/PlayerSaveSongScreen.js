import React from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image,
  TouchableWithoutFeedback, Modal
} from 'react-native';
import {
  MPHeader, MPIconButton, MPFolder, MPTextField, MPGradientButton
} from '../../../components';


class PlayerSaveSongScreen extends React.Component {

  state = {
    folderName: '',
    folders: [
      {
        id: 1,
        title: 'Inspirações rock',
        total: '2 músicas'
      },
      {
        id: 2,
        title: 'Inspirações Samba',
        total:  '4 músicas'
      }
    ]
  };

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleAdd = () => {
    if(this.state.folderName){
      let newState = {...this.state};
      newState.folderName = '';
      newState.folders.push({
        id: newState.folders.length,
        title: this.state.folderName,
        total: 'Nenhuma música'
      });
      this.setState(newState);
    }
  };

  handleChangeText = (value) => {
    this.setState({folderName: value});
  };

  handleSelectFolder = (index) => {
    let newState = {...this.state};

    for(let i in newState.folders){
      newState.folders[i].selected = false;
    }

    newState.folders[index].selected = true;
    this.setState(newState);
  };

  renderHeaderMenu() {
    return [
      <MPIconButton title="Salvar" titleStyle={styles.headerMenuText}/>
    ];
  }

  renderFolder = (item, index) => {
    return (
      <View key={index}>
        <MPFolder folderName={item.title} selected={item.selected} musicAmount={item.total} onPress={this.handleSelectFolder.bind(this, index)}/>
      </View>
    )
  };

  render() {
    return (
      <View style={styles.container}>

        <MPHeader title="Escolha ou crie uma pasta para salvar" back={true} onBack={this.handleBack} icons={this.renderHeaderMenu()}/>

        <ScrollView style={styles.folderList}>
          {this.state.folders.map((item, index) => this.renderFolder(item, index))}
        </ScrollView>

        <View style={styles.inputFolderContainer}>
          <MPTextField label="Nome da nova pasta" value={this.state.folderName} onChangeText={this.handleChangeText} />
          <MPGradientButton style={styles.inputButtonAdd} title="Criar"
                            value={this.state.folderName}
                            onPress={this.handleAdd}/>
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


export {PlayerSaveSongScreen};
