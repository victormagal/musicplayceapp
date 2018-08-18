import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, ScrollView, Keyboard, FlatList} from 'react-native';
import {
  MPFolder, MPHeader, MPInput, MPForm, MPFormButton, MPGradientButton,
  MPIconButton, MPLoading, MPFloatingNotification
} from '../../../components';
import {createFolder, getUserSongsFolders} from '../../../state/action';
import {updateSongRegisterData} from "../../../state/songs/songsType";
import {MPAlertIcon} from '../../../assets/svg';
import { withFixedBottom } from '../../../connectors/withFixedBottom';

const InputFolder = withFixedBottom(MPInput);
const GradientButton = withFixedBottom(MPGradientButton);

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

  componentDidMount() {
    this.props.dispatch(getUserSongsFolders());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userFolders && nextProps.userFolders.data) {
      let {data} = nextProps.userFolders;
      const {song} = this.props;

      if (song.folder) {
        data = data.map(f => {
          if (f.id === song.folder.id) {
            f.selected = true;
          }
          return f;
        })
      }
      Keyboard.dismiss();
      this.setState({folders: data, folderName: ''});
    }
  }

  componentWillUnmount() {
    if (this.timerError) {
      clearTimeout(this.timerError);
    }
  }

  handleChangeText = ({value}) => {
    this.setState({folderName: value});
  };

  handleCreateFolder = () => {
    if(this.state.folderName){
      let folder = {
        'name': this.state.folderName,
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

    if (selected.length > 0) {
      song.folder = selected[0];
      this.props.dispatch(updateSongRegisterData(song));
      this.handleBackClick();
    } else {
      this.setState({showError: true});
      this.timerError = setTimeout(() => {
        this.setState({showError: false});
        clearTimeout(this.timerError);
      }, 2000)
    }
  };

  handleSelectFolder = (index) => {
    let folders = Object.assign([], this.state.folders);

    for (let i in folders) {
      folders[i].selected = false;
    }

    folders[index].selected = true;
    this.setState({folders});
  };

  handleFolderValidate = () => {
    this.setState({invalid: !this.state.folderName});
  };

  handleFolderPagination = () => {
    if(this.state.folders.length > 0 && this.props.userFolders.pagination.current_page < this.props.userFolders.pagination.total_pages){
      this.props.dispatch(getUserSongsFolders(this.props.userFolders.pagination.current_page + 1));
    }
  };

  renderFolder = ({item, index}) => {
    return (
      <MPFolder
        folderName={item.name}
        selected={item.selected}
        musicAmount={item.song_count}
        onPress={() => this.handleSelectFolder(index)}
      />
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
          <FlatList
            style={styles.scroll}
            data={this.state.folders}
            renderItem={this.renderFolder}
            keyExtractor={(item) => item.id}
            onEndReached={this.handleFolderPagination}
            onEndReachedThreshold={0.1}
          />
          <View style={styles.inputFolderContainer}>
            <MPForm>
              <InputFolder
                label="Nome da nova pasta"
                validators={['required']}
                value={this.state.folderName}
                onBlur={this.handleFolderValidate}
                onChangeText={this.handleChangeText}
              />
              <View>
                <MPFormButton>
                  <GradientButton
                    style={[styles.inputButtonAdd, bottomButtonStyle]}
                    title="Criar"
                    onPress={this.handleCreateFolder}
                  />
                </MPFormButton>
              </View>
            </MPForm>
          </View>
        </View>
        <MPLoading visible={this.props.loading}/>
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
    marginBottom: 20,
    marginTop: 0,
    marginHorizontal: 25,
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
