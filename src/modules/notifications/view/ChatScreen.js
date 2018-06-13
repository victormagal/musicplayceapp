import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Modal
} from 'react-native';
import {
  MPFooter,
  MPHeader,
  MPText
} from '../../../components';
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send
} from 'react-native-gifted-chat';
import {MPSendMessageIcon} from '../../../assets/svg'
import {connect} from 'react-redux';
import {LinearGradient} from 'expo';


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
                    fontFamily: 'probaProRegular',
                    fontSize: 16
                  },
                  right: {
                    color: '#424242',
                    fontFamily: 'probaProRegular',
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
  }

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
        <MPHeader back={true} onBack={this.handleBackClick} title={""}/>
        <TouchableWithoutFeedback onPress={this.handleToggleMenu}>
          <View>
            <MPText>Fernanda</MPText>
            <MPText>...</MPText>
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
          <View style={{marginTop: 80, backgroundColor: '#00000077'}}>
            <LinearGradient
              colors={["#e13223", "#ffffff"]}
              start={[0, 0]}
              end={[0, 1]}>
              <MPText>Lorem ipsum dolor sit amet, consectetur adipiscing elit</MPText>
              <MPText>Lorem ipsum dolor sit amet, consectetur adipiscing elit</MPText>
              <MPText>Lorem ipsum dolor sit amet, consectetur adipiscing elit</MPText>
            </LinearGradient>
          </View>
        </Modal>

        <MPFooter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1
  }
});


const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const ChatScreen = connect(mapStateToProps)(ChatScreenContainer);
export {ChatScreen};
