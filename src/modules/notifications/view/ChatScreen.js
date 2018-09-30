import React from 'react';
import {
  StyleSheet, View, Text, TouchableWithoutFeedback, Modal
} from 'react-native';
import {connect} from 'react-redux';
import Chatkit from "@pusher/chatkit";
import LinearGradient from 'react-native-linear-gradient';
import {
  Bubble, GiftedChat, InputToolbar, Send
} from 'react-native-gifted-chat';
import {
  MPHeader, MPText, MPConfirmChatDelete, MPBlockProfile
} from '../../../components';
import {MPPath2Icon, MPProfileIcon, MPSearchRedIcon, MPSendMessageIcon, MPStackedGroupIcon} from '../../../assets/svg'

const linearMenuColor = ["#bb1a1a", "#2e2c9d"];
const CHATKIT_TOKEN_PROVIDER_ENDPOINT = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/3c5c921c-df76-41c3-8a1f-e5f38c6f9726/token";
const CHATKIT_INSTANCE_LOCATOR = "v1:us1:3c5c921c-df76-41c3-8a1f-e5f38c6f9726";


class ChatScreenContainer extends React.Component {

  state = {
    messages: [
      {
        text: 'Tô lançando uma música nova...',
        createdAt: new Date(),
        user: {
          _id: '8abb2aa1-dc61-4e01-9100-71becef12184',
          avatar: 'https://st2.depositphotos.com/1007566/12304/v/950/depositphotos_123041468-stock-illustration-avatar-man-cartoon.jpg'
        },
        _id: 'd9fbf36f-3361-4e56-9e54-3f0e15ec6d7f',
      },
      {
        text: 'Quanto tempo! Novidades?',
        createdAt: new Date(),
        user: { _id: '8abb2aa1-dc61-4e01-9100-71becef12183' },
        _id: 'd9fbf36f-3361-4e56-9e54-3f0e15ec6d7e',
      },
      {
        text: 'E você?',
        createdAt: new Date(),
        user: {
          _id: '8abb2aa1-dc61-4e01-9100-71becef12184',
          avatar: 'https://st2.depositphotos.com/1007566/12304/v/950/depositphotos_123041468-stock-illustration-avatar-man-cartoon.jpg'
        },
        _id: 'd9fbf36f-3361-4e56-9e54-3f0e15ec6d7d',
      },
      {
        text: 'Tudo joia',
        createdAt: new Date(),
        user: {
          _id: '8abb2aa1-dc61-4e01-9100-71becef12184',
          avatar: 'https://st2.depositphotos.com/1007566/12304/v/950/depositphotos_123041468-stock-illustration-avatar-man-cartoon.jpg'
        },
        _id: 'd9fbf36f-3361-4e56-9e54-3f0e15ec6d7c',
      },
      {
        text: 'Tudo bem?',
        createdAt: new Date(),
        user: { _id: '8abb2aa1-dc61-4e01-9100-71becef12183' },
        _id: 'd9fbf36f-3361-4e56-9e54-3f0e15ec6d7b'
      },
      {
        text: 'Oie',
        createdAt: new Date(),
        user: { _id: '8abb2aa1-dc61-4e01-9100-71becef12183' },
        _id: 'd9fbf36f-3361-4e56-9e54-3f0e15ec6d7a'
      }
    ],
    menuVisible: false
  };

  componentDidMount(){
    // const tokenProvider = new Chatkit.TokenProvider({
    //   url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
    // });
    //
    // const chatManager = new Chatkit.ChatManager({
    //   instanceLocator: CHATKIT_INSTANCE_LOCATOR,
    //   userId: this.props.loggedUser.id,
    //   tokenProvider: tokenProvider,
    //   connectionTimeout: 30000
    // });
    //
    // // In order to subscribe to the messages this user is receiving in this room, we need to `connect()` the
    // // `chatManager` and have a hook on `onNewMessage`. There are several other hooks that you can use for various
    // // scenarios. A comprehensive list can be found [here](https://docs.pusher.com/chatkit/reference/javascript#connection-hooks).
    // chatManager.connect().then(currentUser => {
    //   this.currentUser = currentUser;
    //   const roomId = this.currentUser.rooms[0].id;
    //   this.setState({roomId});
    //
    //   this.currentUser.subscribeToRoom({
    //     roomId: roomId,
    //     hooks: {
    //       onNewMessage: this.onReceive
    //     }
    //   });
    // }).catch(e => {
    //   console.log("ERROR", e);
    // });
  }

