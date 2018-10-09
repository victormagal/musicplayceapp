import React from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import {
  MPHeader, MPIconButton, MPFolder, MPGradientButton, MPInput, MPLoading
} from '../../../../components';


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
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <MPHeader
          title="Escolha ou crie uma pasta para salvar"
          back={true}
          onBack={this.props.onBack}
          icons={this.renderHeaderMenu()}
        />
        <View style={styles.content}>
          <FlatList
            contentContainerStyle={styles.scroll}
            data={this.props.folders}
            renderItem={this.renderFolder}
            keyExtractor={(item) => item.id}
            onEndReached={this.props.onEndReached}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderListFooter}
          />
          <View style={styles.inputFolderContainer}>
            <MPInput
              label="Nome da nova pasta"
              value={this.props.folderName}
              onChangeText={this.props.onChangeText}
            />
            <View>
              <MPGradientButton
                style={styles.inputButtonAdd}
                title="Criar"
                onPress={this.props.onAddFolder}
              />
            </View>
          </View>
        </View>
        <MPLoading visible={this.props.loading}/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc'
  },
  content: {
    flex: 2,
    marginTop: 20
  },
  scroll: {
    paddingHorizontal: 30
  },
  inputFolderContainer: {
    height: 90,
    marginTop: 0,
    marginHorizontal: 25,
  },
  inputButtonAdd: {
    position: 'absolute',
    width: 61,
    height: 24,
    bottom: 14,
    right: 0
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
