import React from 'react';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {Slider} from 'react-native-elements'
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image,
  TouchableWithoutFeedback, Modal, BackHandler
} from 'react-native';
import {
  MPHeader, MPText, MPIconButton, MPButton
} from '../../../components';
import {
  songPlay, songPause, songResume, rateSong
} from '../../../state/action';
import {
  MPStarIcon,
  MPAddGrayIcon,
  MPPlayerPlayRedIcon,
  MPPlayerPauseRedIcon,
  MPPlayerNextRedIcon,
  MPPlayerPreviousRedIcon,
  MPPlayerHeartIcon,
  MPSongRedIcon,
  MPTriangleUpBlackIcon,
  MPSongListBlackIcon,
  MPFilledStarIcon,
  MPHeartRedIcon
} from '../../../assets/svg';

const Icon = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    {props.filled ? (
      <MPFilledStarIcon style={{width: 25, height: 25}}/>
    ):(
      <MPStarIcon style={{width: 25, height: 25}} />
    )}
  </TouchableOpacity>
);

const stars = new Array(5).fill();

class ModalPlayerComponent extends React.Component {

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.pop();
    });
  }

  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    if(this.props.onBack) {
      this.props.onBack();
    }
  };

  togglePlayer = () => {
    if(this.props.player.inProgress){
      this.props.dispatch(this.props.player.isPlaying ? songPause() : songResume());
    } else{
      this.props.dispatch(songPlay(this.props.song));
    }
  };

  renderComposers = (song) => {
    let composerString = song.artist ? song.artist.name : '';

    if(song.coAuthors && song.coAuthors.length > 0){
      let composerTempString = '';
      composerTempString = composerTempString.concat(song.coAuthors.map((coAuthor, index, array) => {
        return index == array.length - 1 ? ` e ${coAuthor.name}` : `, ${coAuthor.name}`;
      }));
      return composerString.concat(composerTempString);
    }

    return composerString;
  };


  renderTags(tags){
    return tags.map((tag, index) =>
      <MPText key={index} style={styles.tagText}>#{tag.name}</MPText>
    );
  }

  renderCloseIcon(){
    let {onCloseClick} = this.props;
    return [
      <MPIconButton key={1} icon={MPAddGrayIcon} onPress={onCloseClick}/>
    ];
  }

  renderRating = (song) => {
    if (song && song.rating){
      return parseFloat(song.rating).toFixed(1);
    }
    return "0.0";
  };

  renderPlayer() {
    const progress = Math.ceil(this.props.player.progress);
    const progressLabel = moment.utc(progress * 1000).format('m:ss');
    let durationLabel = (this.props.song && this.props.song.duration) || '00:00:00';
    durationLabel = moment(durationLabel, 'hh:mm:ss').format('m:ss');
    const duration = moment(durationLabel, 'm:ss').diff(moment().startOf('day'), 'seconds');

    return (
      <View style={styles.playerContainer}>
        <Slider style={styles.playerSlider} thumbStyle={styles.playerThumb}
                minimumTrackTintColor='#e13223' maximumTrackTintColor='#808080'
                minimumValue={0}
                maximumValue={duration} onValueChange={this.props.onSongSliderChange}
                value={progress}/>

        <View style={styles.modalPlayerMusicTextContainer}>
          <MPText style={styles.playerModalMusicText}>{progressLabel}</MPText>
          <MPText style={styles.playerModalMusicText}>{durationLabel}</MPText>
        </View>

        <View style={styles.modalPlayerButtonContainer}>
          <View style={styles.row}>
            <MPIconButton style={styles.modalPlayerButtons}
                          icon={MPPlayerPreviousRedIcon}/>

            <MPIconButton style={styles.modalPlayerButton}
                          icon={MPPlayerPlayRedIcon}
                          iconSelected={MPPlayerPauseRedIcon}
                          selected={this.props.player.isPlaying}
                          onPress={this.togglePlayer}/>

            <MPIconButton style={styles.modalPlayerButtons} icon={MPPlayerNextRedIcon}/>
          </View>
          {/* <MPIconButton style={styles.modalPlayerAddPlaylist} icon={MPSongListBlackIcon}/> */}
        </View>


        <View style={styles.divider}/>

        <TouchableWithoutFeedback
          onPress={this.props.onLyricsClick}>
          <View style={[styles.seeLyricsContainer, styles.row]}>
            <View style={[styles.row, styles.alignCenter]}>
              <MPSongRedIcon />
              <MPText style={styles.seeLyricsText}>ACOMPANHAR A LETRA</MPText>
            </View>
            <MPTriangleUpBlackIcon style={styles.alignCenter}/>
          </View>
        </TouchableWithoutFeedback>

      </View>
    );
  }

  handleRateSong = (song, rating) => {
    this.props.dispatch(rateSong(song, rating));
  };

  render() {
    let {song} = this.props;

    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}
        onRequestClose={this.handleBackPress}>

        <MPHeader icons={this.renderCloseIcon()} inverse={true} transparent={true}/>

        <View style={styles.flexOne}>

          <LinearGradient
            style={styles.linearGradient}
            colors={['#ffffff', 'rgba(255, 255, 255, 0)']}
            start={{x:0, y:0}}
            end={{x:0, y:1}}>
          </LinearGradient>

          <View style={styles.modalStarContainer}>
            <View style={styles.row}>
              <View style={styles.row}>
                {song && stars.map((_, i) => {
                    return song.rating && i < song.rating ? <Icon key={i} filled={true} onPress={this.handleRateSong.bind(this,song, i)}/> : <Icon key={i} filled={false} onPress={this.handleRateSong.bind(this, song, i)}/>;
                })}
              </View>
              <MPText style={styles.modalGradeText}>{this.renderRating(song)}</MPText>
            </View>
          </View>

          <MPText style={[styles.musicTitleText, styles.modalMusicTitleText]}>{song && song.name}</MPText>

          <MPText style={[styles.compositorTitle, styles.alignCenter]}>{song && song.coAuthors && song.coAuthors.length > 0 ? 'COMPOSITORES' : 'COMPOSITOR'}</MPText>
          <MPText style={[styles.compositorText, styles.modalCompositorText]}>{song && this.renderComposers(song)}</MPText>

          <MPText style={[styles.compositorTitle, styles.alignCenter]}>INTÉRPRETE</MPText>
          <MPText style={[styles.compositorText, styles.modalCompositorText]}>{song && song.interpreters ? song.interpreters : 'Não há intérpretes' }</MPText>

          <View style={[styles.row, styles.tagContainer, styles.modalTagContainer]}>
            <View style={[styles.row, styles.modalTagContent]}>
              {song && song.tags && this.renderTags(song.tags)}
            </View>
          </View>

          <TouchableOpacity style={[styles.playerHeart, styles.modalPlayerHeart]} onPress={this.props.onSongSaveClick}>
            {song && song.is_favorited ? <MPHeartRedIcon style={{width: 22, height: 30}}/> : <MPPlayerHeartIcon />}
          </TouchableOpacity>

          <MPButton title="INDICAR" onPress={this.props.onSongIndicateClick} style={styles.playerIndicate} textStyle={styles.playerIndicateText}/>
          <MPText style={[styles.totalIndications, styles.modalTotalIndications]}>{song ? song.indications_count : 0} indicações</MPText>

        </View>

        {this.renderPlayer()}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  linearGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  row: {
    flexDirection: 'row'
  },
  alignCenter: {
    alignSelf: 'center'
  },
  gradeText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    color: '#fff'
  },
  modalGradeText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#000',
    alignSelf: 'center',

  },
  musicTitleText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 24,
    color: '#fff'
  },
  compositorTitle: {
    marginTop: 15,
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    color: '#919191'
  },
  compositorText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
    textDecorationLine: 'underline'
  },
  totalIndications: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    color: '#fff',
    alignSelf: 'center'
  },
  seeLyricsContainer: {
    justifyContent: 'space-between',
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  seeLyricsText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '500',
    color: '#5f5f5f',
    paddingLeft: 10
  },
  tagContainer: {
    backgroundColor: '#fff',
    padding: 20
  },
  tagContent: {
    flexWrap: 'wrap',
    flex: 3
  },
  tagText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    textDecorationLine: 'underline',
    color: '#5994db',
    paddingRight: 10
  },
  playerIndicate: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    height: 24,
    borderWidth: 1,
    borderColor: '#e13223'
  },
  playerIndicateText: {
    color: '#e13223',
    fontFamily: 'Montserrat-Medium',
    fontSize: 10
  },
  playerHeart: {
    marginRight: 8,
    alignSelf: 'center'
  },
  playerContainer: {
    height: 140
  },
  playerSlider: {
    position: 'absolute',
    bottom: 135,
    width: '100%'
  },
  playerThumb: {
    width: 16,
    height: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e13223'
  },
  playerPlayIcon: {
    alignSelf: 'center',
    width: 16
  },
  playerModalMusicText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#000'
  },
  modalMusicTitleText: {
    marginTop: 20,
    marginBottom: 20,
    color: '#000',
    alignSelf: 'center'
  },
  modalStarContainer: {
    marginTop: 40,
    alignSelf: 'center'
  },
  modalCompositorText: {
    color: '#393939',
    alignSelf: 'center'
  },
  modalTagContainer: {
    paddingHorizontal: 50,
    alignSelf: 'center'
  },
  modalPlayerHeart: {
    marginBottom: 20
  },
  modalTotalIndications: {
    marginTop: 10,
    color: '#686868'
  },
  modalTagContent: {
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  modalPlayerMusicTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 9
  },
  modalPlayerButtonContainer: {
    flexDirection: 'row',
    paddingBottom: 20,
    justifyContent: 'center'
  },
  modalPlayerButtons: {
    borderWidth: 1,
    borderColor: '#f4f4f4',
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  modalPlayerButton: {
    borderWidth: 1,
    borderColor: '#f4f4f4',
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 32,
    width: 64,
    height: 64,
    justifyContent: 'center'
  },
  modalPlayerAddPlaylist: {
    position: 'absolute',
    top: 20,
    right: 36
  }
});

ModalPlayerComponent.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
  onLyricsClick: PropTypes.func.isRequired,
  onSongSaveClick: PropTypes.func.isRequired,
  onSongSliderChange: PropTypes.func
};

const mapStateToProps = ({playerReducer}) => {
  return {...playerReducer}
};

const ModalPlayer = connect(mapStateToProps)(ModalPlayerComponent);
export {ModalPlayer};
