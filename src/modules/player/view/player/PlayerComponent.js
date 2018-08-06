import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Slider} from 'react-native-elements'
import {
  Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image,
  TouchableWithoutFeedback, Modal
} from 'react-native';
import {
  MPHeader, MPText, MPGradientButton, MPIconButton, MPCircleGradientButton,
  MPSongRating, MPGradientBorderButton, MPButton, MPPlayerComment, MPFade
} from '../../../../components';
import {ModalPlayer} from '../ModalPlayer';
import {
  MPStarIcon,
  MPPlayIcon,
  MPSongListIcon,
  MPHeartIcon,
  MPBalloonTalkIcon,
  MPDetailPauseIcon,
  MPDetailHeartIcon,
  MPDetailPlayIcon,
  MPCommentWhiteIcon,
  MPShareWhiteIcon,
  MPCloseIcon,
  MPSongIcon,
  MPTriangleUpIcon,
  MPTriangleUpGrayIcon
} from '../../../../assets/svg';
import images from '../../../../assets/img';


class PlayerComponent extends React.Component {
  state = {
    showPlayer: true,
    showComments: false,
    showLyrics: false,
    playerVisible: false,
    data: [],
    lyric: []
  };

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleToggleComments = (visible) => {
    this.setState({showComments: visible, showLyrics: false, showPlayer: !visible})
  };

  handleToggleLyrics = (visible) => {
    this.setState({showLyrics: visible, showComments: false, showPlayer: !visible})
  };

  handleTogglePlayer = (visible) => {
    this.setState({playerVisible: visible});
  };

  handleEnableLyricsPlayer = () => {
    this.setState({playerVisible: false, showLyrics: true, showComments: false, showPlayer: false});
  };

  handleIndicateSong = (song) => {
    this.setState({playerVisible: false});
    this.props.navigation.navigate('IndicateSongFullScreen', {song});
  };

  handleSongDate = (songDate) => {
    let date = songDate.split(" ")[0].split('-').reverse().join('/');
    let time = songDate.split(" ")[1].slice(0, 5);
    return `${date} às ${time}`;
  }

  handleSaveSong = (song) => {
    this.setState({playerVisible: false});
    this.props.navigation.navigate('playerSaveSong', {song});
  };

  renderComposers = (song) => {
    let composerString = ''; //TODO: // song.artist.name;
    let composers = [];

    if(song.coAuthors && song.coAuthors.length > 0){
      let coAuthors = song.coAuthors;
      composers = composers.concat(coAuthors.map((coAuthor, index) => coAuthor.name));
    }

    composers = composers.join(', ');
    if(composers) {
    }

    return composers;
  };

  handleSongDuration = (songDuration) => {
    let songArray = songDuration.split(':');
    let hours = Number.parseInt(songArray[0]);
    let minutes = Number.parseInt(songArray[1]);
    let seconds = Number.parseInt(songArray[2]);
    let songDurationString = `${minutes}m${seconds}s`
    if(hours > 0){
      songDurationString = `${hours}h`.concat(songDurationString);
    }
    return songDurationString;
  }

