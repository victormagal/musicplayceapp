import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Modal
} from 'react-native';
import {
  MPHeader,
  MPText,
  MPConfirmChatDelete,
  MPChatDeleted,
  MPBlockProfile,
  MPUnblockProfile
} from '../../../components';
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send
} from 'react-native-gifted-chat';
import {MPSendMessageIcon} from '../../../assets/svg'
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const linearMenuColor = ["#bb1a1a", "#2e2c9d"];

class ChatScreenContainer extends React.Component {

  state = {
    messages: [],
    menuVisible: false
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Gostei sim. Podemos marcar uma conversa? Gostaria de conversar com você. Acho que essa música pode funcionar muito bem em um dos meus artistas.',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Marcelo Marra'
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
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
            _id: 1,
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

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const ChatScreen = connect(mapStateToProps)(ChatScreenContainer);
export {ChatScreen};
