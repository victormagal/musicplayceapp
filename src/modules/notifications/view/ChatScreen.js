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
import {MPSendMessageIcon} from '../../../assets/svg'

const linearMenuColor = ["#bb1a1a", "#2e2c9d"];
const CHATKIT_TOKEN_PROVIDER_ENDPOINT = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/3c5c921c-df76-41c3-8a1f-e5f38c6f9726/token";
const CHATKIT_INSTANCE_LOCATOR = "v1:us1:3c5c921c-df76-41c3-8a1f-e5f38c6f9726";


class ChatScreenContainer extends React.Component {

  state = {
    messages: [],
    menuVisible: false
  };

  componentDidMount(){
    const tokenProvider = new Chatkit.TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT
    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: this.props.loggedUser.id,
      tokenProvider: tokenProvider,
      connectionTimeout: 30000
    });

    // In order to subscribe to the messages this user is receiving in this room, we need to `connect()` the `chatManager` and have a hook on `onNewMessage`. There are several other hooks that you can use for various scenarios. A comprehensive list can be found [here](https://docs.pusher.com/chatkit/reference/javascript#connection-hooks).
    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      const roomId = this.currentUser.rooms[0].id;
      this.setState({roomId});

      this.currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: this.onReceive
        }
      });

    }).catch(e => {
      console.log("ERROR", e);
    });
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
    this.currentUser.sendMessage({
      text: message.text,
      roomId: this.state.roomId
    });
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
    if(item == 'profile'){
      this.props.navigation.navigate('UserProfileScreen');
    }else if(item == 'block'){
      this.props.navigation.navigate('message', {component: MPBlockProfile});
    }else if(item == 'remove'){
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
        start={{x:0, y:0}}
        end={{x:1, y:0}}
        style={style}>
        <MPText style={styles.menuItem} onPress={this.handleMenuItemClick.bind(this, name)}>{label}</MPText>
      </LinearGradient>
    );
  }

  renderBubble = props => {
    return (
      <View>
        {
          this.props.fontLoaded ? (
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
              />
            ) : null
        }
      </View>
    )
  };

  renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{borderTopWidth: 0.5, borderTopColor: '#E6E6E6'}}
        placeholder="Digite sua mensagem"
      />
    )
  };

  renderSend = props => {
    return (
      <Send {...props}>
        <MPSendMessageIcon />
      </Send>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} />
        <TouchableWithoutFeedback onPress={this.handleToggleMenu}>
          <View style={styles.menuHeader}>
            <MPText style={styles.menuText}>Fernanda</MPText>
            <MPText style={styles.menuText}>...</MPText>
          </View>
        </TouchableWithoutFeedback>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderBubble={this.renderBubble}
          renderSend={this.renderSend}
          renderInputToolbar={this.renderInputToolbar}
          user={{
            _id: this.props.loggedUser.id,
          }}
        />

        <Modal
          animationType="none"
          transparent={true}
          visible={this.state.menuVisible}
          onRequestClose={() => {}}>
          <View>
            <TouchableWithoutFeedback
              onPress={this.handleCloseMenu}>
              <View
                style={styles.hardCodedPadding}>
                {this.renderMenuItem('Ver Perfil', 'profile', true)}
                {this.renderMenuItem('Bloquear', 'block', true)}
                {this.renderMenuItem('Apagar conversa', 'remove')}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  },
  hardCodedPadding:{
    paddingTop: 104
  },
  menuHeader: {
    height: 40,
    paddingHorizontal: 20,
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
    alignSelf: 'center'
  },
  menuItemContainer: {
    display: 'flex',
    height: 40,
    justifyContent: 'center'
  },
  menuBorder: {
    borderBottomColor: '#292929',
    borderBottomWidth: 1
  },
  menuItem: {
    paddingLeft: 20,
    color: '#FFF',
    fontFamily: 'Montserrat-Regular'
  }
});

const mapStateToProps = ({fontReducer, authReducer}) => {
  return {...fontReducer, ...authReducer};
};

const ChatScreen = connect(mapStateToProps)(ChatScreenContainer);
export {ChatScreen};