  handleSongTags = (songTags) => {
    if(songTags.length > 0){
      return songTags.map((tag, index) => {
        return (<MPText key={index} style={styles.tagText}>#{tag.name}</MPText>)
      })
    }
  };

  togglePlayerPause = () => {
    if(this.props.player.inProgress){
      this.props.player.isPlaying ? this.props.onSongPause() : this.props.onSongResume();
    } else{
      this.props.onSongPlay(this.props.song);
    }
  };

  renderComment = ({item}) => {
    return (
      <MPPlayerComment comment={item} onLikeComment={this.props.onLikeComment} />
    );
  };

  renderModalPlayer = () => {
    return <ModalPlayer visible={this.state.playerVisible}
                        song={this.props.song}
                        onCloseClick={this.handleTogglePlayer.bind(this, false)}
                        onLyricsClick={this.handleEnableLyricsPlayer}
                        onSongSaveClick={this.handleSaveSong.bind(this, this.props.song)}
                        onSongIndicateClick={this.handleIndicateSong.bind(this, this.props.song)}
                        onSongSliderChange={this.props.onSongSliderChange}/>;
  };

  renderLyricsContent() {
    let {song} = this.props;
    return (
      <MPFade style={styles.modalContent} visible={this.state.showLyrics}>
        <View style={styles.flexOne}>
          <View style={styles.coverCommentContainer}>
            <Image
              source={require('../../../../assets/img/fernandinho-cover.jpeg')}
              style={styles.coverImage}/>

            <LinearGradient
              style={styles.linearGradient}
              colors={['#000000', '#000000D9']}
              start={{x: 0, y: 0.9}}
              end={{x:0, y:0}}>
            </LinearGradient>

            <View style={[styles.commentMusicContent, styles.row]}>
              <MPPlayIcon style={styles.musicPlayIcon}/>
              <MPText style={styles.musicTitleText}>{song ? song.title : 'Tocando em Frente'}</MPText>
            </View>

          </View>

          <TouchableWithoutFeedback
            onPress={this.handleToggleLyrics.bind(this, false)}>
            <View style={[styles.seeLyricsContainer, styles.row]}>
              <View style={[styles.row, styles.alignCenter]}>
                <MPSongIcon />
                <MPText style={styles.seeLyricsText}>ACOMPANHA A LETRA</MPText>
              </View>
              <MPTriangleUpIcon style={styles.alignCenter}/>
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.lyricsContent}>

            <ScrollView style={styles.flexOne}>
              <View style={styles.lyricsScrollContent}>
                {song ? (<MPText style={styles.lyricLine}>{song.lyrics}</MPText>) : null}
                {/* {this.state.lyric.map((p, index) => (
                  <View style={index === 0 ? {} : styles.lyricParagraph} key={index}>
                    {p.map((line, lineIndex) => (
                      <MPText style={styles.lyricLine} key={lineIndex}>{line}</MPText>
                    ))}
                  </View>
                ))} */}
              </View>
            </ScrollView>
            <LinearGradient style={styles.lyricsGradientTop}
                            colors={['#2b2a2a', 'rgba(65, 65, 65, 0)']}/>
            <LinearGradient style={styles.lyricsGradientBottom}
                            colors={['rgba(64, 64, 64, 0)', '#404040']}/>
          </View>
        </View>
      </MPFade>
    );
  }

  renderCommentContent() {
    let {song} = this.props;
    return (
      <MPFade style={styles.modalContent} visible={this.state.showComments}>
        <View style={{flex: 1}}>
          <View style={styles.coverCommentContainer}>
            <Image
              source={require('../../../../assets/img/fernandinho-cover.jpeg')}
              style={styles.coverImage}/>

            <LinearGradient
              style={styles.linearGradient}
              colors={['#000000', '#000000D9']}
              start={{x:0, y:0.9}}
              end={{x:0, y:0}}>
            </LinearGradient>

            <View style={[styles.commentMusicContent, styles.row]}>
              <MPPlayIcon style={styles.musicPlayIcon}/>
              <MPText style={styles.musicTitleText}>{song ? song.name : null}</MPText>
            </View>

          </View>

          <View>
            <View style={[styles.leaveCommentContainer]}>
              <MPText style={styles.leaveCommentText}>DEIXE SEU COMENTÁRIO</MPText>
            </View>
            <View style={styles.divider}/>

            <View style={styles.commentClose}>
              <MPCircleGradientButton icon={MPCloseIcon} onPress={this.handleToggleComments.bind(this, false)}/>
            </View>
          </View>

          <FlatList
            data={song ? song.comments : null}
            keyExtractor={(item) => item.id}
            renderItem={this.renderComment}/>
        </View>
      </MPFade>
    );
  }

  renderUserSongs = (songs) => {
    if (songs && songs.length > 0){
      songs.map((songList, index) => {
        return (<View>
          <View style={[styles.sectionHeader, styles.row]}>
            <MPText style={styles.sectionTitle}>Outras de {this.props.userNames[index]}</MPText>
            <MPGradientBorderButton />
          </View>
          <FlatList
            data={this.state.data}
            keyExtractor={(item) => item.id}
            renderItem={this.renderItem}
            horizontal={true}/>
        </View>)
      })
    }
  }

