import React from 'react';
import {
  Image,
  StyleSheet,
  View
} from 'react-native';
import { MPText } from '../../components';
import { connect } from 'react-redux';

class MPNotificationListComponent extends React.Component {

  render() {
    let { item } = this.props;
    return (
      <View>
        <View style={styles.item}>
          {
            item.avatar ? (
              <View style={styles.boxIcon}>
                <Image source={require('../../../assets/images/avatar.png')} />
              </View>
            ) : null
          }
          {
            item.avatar ? (
              <View style={styles.boxText}>
                <MPText style={styles.text}>
                  {item.title}
                </MPText>
              </View>
            ) : 
            <View style={styles.boxTextBig}>
              <MPText style={styles.text}>
                {item.title}
              </MPText>
            </View>
          }
          <View style={styles.boxFoward}>
            <MPText style={styles.textTime}>
              {item.time}
            </MPText>
          </View>
        </View>
      </View>
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
    flex: 0.1,
    alignItems: 'flex-start'
  },
  boxText: {
    flex: 0.7
  },
  boxTextBig: {
    flex: 0.8
  },
  text: {
    color: '#9B9B9B',
    fontFamily: 'ProbaPro-Regular',
    fontSize: 16
  },
  boxFoward: {
    flex: 0.2,
    alignItems: 'flex-end'
  },
  textTime: {
    color: '#4A4A4A',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11
  },
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPNotificationList = connect(mapStateToProps)(MPNotificationListComponent);
export { MPNotificationList };
