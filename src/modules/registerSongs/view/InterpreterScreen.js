import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {MPHeader, MPInput, MPText, MPIconButton, MPLoading, MPUserHorizontal, MPGradientButton, MPForm, MPFormButton, MPInvitation} from '../../../components';
import {searchUsers, inviteUser} from '../../../state/action';
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
      invitationMail: ''
    };
  }

  componentDidMount(){
    if(this.props.song.interpreters && this.props.song.interpreters.length > 0){
      const selecteds = this.props.song.interpreters.map((interpreter) => {
        interpreter.selected = true;
        return interpreter;
      });

      this.setState({
        usersSelected: selecteds,
        usersSelectedTemp: selecteds.reduce((result, user) => {
          result[user.id] = user;
          return result;
        }, {})
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
      const song = {...this.props.song};

      song.interpreters = selecteds;
      this.props.dispatch(updateSongRegisterData(song));
      this.handleBackClick();
    }
  };

  handleMeClick = () => {
    let song = {...this.props.song};
    song.interpreters = [];
    this.props.dispatch(updateSongRegisterData(song));
    this.handleBackClick();
  };

  handleClearClick = () => {
    this.setState({ users: [], search: '', usersSelected: Object.values(this.state.usersSelectedTemp) });
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
      this.props.dispatch(inviteUser(invitationData));
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
                      contentStyle={styles.innerInputEmail}
                      label="E-mail"
                      value={this.state.invitationMail}
                      onChangeText={this.handleChangeText}
                    />
                    <MPFormButton>
                      <InvitationGradientButton
                        style={[styles.inputButtonAdd]}
                        title="Criar"
                        onPress={this.handleInvite}
                      />
                    </MPFormButton>
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
              <TouchableOpacity style={styles.clickableTextContainer} onPress={this.handleMeClick}>
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
    top: '40%',
    width: 61,
    height: 24,
    right: 0
  },
  innerInputEmail: {
    paddingRight: 60
  }
});
const mapStateToProps = ({userReducer, songsReducer, profileReducer}) => {
  return {...userReducer, song: songsReducer.song, ...profileReducer};
};

const InterpreterScreen = connect(mapStateToProps)(InterpreterScreenContainer);
export {InterpreterScreen};
