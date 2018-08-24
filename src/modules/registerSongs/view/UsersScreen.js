import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {MPHeader, MPInput, MPText, MPIconButton, MPLoading, MPUserHorizontal, MPInvitation, MPGradientButton, MPForm, MPFormButton} from '../../../components';
import {searchUsers, inviteUser} from '../../../state/action';
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
      usersSelectedTemp: {},
      invitations: [],
      invitationMail: '',
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
    if (nextProps.users && nextProps.users.data){
      const users = nextProps.users.data;
      users.map(user => {
        const selecteds = this.state.usersSelected.filter(selected => selected.id === user.id);
        if (selecteds.length > 0) {
          user.selected = true;
        }
      });
      this.setState({ users, waiting: false });
    }

    if(nextProps.invitationSuccess){
      let invList = Object.assign([], this.state.invitations);
      invList.push({name: this.state.search, email: this.state.invitationMail});
      this.setState({invitations: invList});
      this.handleClearClick();
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
      if (newState.users.length === 0) {
        newState.onlyUserIsSelected = true;
      }
    } else {
      delete newState.usersSelectedTemp[user.id];
    }
    newState.usersSelected = Object.values(newState.usersSelectedTemp);
    this.setState(newState);
  };

  handleUserSelectedClick = (index, id) => {
    let newState = {...this.state};
    newState.usersSelected[index].selected = !newState.usersSelected[index].selected;
    delete newState.usersSelectedTemp[id];
    this.setState(newState);
  };

  handleChangeText = ({value}) => {
    this.setState({invitationMail: value});
  };

  handleInvite = () => {
    let {invitationMail} = this.state;
    if(invitationMail){
      let invitationData = {
        id: this.props.profile.id,
        name: this.state.search,
        email: this.state.invitationMail,
      }
      this.props.dispatch(inviteUser(invitationData))
    }
  }

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
    console.log(this.props);
    const hasSelected = Object.keys(this.state.usersSelectedTemp).length > 0;
    let {usersSelected, invitations} = this.state;
    return (
      <View style={styles.container}>
        <MPHeader
          back={true}
          onBack={this.handleBackClick}
          title="Co-autores"
          icons={this.renderHeaderMenuSave()}
        />
        <ScrollView style={styles.content}>
          { usersSelected.length > 0 && (
            <View style={styles.contentUsers}>
              { usersSelected.map((item, index) => (
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
          {usersSelected.length == 0 && invitations.length > 0 && (
            <View style={{width: '100%', height: 20}}></View>
          )}
          { invitations.length > 0 && (
            <View>
              { invitations.map((item, index) => (
                <MPInvitation
                  key={index}
                  userName={item.name}
                  userEmail={item.email}
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
                <View >
                  <MPForm>
                    <MPInput
                      label="E-mail"
                      value={this.state.invitationMail}
                      onChangeText={this.handleChangeText}
                    />
                    <View>
                      <MPFormButton>
                        <MPGradientButton
                          style={[styles.inputButtonAdd]}
                          title="Criar"
                          onPress={this.handleInvite}
                        />
                      </MPFormButton>
                    </View>
                  </MPForm>
                </View>
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
          { (this.state.search.length >= 3 && this.state.users &&  this.state.users.length > 0 && !this.props.loading) &&
            <View style={styles.contentUsers}>
              { this.state.users.map((item, index) => (
                <MPUserHorizontal
                  key={index}
                  user={`${item.name} ${item.last_name}`}
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
  },
  inputButtonAdd: {
    position: 'absolute',
    width: 61,
    height: 24,
    right: 0,
    bottom: 14
  },
});
const mapStateToProps = ({userReducer, songsReducer, profileReducer}) => {
  return {...userReducer, song: songsReducer.song, ...profileReducer};
};

const UsersScreen = connect(mapStateToProps)(UsersScreenContainer);
export {UsersScreen};
