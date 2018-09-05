import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import { MPText, MPUnblockProfile } from '../../components';
import { connect } from 'react-redux';
import {MPBlockedProfileIcon} from '../../assets/svg';

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
      <TouchableHighlight onPress={ item.avatar ? this.onPress.bind(this, item.rota) : this.unblockProfile.bind(this)} underlayColor="transparent">
        <View style={styles.item}>
          <View style={styles.boxIcon}>
          {
            item.avatar ? (
              <Image source={require('../../../assets/images/avatar-big.png')} />
            ) : (
              <MPBlockedProfileIcon/>
          )}
          </View>
          <View style={styles.boxText}>
            <View style={styles.titleBoxText}>
              <MPText style={styles.title}>{item.name}</MPText>
              <MPText style={styles.textTime}>
                {item.time}
              </MPText>
            </View>
            <MPText style={styles.text} numberOfLines={2}>
              {item.title}
            </MPText>
          </View>
          {
            !item.avatar && (
              <View style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: '#FFFFFFDD'}}></View>
            )
          }
        </View>
      </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(211, 211, 211, 0.5)'
  },
  boxIcon: {
    marginVertical: 12,
    marginStart: 20,
    marginEnd: 10,
    flex: 0.15,
    alignItems: 'flex-start'
  },
  boxText: {
    marginVertical: 12,
    marginEnd: 20,
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
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    fontSize: 16
  },
  text: {
    color: '#9B9B9B',
    fontFamily: 'ProbaPro-Regular',
    fontSize: 16
  },
  textTime: {
    color: '#4A4A4A',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    alignSelf: 'flex-end'
  },
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPMessageList = connect(mapStateToProps)(MPMessageListComponent);
export { MPMessageList };
