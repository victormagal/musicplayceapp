import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { MPText } from '../general/MPText';
import { MPValidatedRedIcon } from '../../assets/svg';
import LinearGradient from 'react-native-linear-gradient';

class MPPlayerComment extends Component{
  state = {
    longComment: false,
    showLongComment: false,
  }

  constructor(props){
    super(props);
  }

  handleToggleShowLong = () => {
    this.setState({showLongComment: !this.state.showLongComment});
  }

  componentDidMount(){
    let {comment} = this.props;
    if(comment){
      this.setState({longComment : (comment && comment.text.length > 180) ? true : false});
    }
  }

  render() {
    const { style, comment } = this.props;
    let image = comment.data.picture_url ? {uri: comment.data.picture_url} : require('../../assets/img/avatar-male.jpg');

    let linearColorOptions = [['#FFFFFF33', '#FFFFFFE6'], ['transparent', 'transparent']];
    let linearColor = !this.state.showLongComment ? linearColorOptions[0] : linearColorOptions[1];
    let showMoreText = !this.state.showLongComment ? 'Mostrar' : 'Esconder';

    return (
      <View style={style}>
        <View style={styles.container}>
          <Image
            source={image}
            style={styles.avatar}
          />
          <View style={styles.commentContainer}>
            <View style={styles.titleContainer}>
              <MPText>
                {comment ? comment.data.name : null}
              </MPText>
              <MPValidatedRedIcon style={styles.validatedIcon}/>
            </View>
            <MPText style={styles.timeText}>
              HÁ {comment ? comment.time : null }
            </MPText>
            {
              this.state.longComment && (
                <View>
                  <MPText style={styles.comment}>
                    {comment && !this.state.showLongComment ? comment.text.substring(0,180).concat('...') : comment.text }
                  </MPText>
                  <LinearGradient
                    colors={linearColor}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y:1}}
                    style={{position:'absolute', width: '100%', bottom: 0, height: '40%'}}
                    selected={true}>
                    {
                      !this.state.showLongComment && <MPText style={[styles.commentLike, {position: 'absolute', bottom: 0, textDecorationLine: 'underline', fontFamily: 'MontSerrat-Medium'}]} onPress={this.handleToggleShowLong}>Mostrar</MPText>
                    }
                  </LinearGradient>
                  {
                    this.state.showLongComment && <MPText style={[styles.commentLike, {textDecorationLine: 'underline', fontFamily: 'MontSerrat-Medium'}]} onPress={this.handleToggleShowLong}>Esconder</MPText>
                  }
                </View>
              )
            }
            {
              !this.state.longComment && (
                <MPText style={styles.comment}>
                  {comment ? comment.text : null }
                </MPText>
              )
            }
            <MPText style={styles.commentLike} onPress={comment ? () => this.props.onLikeComment(comment.id) : null}>
              {comment && comment.liked ? 'Descurtir' : 'Curtir' }
              <MPText style={styles.countCommentLike}>({comment ? comment.likesCount : null})</MPText>
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
    padding: 20,
    backgroundColor: '#ffffff',
    flex: 1
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
  titleContainer: {
    flexDirection: 'row'
  },
  validatedIcon: {
    marginLeft: 5,
    marginTop: 2
  },
  commentContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  userText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#e13223'
  },
  timeText: {
    fontFamily: 'ProbaPro-Regular',
    fontSize: 10,
    color: '#4a4a4a'
  },
  comment: {
    fontFamily: 'ProbaPro-Regular',
    fontSize: 15,
    paddingTop: 10,
    color: '#686868'
  },
  commentLike: {
    paddingTop: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#5994db'
  },
  countCommentLike: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 11,
    color: '#686868'
  }
});

export {MPPlayerComment};

