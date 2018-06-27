import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import { MPText, MPUnblockProfile } from '../../components';
import { connect } from 'react-redux';

class MPMessageListComponent extends React.Component {

  onPress = (rota) => {
    this.props.navigation.navigate(rota);
  }

  unblockProfile = () => {
    this.props.navigation.navigate('message', {component: MPUnblockProfile});
  }

  render() {
    let { item } = this.props;
    return (
      <TouchableHighlight onPress={this.onPress.bind(this, item.rota)} underlayColor="transparent">
        <View style={styles.item}>
          {
            item.avatar ? (
              <View style={styles.boxIcon}>
                <Image source={require('../../../assets/images/avatar-big.png')} />
              </View>
            ) : null
          }
          {
            item.avatar ? (
              <View style={styles.boxText}>
                <View style={styles.titleBoxText}>
                  <MPText style={styles.title}>{item.name}</MPText>
                  <MPText style={styles.textTime}>
                    {item.time}
                  </MPText>
                </View>
                <MPText style={styles.text}>
                  {item.title}
                </MPText>
              </View>
            ) :
            <TouchableHighlight onPress={this.unblockProfile.bind(this)} underlayColor='transparent'>
              <View style={styles.boxTextBig}>
                <View style={styles.titleBoxText}>
                  <MPText style={styles.title}>{item.name}</MPText>
                  <MPText style={styles.textTime}>
                    {item.time}
                  </MPText>
                </View>
                <MPText style={styles.text}>
                  {item.title}
                </MPText>
              </View>
            </TouchableHighlight>
          }
        </View>
      </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(211, 211, 211, 0.5)'
  },
  boxIcon: {
    flex: 0.15,
    alignItems: 'flex-start'
  },
  boxText: {
    flex: 0.85
  },
  boxTextBig: {
    flex: 1
  },
  titleBoxText:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  title: {
    fontFamily: 'montSerratMedium',
    color: '#000000',
    fontSize: 16
  },
  text: {
    color: '#9B9B9B',
    fontFamily: 'probaProRegular',
    fontSize: 16
  },
  textTime: {
    color: '#4A4A4A',
    fontFamily: 'montSerratSemiBold',
    fontSize: 11,
    alignSelf: 'flex-end'
  },
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPMessageList = connect(mapStateToProps)(MPMessageListComponent);
export { MPMessageList };