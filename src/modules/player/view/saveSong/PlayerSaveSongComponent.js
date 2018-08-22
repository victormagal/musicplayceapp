import React from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {
  MPHeader, MPIconButton, MPFolder, MPGradientButton, MPInput, MPLoading
} from '../../../../components';
import {withFixedBottom} from '../../../../connectors/withFixedBottom';

const InputFolder = withFixedBottom(MPInput);
const GradientButton = withFixedBottom(MPGradientButton);

class PlayerSaveSongComponent extends React.Component {

  handleSelectFolder = (index) => {
    this.props.onSelectFolder(index);
  };

  renderListFooter = () => {
    let {loadingMore} = this.props;
    if (loadingMore) {
      return (
        <View style={styles.containerLoading}>
          <ActivityIndicator size="large" color="#BB1A1A" style={styles.loading}/>
        </View>
      );
    }
    return null;
  };

  renderHeaderMenu() {
    return [
      <MPIconButton key={1} title="Salvar" titleStyle={styles.headerMenuText} onPress={this.props.onSave}/>
    ];
  }

  renderFolder = ({item, index}) => {
    return (
      <MPFolder folderName={item.name} selected={item.selected} musicAmount={item.song_count}
                onPress={this.handleSelectFolder.bind(this, index)}/>
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
          contentContainerStyle={{paddingBottom: 16}}
          style={styles.folderList}
          data={this.props.folders}
          renderItem={this.renderFolder}
          keyExtractor={(item) => item.id}
          onEndReached={this.props.onEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderListFooter}/>
        <View style={styles.inputFolderContainer}>
          <InputFolder
            label="Nome da nova pasta"
            value={this.props.folderName}
            onChangeText={this.props.onChangeText}
          />
          <GradientButton
            style={styles.inputButtonAdd}
            title="Criar"
            onPress={this.props.onAddFolder}
          />
        </View>
        <MPLoading visible={this.props.loading}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc'
  },
  folderList: {
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
  },
  containerLoading: {
    width: '100%',
    paddingVertical: 30,
    justifyContent: 'center'
  },
  loading: {
    alignSelf: 'center'
  }
});

export {PlayerSaveSongComponent};
