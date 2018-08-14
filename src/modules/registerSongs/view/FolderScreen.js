import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, ScrollView, Keyboard} from 'react-native';
import {
  MPFolder, MPHeader, MPInput, MPForm, MPFormButton, MPGradientButton,
  MPIconButton, MPLoading, MPFloatingNotification
} from '../../../components';
import {createFolder, getUserSongsFolders} from '../../../state/action';
import {updateSongRegisterData} from "../../../state/songs/songsType";
import {MPAlertIcon} from '../../../assets/svg';


class FolderScreenContainer extends React.Component {

  timerError = null;

  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      invalid: false,
      folders: [],
      folderName: ''
    };
  }

  componentDidMount(){
    this.props.dispatch(getUserSongsFolders());
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.folders && nextProps.folders.data && nextProps.folders.data.length !== this.state.folders.length){
      let { data } = nextProps.folders;
      const {song} = this.props;

      if(song.folder){
        data = data.map(f => {
          if(f.id === song.folder.id){
            f.selected = true;
          }
          return f;
        })
      }

      this.setState({ folders: data, folderName: ''});
    }
  }

  componentWillUnmount(){
    if(this.timerError){
      clearTimeout(this.timerError);
    }
  }

  handleChangeText = ({value}) => {
    this.setState({ folderName: value });
  };

  handleCreateFolder = () => {
    let folder = {
      'name': this.state.folderName,
      'type': 'userSongs',
    };
    this.props.dispatch(createFolder(folder));
    Keyboard.dismiss();
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
    }else{
      this.setState({showError: true});
      this.timerError = setTimeout(() => {
        this.setState({showError: false});
        clearTimeout(this.timerError);
      }, 2000)
    }
  };

  handleSelectFolder = (index) => {
    let newState = {...this.state};

    for(let i in newState.folders){
      newState.folders[i].selected = false;
    }

    newState.folders[index].selected = true;
    this.setState(newState);
  };

  handleFolderValidate = () => {
    this.setState({invalid: !this.state.folderName});
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
    let bottomButtonStyle = {bottom: this.state.invalid ? 30 : 14};

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
                validators={['required']}
                value={this.state.folderName}
                onBlur={this.handleFolderValidate}
                onChangeText={this.handleChangeText}
              />
              <View>
                <MPFormButton>
                  <MPGradientButton
                    style={[styles.inputButtonAdd, bottomButtonStyle]}
                    title="Criar"
                    onPress={this.handleCreateFolder}
                  />
                </MPFormButton>
              </View>
            </MPForm>
          </View>
        </View>
        <MPLoading visible={this.props.loading} />
        <MPFloatingNotification visible={this.state.showError}
                                text='Selecione uma pasta'
                                icon={<MPAlertIcon />}/>
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
    right: 0
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
