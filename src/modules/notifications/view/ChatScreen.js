import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  MPFooter,
  MPHeader
} from '../../../components';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';


class ChatScreenContainer extends React.Component {

  state = {
    messages: []
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
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

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={""} />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
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
