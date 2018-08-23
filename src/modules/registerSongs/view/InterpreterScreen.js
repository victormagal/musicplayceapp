import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {MPHeader, MPInput, MPText, MPIconButton, MPLoading, MPUserHorizontal, MPGradientButton, MPForm, MPFormButton, MPInvitation} from '../../../components';
import {searchUsers} from '../../../state/action';
import {MPSearchRedIcon, MPCloseFilledRedIcon} from '../../../assets/svg';
import {updateSongRegisterData} from "../../../state/songs/songsType";
import { withFixedBottom } from '../../../connectors/withFixedBottom'

InputInvitation = withFixedBottom(MPInput);
InvitationGradientButton = withFixedBottom(MPGradientButton);

class InterpreterScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      waiting: false,
      users: [],
      usersSelected: [],
      invitations: [],
      usersSelectedTemp: {},
      invitaionMail: ''
    };
  }

  componentDidMount(){
    if(this.props.song.interpreter_name && this.props.song.interpreter_name.length > 0){
      this.setState({
        usersSelected: this.props.song.interpreter_name.map((interpreter) => {
          interpreter.selected = true;
          return interpreter;
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
    const {usersSelected} = this.state;
    if (usersSelected.length > 0){
      const song = {...this.props.song};

      song.interpreter_name = usersSelected;
      this.props.dispatch(updateSongRegisterData(song));
      this.handleBackClick();
    }
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
    newState.usersSelected = newState.usersSelected.filter(user => user.id !== id);
    delete newState.usersSelectedTemp[id];
    newState.users = newState.users.map(user => {
      if (user.id === id) {
        user.selected = false;
      }
      return user;
    });
    this.setState(newState);
  };

  handleChangeText = ({value}) => {
    this.setState({invitaionMail: value});
  };

  handleInvite = () => {
    let {invitaionMail} = this.state;
    if(invitaionMail){
      // TODO
      let invitationData = {
        name: this.state.search,
        email: this.state.invitaionMail,
      }
      let invList = Object.assign([], this.state.invitations);
      invList.push(invitationData);
      this.setState({invitations: invList});
      this.handleClearClick();
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
    const {
      search,
      users,
      waiting,
      invitations,
      usersSelected
    } = this.state;
    return (
      <View style={styles.container}>
        <MPHeader
          back={true}
          onBack={this.handleBackClick}
          title="Intérpretes"
          icons={this.renderHeaderMenuSave()}
        />
        <ScrollView style={styles.content}>
          { usersSelected.length > 0 && (
            <View style={styles.contentUsers}>
              { usersSelected.map((item, index) => (
                <MPUserHorizontal
                  key={index}
                  user={`${item.name} ${item.last_name}`}
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
              Essa música tem intérpretes?
            </MPText>
            <View>
              <MPInput
                label='Pesquisar por nome'
                value={search}
                onChangeText={this.handleSearchChange}
              />
              { search.length < 3 ?
                <MPSearchRedIcon style={styles.searchIcon} />
                :
                <MPIconButton
                  style={styles.searchIcon}
                  icon={MPCloseFilledRedIcon}
                  onPress={this.handleClearClick}
                />
              }
            </View>

            {(search.length >= 3
              && users.length === 0
              && !this.props.loading
              && !waiting
            ) && (
              <View>
                <MPText style={ styles.textInputSubTextHeader}>
                  Não encontrou o intérprete?
                </MPText>
                <MPText style={ styles.textInputSubTextSuggestion}>
                  Convide-o para se juntar ao MusicPlayce.
                </MPText>
                <View >
                  <MPForm>
                    <InputInvitation
                      label="E-mail"
                      value={this.state.invitaionMail}
                      onChangeText={this.handleChangeText}
                    />
                    <View>
                      <MPFormButton>
                        <InvitationGradientButton
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
          </View>
          { (search.length >= 3 && users && users.length > 0 && !this.props.loading) &&
          <View style={styles.contentUsers}>
            {users.map((item, index) => (
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
          { usersSelected.length === 0 &&
            <View style={{ marginTop: 152 }}>
              <TouchableOpacity style={styles.clickableTextContainer} onPress={this.handleBackClick}>
                <MPText style={styles.clickableText}>
                  Não, apenas eu
                </MPText>
              </TouchableOpacity>
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
const mapStateToProps = ({userReducer, songsReducer}) => {
  return {...userReducer, song: songsReducer.song};
};

const InterpreterScreen = connect(mapStateToProps)(InterpreterScreenContainer);
export {InterpreterScreen};
