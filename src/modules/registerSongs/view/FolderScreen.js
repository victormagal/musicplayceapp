import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  MPFolder,
  MPHeader,
  MPInput,
  MPForm,
  MPFormButton,
  MPGradientButton,
  MPIconButton,
  MPLoading
} from '../../../components';
import {createFolder, fetchFolders, getUserSongsFolders} from '../../../state/action';
import {updateSongRegisterData} from "../../../state/songs/songsType";


class FolderScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      folderName: ''
    };
  }

  componentDidMount(){
    this.props.dispatch(getUserSongsFolders());
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.folders && nextProps.folders.data && nextProps.folders.data.length !== this.state.folders.length){
      const { data } = nextProps.folders;
      this.setState({ folders: data });
    }
  }

  handleChangeText = (folderName) => {
    this.setState({ folderName });
  };

  handleCreateFolder = () => {
    if(this.state.folderName){
      let folder = {
        'name': this.state.folderName.value,
        'type': 'userSongs',
      };
      this.props.dispatch(createFolder(folder));
    }
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSaveClick = () => {
    let selected = this.state.folders.filter(item => item.selected);
    let song = {...this.props.song};

    if(selected.length > 0){
      song.folder = selected[0];
      this.props.dispatch(updateSongRegisterData(song));
      this.handleBackClick();
    }

    //TODO: handle msg to choose folder
  };

  handleSelectFolder = (index) => {
    let newState = {...this.state};

    for(let i in newState.folders){
      newState.folders[i].selected = false;
    }

    newState.folders[index].selected = true;
    this.setState(newState);
  };

  renderFolder = (item, index) => {
    return (
      <View key={index}>
        <MPFolder
          folderName={item.name}
          selected={item.selected}
          musicAmount={item.songCount.toString()}
          onPress={() => this.handleSelectFolder(index)}
        />
      </View>
    )
  };

  renderHeaderMenuSave() {
    return [
      <MPIconButton
        key={1}
        title="Salvar"
        titleStyle={styles.headerMenuText}
        onPress={this.handleSaveClick}
      />
    ];
  }

  render() {
    return (
      <View style={styles.container}>
        <MPHeader
          back={true}
          onBack={this.handleBackClick}
          title="Escolha a pasta"
          icons={this.renderHeaderMenuSave()}
        />
        <View style={styles.content}>
          <ScrollView style={styles.scroll}>
            { this.state.folders.map((item, index) => (
              this.renderFolder(item, index)
            ))}
          </ScrollView>
          <View style={styles.inputFolderContainer}>
            <MPForm>
              <MPInput
                label="Nome da nova pasta"
                // validators={['required']}
                value={this.state.folderName}
                onChangeText={this.handleChangeText}
              />
              <View>
                <MPFormButton>
                  <MPGradientButton
                    style={styles.inputButtonAdd}
                    title="Criar"
                    onPress={this.handleCreateFolder}
                  />
                </MPFormButton>
              </View>
            </MPForm>
          </View>
        </View>
        <MPLoading visible={this.props.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC'
  },
  content: {
    flex: 2,
    marginTop: 20
  },
  scroll: {
    paddingHorizontal: 30
  },
  textFieldWithButtonContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#b1b1b1",
    padding: 0
  },
  inputFolderContainer: {
    marginVertical: 30,
    marginHorizontal: 40,
  },
  inputButtonAdd: {
    position: 'absolute',
    width: 61,
    height: 24,
    right: 0,
    bottom: 14
  },
  headerMenuText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#fff'
  }
});

const mapStateToProps = ({folderReducer, songsReducer}) => {
  return {...folderReducer, song: songsReducer.song};
};

const FolderScreen = connect(mapStateToProps)(FolderScreenContainer);
export {FolderScreen};
