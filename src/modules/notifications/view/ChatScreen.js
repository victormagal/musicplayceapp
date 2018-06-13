import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  MPFooter,
  MPHeader
} from '../../../components';
import {
  Bubble, 
  GiftedChat,
  InputToolbar,
  Send
} from 'react-native-gifted-chat';
import { MPSendMessageIcon } from '../../../assets/svg'
import { connect } from 'react-redux';


class ChatScreenContainer extends React.Component {

  state = {
    messages: []
  }

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
  }

  renderSend = props => {
    return (
      <Send {...props}>
        <MPSendMessageIcon />
      </Send>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={""} />
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
        <MPFooter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FFFFFF',
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const ChatScreen = connect(mapStateToProps)(ChatScreenContainer);
export { ChatScreen };