  renderMain() {
    let {song} = this.props;
    return (
      <MPFade style={styles.modalContent} visible={this.state.showPlayer}>
        <ScrollView style={styles.flexOne}>
          <View style={styles.coverContainer}>
            <Image
              source={require('../../../../assets/img/fernandinho-cover.jpeg')}
              style={styles.coverImage}/>

            <LinearGradient
              style={styles.linearGradient}
              colors={['#000000', '#000000D9']}
              start={{x:0, y:0.9}}
              end={{x:0, y:0}}>
            </LinearGradient>

            <View style={styles.musicContent}>

              <View style={styles.row}>
                <View style={styles.row}>
                  <MPStarIcon />
                  <MPStarIcon />
                  <MPStarIcon />
                  <MPStarIcon />
                  <MPStarIcon />
                </View>
                <MPText style={styles.gradeText}>0.0</MPText>
              </View>

              <MPText style={styles.timeTotalText}>{song ? this.handleSongDuration(song.duration) : '5m32s'}</MPText>

              <View style={styles.row}>
                <MPPlayIcon style={styles.musicPlayIcon}/>
                <MPText style={styles.musicTitleText}>{ song ? song.name : 'Tocando em Frente'}</MPText>
              </View>

              <MPText style={styles.musicUploadDate}>{song ? this.handleSongDate(song.created_at) : '10/05/2018 às 13:49'}</MPText>
              <MPText style={styles.musicMessage}>Escute esta música de tal tal jeito.</MPText>
              {/* <MPText style={styles.compositorText}>{song ? song.description : 'Escute esta música de tal tal jeito.'}</MPText> */}

              <MPText style={styles.compositorTitle}>COMPOSITOR</MPText>
              <MPText style={styles.compositorText}>{ song ? this.renderComposers(song) : 'Almir Sater'}</MPText>

              <MPText style={styles.compositorTitle}>INTÉRPRETE</MPText>
              <MPText style={styles.compositorText}>Santiago Silva</MPText>
              {/* <MPText style={styles.compositorText}>{song ? song.interpreter_name : 'Santiago Silva'}</MPText> */}

              <View style={[styles.row, styles.indicationContainer]}>
                <View style={styles.row}>
                  <MPIconButton title="ADICIONAR À FILA" style={styles.iconButtonContainer}
                                icon={MPSongListIcon} iconStyle={styles.iconButton}
                                titleStyle={styles.iconButtonText}/>

                  <MPIconButton title="SALVAR" icon={MPHeartIcon} style={styles.iconButtonContainer}
                                iconStyle={styles.iconButton} titleStyle={styles.iconButtonText}
                                onPress={this.handleSaveSong.bind(this, song)}/>
                </View>

                <View style={styles.totalIndicationsContainer}>
                  <MPGradientButton title="INDICAR" onPress={this.handleIndicateSong.bind(this, song)}/>
                  <MPText style={styles.totalIndications}>{song ? song.indicationsCount : null} indicações</MPText>
                </View>
              </View>
            </View>
          </View>

          <TouchableWithoutFeedback
            onPress={this.handleToggleLyrics.bind(this, true)}>
            <View style={[styles.seeLyricsContainer, styles.row]}>
              <View style={[styles.row, styles.alignCenter]}>
                <MPSongIcon />
                <MPText style={styles.seeLyricsText}>ACOMPANHA A LETRA</MPText>
              </View>
              <MPTriangleUpIcon style={styles.alignCenter}/>
            </View>
          </TouchableWithoutFeedback>

          <View style={[styles.row, styles.tagContainer]}>
            <View style={[styles.row, styles.tagContent]}>
            {
              song && song.tags && this.handleSongTags(song.tags)
            }
            </View>
            <MPCircleGradientButton icon={MPBalloonTalkIcon}/>
          </View>
          { this.props.usersSongs && this.props.usersSongs.length > 0 && (
            this.props.usersSongs.map((songList, index) => {
              return (
              <View>
                <View style={[styles.sectionHeader, styles.row]}>
                  <MPText style={styles.sectionTitle}>Outras de {this.props.userNames[index]}</MPText>
                  <MPGradientBorderButton />
                </View>
                <FlatList
                  data={songList}
                  keyExtractor={(item) => item.id}
                  renderItem={this.renderItem}
                  horizontal={true}/>
              </View>)
            })
          )}
        </ScrollView>
      </MPFade>
    );
  }

  renderItem = ({item, index}) => {
    let style = null;

    if (index == 0) {
      style = styles.songCardFirst;
    }

    return <MPSongRating key={index} style={style} song={item} indicateSong={true} imagePath={item.picture_url}
                         onPress={() => {
                         }}/>
  };

  renderHeaderMenu() {
    let {song} = this.props;
    return [
      <MPIconButton key={1} title={song ? song.comments.length : null} titleStyle={styles.headerMenuText} icon={MPCommentWhiteIcon}
                    style={styles.headerMenuItem}
                    onPress={this.handleToggleComments.bind(this, true)}/>,
      <MPIconButton  key={2} title="600" titleStyle={styles.headerMenuText} icon={MPShareWhiteIcon}/>
    ];
  }

