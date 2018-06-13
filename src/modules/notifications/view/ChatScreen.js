import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import {
  MPFooter,
  MPHeader,
  MPText
} from '../../../components';
import { connect } from 'react-redux';


class ChatScreenContainer extends React.Component {

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={""} />
        <ScrollView>
          <MPText>Olá enfermeira</MPText>
        </ScrollView>
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
  },
  firstSliderContainer: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  secondSliderContainer: {
    flex: 1,
    backgroundColor: '#FCFCFC'
  },
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const ChatScreen = connect(mapStateToProps)(ChatScreenContainer);
export { ChatScreen };
