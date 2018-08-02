import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {MPHeader, MPInput, MPText, MPIconButton, MPLoading, MPUserHorizontal} from '../../../components';
import {searchUsers} from '../../../state/action';
import {MPSearchRedIcon, MPCloseFilledRedIcon} from '../../../assets/svg';
import {updateSongRegisterData} from "../../../state/songs/songsType";

class UsersScreenContainer extends React.Component {
  debounceTimer = null;

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      waiting: false,
      users: [],
      usersSelected: [],
      usersSelectedTemp: {}
    };
  }

  componentDidMount(){
    if(this.props.song.coAuthors && this.props.song.coAuthors.length > 0){
      this.setState({
        usersSelected: this.props.song.coAuthors.map((author) => {
          author.selected = true;
          return author;
        })
      });
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.users){
      this.setState({ users: nextProps.users.data, waiting: false });
    }
  }

  componentWillUnmount(){
    if (this.debounceTimer !== null){
      clearTimeout(this.debounceTimer);
    }
  }

  handleSearchChange = ({value}) => {
    this.setState({ search: value, waiting: true });
    this.handleSearch(value);

    if (value.length === 0){
      this.setState({ usersSelected: Object.values(this.state.usersSelectedTemp) });
    }

    if (value.length < 3){
      this.setState({users: []});
    }
  };

  handleSearch = (value) => {
    if(this.debounceTimer !== null) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      if(value.length >= 3) {
        this.props.dispatch(searchUsers(value));
      }
    }, 700);
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSaveClick = () => {
    const {usersSelectedTemp} = this.state;
    const selecteds = Object.values(usersSelectedTemp);

    if (selecteds.length > 0){
      let song = {...this.props.song};

      song.coAuthors = selecteds;
      this.props.dispatch(updateSongRegisterData(song));
      this.handleBackClick();
    }

    //TODO: must choose one to save
  };

  handleClearClick = () => {
    this.setState({ users: [], search: '' });
  };

  handleUserClick = (index) => {
    let newState = {...this.state};
    const user = newState.users[index];
    newState.users[index].selected = !user.selected;

    if (user.selected){
      newState.usersSelectedTemp[user.id] = user;
    } else {
      delete newState.usersSelectedTemp[user.id];
    }

    this.setState(newState);
  };

  handleUserSelectedClick = (index, id) => {
    let newState = {...this.state};
    newState.usersSelected[index].selected = !newState.usersSelected[index].selected;
    delete newState.usersSelectedTemp[id];
    this.setState(newState);
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
    const hasSelected = Object.keys(this.state.usersSelectedTemp).length > 0;

    return (
      <View style={styles.container}>
        <MPHeader
          back={true}
          onBack={this.handleBackClick}
          title="Co-autores"
          icons={this.renderHeaderMenuSave()}
        />
        <ScrollView style={styles.content}>
          { this.state.usersSelected.length > 0 && (
            <View style={styles.contentUsers}>
              { this.state.usersSelected.map((item, index) => (
                <MPUserHorizontal
                  key={index}
                  user={item.name}
                  selected={item.selected}
                  image={item.picture_url}
                  onPress={() => this.handleUserSelectedClick(index, item.id)}
                />
              ))}
            </View>
          )}

          <View style={styles.contentSearch}>
            <MPText style={styles.textTop}>
              Essa música tem outros autores?
            </MPText>
            <View>
              <MPInput
                label='Pesquise pelo nome:'
                value={this.state.search}
                onChangeText={this.handleSearchChange}
              />
              { this.state.search.length < 3 &&
                <MPSearchRedIcon style={styles.searchIcon} />
              }
              { this.state.search.length >= 3 &&
                <MPIconButton
                  style={styles.searchIcon}
                  icon={MPCloseFilledRedIcon}
                  onPress={this.handleClearClick}
                />
              }
            </View>

            { (this.state.search.length >= 3
              && this.state.users.length === 0
              && !this.props.loading && !this.state.waiting) && (
              <View>
                <MPText style={ styles.textInputSubTextHeader}>
                  Não encontrou o co-autor?
                </MPText>
                <MPText style={ styles.textInputSubTextSuggestion}>
                  Convide-o para se juntar ao MusicPlayce.
                </MPText>
                <MPInput label='E-mail' />
              </View>
            )}
            { (!this.state.search && !hasSelected) &&
              <TouchableOpacity style={styles.clickableTextContainer} onPress={this.handleBackClick}>
                <MPText style={styles.clickableText}>
                  Não, apenas eu
                </MPText>
              </TouchableOpacity>
            }
          </View>
          { (this.state.search.length >= 3 && this.state.artists.length > 0 && !this.props.loading) &&
            <View style={styles.contentUsers}>
              { this.state.artists.map((item, index) => (
                <MPUserHorizontal
                  key={index}
                  artist={item.name}
                  selected={!!item.selected}
                  image={item.picture_url}
                  onPress={() => this.handleUserClick(index)}
                />
              ))}
            </View>
          }
        </ScrollView>
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
    flex: 1
  },
  contentSearch: {
    marginHorizontal: 40,
    marginTop: 30
  },
  contentUsers: {
    marginTop: 30,
    paddingHorizontal: 10
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    fontFamily: 'ProbaPro-Regular'
  },
  clickableTextContainer: {
    alignItems: 'center',
  },
  clickableText: {
    borderBottomWidth: 1,
    borderColor: '#5994db',
    textAlign: 'center',
    color: '#5994db',
    fontSize: 14,
    marginTop: 152,
    fontFamily: 'Montserrat-Regular'
  },
  headerMenuText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#fff'
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    bottom: 15
  },
  textInputSubTextHeader: {
    color: '#686868',
    fontSize: 12,
    fontFamily: 'Montserrat-BoldItalic'
  },
  textInputSubTextSuggestion: {
    fontSize: 12,
    color: '#686868',
    fontFamily: 'Montserrat-Italic'
  }
});
const mapStateToProps = ({artistReducer, songsReducer}) => {
  return {...artistReducer, song: songsReducer.song};
};

const UsersScreen = connect(mapStateToProps)(UsersScreenContainer);
export {UsersScreen};
