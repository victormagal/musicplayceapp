import React from 'react';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {Slider} from 'react-native-elements'
import PropTypes from 'prop-types';
import {
  Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image,
  TouchableWithoutFeedback, Modal
} from 'react-native';
import {
  MPHeader, MPText, MPIconButton, MPButton
} from '../../../components';
import {
  songPlay, songPause, songResume
} from '../../../state/action';
import {
  MPStarIcon,
  MPAddGrayIcon,
  MPPlayerPlayRedIcon,
  MPPlayerNextRedIcon,
  MPPlayerPreviousRedIcon,
  MPPlayerHeartIcon,
  MPSongRedIcon,
  MPTriangleUpBlackIcon,
  MPSongListBlackIcon
} from '../../../assets/svg';


class ModalPlayerComponent extends React.Component {

  togglePlayer = () => {
    if(this.props.player.inProgress){
      this.props.dispatch(this.props.player.isPlaying ? songPause() : songResume());
    } else{
      this.props.dispatch(songPlay());
    }
  };

  renderCloseIcon(){
    let {onCloseClick} = this.props;
    return [
      <MPIconButton key={1} icon={MPAddGrayIcon} onPress={onCloseClick}/>
    ];
  }

  renderPlayer() {
    return (
      <View style={styles.playerContainer}>
        <Slider style={styles.playerSlider} thumbStyle={styles.playerThumb}
                minimumTrackTintColor='#e13223' maximumTrackTintColor='#808080'/>

        <View style={styles.modalPlayerMusicTextContainer}>
          <MPText style={styles.playerModalMusicText}>0:36</MPText>
          <MPText style={styles.playerModalMusicText}>5:46</MPText>
        </View>

        <View style={styles.modalPlayerButtonContainer}>
          <View style={styles.row}>
            <MPIconButton style={styles.modalPlayerButtons}
                          icon={MPPlayerPreviousRedIcon}/>

            <MPIconButton style={styles.modalPlayerButton}
                          icon={MPPlayerPlayRedIcon}
                          onPress={this.togglePlayer}/>

            <MPIconButton style={styles.modalPlayerButtons} icon={MPPlayerNextRedIcon}/>
          </View>
          <MPIconButton style={styles.modalPlayerAddPlaylist} icon={MPSongListBlackIcon}/>
        </View>


        <View style={styles.divider}/>

        <TouchableWithoutFeedback
          onPress={this.props.onLyricsClick}>
          <View style={[styles.seeLyricsContainer, styles.row]}>
            <View style={[styles.row, styles.alignCenter]}>
              <MPSongRedIcon />
              <MPText style={styles.seeLyricsText}>ACOMPANHA A LETRA</MPText>
            </View>
            <MPTriangleUpBlackIcon style={styles.alignCenter}/>
          </View>
        </TouchableWithoutFeedback>

      </View>
    );
  }


  render() {
    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}
        onRequestClose={() => {
        }}>

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
                <MPStarIcon />
                <MPStarIcon />
                <MPStarIcon />
                <MPStarIcon />
                <MPStarIcon />
              </View>
              <MPText style={styles.modalGradeText}>4.0</MPText>
            </View>
          </View>

          <MPText style={[styles.musicTitleText, styles.modalMusicTitleText]}>Tocando em Frente</MPText>

          <MPText style={[styles.compositorTitle, styles.alignCenter]}>COMPOSITOR</MPText>
          <MPText style={[styles.compositorText, styles.modalCompositorText]}>Almir Sater</MPText>

          <MPText style={[styles.compositorTitle, styles.alignCenter]}>INTÉRPRETE</MPText>
          <MPText style={[styles.compositorText, styles.modalCompositorText]}>Santiago Silva</MPText>

          <View style={[styles.row, styles.tagContainer, styles.modalTagContainer]}>
            <View style={[styles.row, styles.modalTagContent]}>
              <MPText style={styles.tagText}>#coraçãopartido</MPText>
              <MPText style={styles.tagText}>#descobertas</MPText>
              <MPText style={styles.tagText}>#paquera</MPText>
              <MPText style={styles.tagText}>#balada</MPText>
              <MPText style={styles.tagText}>#amor</MPText>
            </View>
          </View>

          <TouchableOpacity style={[styles.playerHeart, styles.modalPlayerHeart]}
                            onPress={this.props.onSongSaveClick}>
            <MPPlayerHeartIcon />
          </TouchableOpacity>

          <MPButton title="INDICAR" style={styles.playerIndicate} textStyle={styles.playerIndicateText}/>
          <MPText style={[styles.totalIndications, styles.modalTotalIndications]}>200 indicações</MPText>

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
    fontSize: 12,
    color: '#000'
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
    width: 80,
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
  onSongSaveClick: PropTypes.func.isRequired
};

const mapStateToProps = ({playerReducer}) => {
  return {...playerReducer}
};

const ModalPlayer = connect(mapStateToProps)(ModalPlayerComponent);
export {ModalPlayer};