  renderDetailPlayer() {
    let {song} = this.props;
    const progress = Math.ceil(this.props.player.progress);

    return (
      <View style={styles.player}>
        <Slider style={styles.playerSlider} thumbStyle={styles.playerThumb}
                minimumTrackTintColor='#e13223' maximumTrackTintColor='#808080'
                minimumValue={0} maximumValue={111} onValueChange={this.props.onSongSliderChange}
                value={progress}/>

        <TouchableOpacity style={styles.playerContent}
                          onPress={this.handleTogglePlayer.bind(this, true)}>
          <TouchableOpacity style={styles.playerPlayIcon}>
            <MPIconButton icon={MPDetailPlayIcon} iconSelected={MPDetailPauseIcon}
                          selected={this.props.player.isPlaying}
                          onPress={this.togglePlayerPause}/>
          </TouchableOpacity>

          <View style={styles.playerInfo}>
            <MPText style={styles.playerSongName}>{song ? song.name : 'Tocando em Frente'}</MPText>
            <MPText style={styles.playerUserName}>{song ? this.renderComposers(song) : 'Almir Sater'}</MPText>
          </View>

          <TouchableOpacity style={styles.playerHeart} onPress={this.handleSaveSong.bind(this,song)}>
            <MPDetailHeartIcon />
          </TouchableOpacity>

          <MPButton title="INDICAR" style={styles.playerIndicate} textStyle={styles.playerIndicateText}
                    onPress={this.handleIndicateSong.bind(this, song)}/>

          <MPTriangleUpGrayIcon style={styles.playerUp}/>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <MPHeader back={true} onBack={this.handleBack} icons={this.renderHeaderMenu()}/>

        {this.renderMain()}
        {this.renderCommentContent()}
        {this.renderLyricsContent()}
        {this.renderDetailPlayer()}
        {this.renderModalPlayer()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc'
  },
  divider: {
    backgroundColor: '#f1f1f1',
    height: 2
  },
  flexOne: {
    flex: 1
  },
  coverContainer: {
    height: 330
  },
  coverImage: {
    width: '100%',
    height: 330
  },
  coverCommentContainer: {
    height: 120,
    overflow: 'hidden'
  },
  linearGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  musicContent: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 17
  },
  commentMusicContent: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 20,
    bottom: 20
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
  timeTotalText: {
    paddingVertical: 10,
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
    color: '#fff'
  },
  musicPlayIcon: {
    marginTop: 8
  },
  musicTitleText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-Regular',
    fontSize: 24,
    color: '#fff'
  },
  musicUploadDate: {
    paddingVertical: 10,
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    fontWeight: '500',
    color: '#fff'
  },
  musicMessage: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    fontWeight: '500',
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
  iconButtonContainer: {
    width: 65
  },
  iconButton: {
    width: 22,
    height: 20,
    alignSelf: 'center'
  },
  iconButtonText: {
    fontSize: 10,
    paddingTop: 5
  },
  indicationContainer: {
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30
  },
  totalIndicationsContainer: {
    width: 102
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
    backgroundColor: '#404040'
  },
  seeLyricsText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
    paddingLeft: 10
  },
  leaveCommentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff'
  },
  leaveCommentText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    fontWeight: '500',
    color: '#393939'
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
  sectionTitle: {
    flex: 1,
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10
  },
  lastSectionMargin: {
    marginBottom: 40
  },
  songCardFirst: {
    paddingLeft: 20
  },
  player: {
    backgroundColor: '#fff',
    width: '100%',
    height: 70
  },
  playerContent: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    height: 70
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
  playerSongName: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14
  },
  playerUserName: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
    color: '#ff0000'
  },
  playerUp: {
    marginLeft: 8,
    alignSelf: 'center'
  },
  playerHeart: {
    marginRight: 8,
    alignSelf: 'center'
  },
  playerInfo: {
    alignSelf: 'center',
    paddingLeft: 16,
    flex: 1
  },
  playerSlider: {
    position: 'absolute',
    bottom: 50,
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
  headerMenuItem: {
    marginRight: 20
  },
  headerMenuText: {
    fontFamily: 'ProbaPro-Regular',
    fontSize: 12,
    color: '#fff',
    paddingTop: 5
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff'
  },
  commentClose: {
    position: 'absolute',
    top: -20,
    right: 20
  },
  lyricParagraph: {
    marginTop: 20
  },
  lyricLine: {
    fontFamily: 'Montserrat-Light',
    paddingLeft: 20,
    fontSize: 16,
    lineHeight: 25,
    color: '#fff'
  },
  lyricsScrollContent: {
    paddingVertical: 20
  },
  lyricsContent: {
    backgroundColor: '#404040',
    flex: 1
  },
  lyricsGradientTop: {
    height: 43,
    width: '100%',
    position: 'absolute',
    top: 0
  },
  lyricsGradientBottom: {
    height: 43,
    width: '100%',
    position: 'absolute',
    bottom: 0
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
  modalCompositorText :{
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
    paddingHorizontal: 9,
    paddingTop: 11
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
    borderRadius: 32,
    width: 64,
    height: 64,
    justifyContent: 'center'
  }
});


export {PlayerComponent};
