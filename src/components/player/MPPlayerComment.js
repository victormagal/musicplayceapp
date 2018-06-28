import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';
import {MPText} from '../general/MPText';
import {MPValidatedRedIcon} from '../../assets/svg';


class MPPlayerComment extends Component{

  render() {
    let {style} = this.props;

    return (
      <View style={style}>
        <View style={styles.container}>

          <Image
            source={require('../../assets/img/david-burn-60.png')}
            style={styles.avatar}/>

          <View style={styles.commentContainer}>
            <MPText style={styles.artistText}>David Burn <MPValidatedRedIcon /></MPText>
            <MPText style={styles.timeText}>HÁ 3 HORAS</MPText>
            <MPText style={styles.comment}>
              Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem pretium metus.
            </MPText>
            <MPText style={styles.commentLike}>
              Curtir
              <MPText style={styles.countCommentLike}>(10)</MPText>
            </MPText>
          </View>
        </View>

        <View style={styles.divider}/>
      </View>
    )
  }
}

MPPlayerComment.propTypes = {
  style: PropTypes.any
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f1f1'
  },
  commentContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  artistText: {
    fontFamily: 'montSerratBold',
    fontSize: 16,
    color: '#e13223'
  },
  timeText: {
    fontFamily: 'probaProRegular',
    fontSize: 10,
    color: '#4a4a4a'
  },
  comment: {
    fontFamily: 'probaProRegular',
    fontSize: 15,
    paddingTop: 10,
    color: '#686868'
  },
  commentLike: {
    paddingTop: 10,
    fontFamily: 'montSerrat',
    fontSize: 14,
    color: '#5994db'
  },
  countCommentLike: {
    fontFamily: 'montSerrat',
    fontSize: 11,
    color: '#686868'
  }
});

export {MPPlayerComment};