  onReceive = (data) =>  {
    const { id, senderId, text, createdAt } = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA"
      }
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage)
    }));
  }

  onSend([message]) {
    // this.currentUser.sendMessage({
    //   text: message.text,
    //   roomId: this.state.roomId
    // });
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleToggleMenu = () => {
    this.setState({menuVisible: !this.state.menuVisible});
  };

  handleCloseMenu = () => {
    this.setState({menuVisible: false});
  };

  handleMenuItemClick = (item) => {
    this.handleCloseMenu();
    if (item === 'profile') {
      this.props.navigation.navigate('UserProfileScreen', { userId: '' });
    } else if(item === 'block') {
      this.props.navigation.navigate('message', {component: MPBlockProfile});
    } else if(item === 'remove') {
      this.props.navigation.navigate('message', {component: MPConfirmChatDelete});
    }
  };

  renderMenuItem(label, name, border){
    let style = [styles.menuItemContainer];

    if(border){
      style.push(styles.menuBorder);
    }

    return (
      <LinearGradient
        colors={linearMenuColor}
        start={{ x: 0, y: 0 }}
        end={{x: 1, y: 0}}
        style={style}>
        <MPText style={styles.menuItem} onPress={() => this.handleMenuItemClick(name)}>
          {label}
        </MPText>
      </LinearGradient>
    );
  }

  renderBubble = props => {
    return (
      <View>
        { this.props.fontLoaded ?
          <Bubble
            {...props}
            textStyle={{
              left: {
                color: '#9B9B9B',
                fontFamily: 'ProbaPro-Regular',
                fontSize: 16
              },
              right: {
                color: '#424242',
                fontFamily: 'ProbaPro-Regular',
                fontSize: 16
              }
            }}
            wrapperStyle={{
              left: {
                backgroundColor: 'white',
                padding: 10,
                shadowColor: '#000000',
                shadowOpacity: 0.15,
                shadowRadius: 2,
                shadowOffset: {
                  width: 1,
                  height: 1
                }
              },
              right: {
                backgroundColor: '#DFDFDF',
                padding: 10
              }
            }}
            timeProps={{
              right: {
                color: '#000'
              }
            }}
          />
        : null
      }
      </View>
    )
  };

  renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{ borderTopWidth: 0.5, borderTopColor: '#E6E6E6' }}
        placeholder="Digite sua mensagem"
      />
    )
  };

  renderSend = props => {
    return (
      <Send {...props}>
        <View style={{ marginBottom: 10, marginHorizontal: 10 }}>
          <MPSendMessageIcon />
        </View>
      </Send>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MPHeader
            back={true}
            onBack={this.handleBackClick}
        />
        <TouchableWithoutFeedback onPress={this.handleToggleMenu}>
          <View style={styles.menuHeader}>
            <MPText style={styles.menuText}>
              Fernanda Almeida
            </MPText>
            <View style={[styles.menuText]}>
              {this.state.menuVisible ?
                <MPPath2Icon style={{ width: 24, height: 8 }}/>
                :
                <MPStackedGroupIcon style={{ width: 24, height: 18 }}/>
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
        { this.state.menuVisible &&
          <View>
            {this.renderMenuItem('Ver Perfil', 'profile', true)}
            {this.renderMenuItem('Bloquear', 'block', true)}
            {this.renderMenuItem('Apagar conversa', 'remove')}
          </View>
        }
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderBubble={this.renderBubble}
          renderSend={this.renderSend}
          renderInputToolbar={this.renderInputToolbar}
          user={{ _id: this.props.loggedUser.id }}
          renderAvatarOnTop={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  },
  menuHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    borderTopColor: '#292929',
    borderTopWidth: 1
  },
  menuText: {
    color: '#FFF',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    lineHeight: 20,
    alignSelf: 'center'
  },
  menuItemContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  menuBorder: {
    borderBottomColor: '#292121',
    borderBottomWidth: 1
  },
  menuItem: {
    paddingLeft: 20,
    paddingVertical: 15,
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular'
  }
});

const mapStateToProps = ({ authReducer}) => {
  return {...authReducer};
};

const ChatScreen = connect(mapStateToProps)(ChatScreenContainer);
export {ChatScreen};
