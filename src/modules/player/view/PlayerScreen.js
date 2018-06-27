import React from 'react';
import {LinearGradient} from 'expo';
import {Slider} from 'react-native-elements'
import {
  Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image,
  TouchableWithoutFeedback
} from 'react-native';
import {
  MPHeader, MPText, MPGradientButton, MPIconButton, MPCircleGradientButton,
  MPSongRating, MPGradientBorderButton, MPButton, MPPlayerComment, MPFade
} from '../../../components';
import {
  MPStarIcon,
  MPPlayIcon,
  MPSongListIcon,
  MPHeartIcon,
  MPArrowDownIcon,
  MPBalloonTalkIcon,
  MPDetailPauseIcon,
  MPDetailHeartIcon,
  MPDetailPlayIcon,
  MPCommentWhiteIcon,
  MPShareWhiteIcon,
  MPCloseIcon
} from '../../../assets/svg';
import images from '../../../assets/img';


class PlayerScreen extends React.Component {

  state = {
    showPlayer: true,
    showComments: false,
    showLyrics: false,
    data: [
      {
        id: '00',
        songName: 'Michel Teló',
        imagePath: images.daftPunk100,
      },
      {
        id: '01',
        songName: 'Paula Fernandes',
        imagePath: images.bjork100,
      },
      {
        id: '02',
        songName: 'Almir Sater',
        imagePath: images.daftPunk100,
      }
    ],
    comments: [
      {}, {}, {}
    ]
  };

  handleBack = () => {
    this.props.navigation.pop();
  };

  handleToggleComments = (visible) => {
    this.setState({showComments: visible})
  };

  handleToggleLyrics = (visible) => {
    this.setState({showLyrics: visible})
  };

  renderComment = () => {
    return (
      <MPPlayerComment />
    );
  };

  renderCommentContent() {
    return (
      <MPFade style={styles.modalContent} visible={this.state.showComments}>
        <View>
          <View style={styles.coverCommentContainer}>
            <Image
              source={require('../../../assets/img/fernandinho-cover.jpeg')}
              style={styles.coverImage}/>

            <LinearGradient
              style={styles.linearGradient}
              colors={['#000000', '#000000D9']}
              start={[0, 0.9]}
              end={[0, 0]}>
            </LinearGradient>

            <View style={[styles.commentMusicContent, styles.row]}>
              <MPPlayIcon style={styles.musicPlayIcon}/>
              <MPText style={styles.musicTitleText}>Tocando em Frente</MPText>
            </View>

          </View>

          <View>
            <View style={[styles.leaveCommentContainer]}>
              <MPText style={styles.leaveCommentText}>DEIXE SEU COMENTÁRIO</MPText>
            </View>
            <View style={styles.divider}/>

            <View style={{position: 'absolute', top: -20, right: 20}}>
              <MPCircleGradientButton icon={MPCloseIcon} onPress={this.handleToggleComments.bind(this, false)}/>
            </View>
          </View>

          <FlatList
            data={this.state.comments}
            keyExtractor={(item) => item.id}
            renderItem={this.renderComment}/>
        </View>
      </MPFade>
    );
  }

  renderMain() {
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.coverContainer}>
          <Image
            source={require('../../../assets/img/fernandinho-cover.jpeg')}
            style={styles.coverImage}/>

          <LinearGradient
            style={styles.linearGradient}
            colors={['#000000', '#000000D9']}
            start={[0, 0.9]}
            end={[0, 0]}>
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

            <MPText style={styles.timeTotalText}>5m32s</MPText>

            <View style={styles.row}>
              <MPPlayIcon style={styles.musicPlayIcon}/>
              <MPText style={styles.musicTitleText}>Tocando em Frente</MPText>
            </View>

            <MPText style={styles.musicUploadDate}>10/05/2018 às 13:49</MPText>
            <MPText style={styles.musicMessage}>Escute esta música de tal tal jeito.</MPText>

            <MPText style={styles.compositorTitle}>COMPOSITOR</MPText>
            <MPText style={styles.compositorText}>Almir Sater</MPText>

            <MPText style={styles.compositorTitle}>INTÉRPRETE</MPText>
            <MPText style={styles.compositorText}>Santiago Silva</MPText>

            <View style={[styles.row, styles.indicationContainer]}>
              <View style={styles.row}>
                <MPIconButton title="ADICIONAR À FILA" style={styles.iconButtonContainer}
                              icon={MPSongListIcon} iconStyle={styles.iconButton}
                              titleStyle={styles.iconButtonText}/>

                <MPIconButton title="SALVAR" icon={MPHeartIcon} style={styles.iconButtonContainer}
                              iconStyle={styles.iconButton} titleStyle={styles.iconButtonText}/>
              </View>

              <View style={styles.totalIndicationsContainer}>
                <MPGradientButton title="INDICAR"/>
                <MPText style={styles.totalIndications}>200 indicações</MPText>
              </View>
            </View>
          </View>
        </View>

        <TouchableWithoutFeedback
          onPress={this.handleToggleLyrics.bind(this, true)}>
          <View style={[styles.seeLyricsContainer, styles.row]}>
            <View style={[styles.row, styles.alignCenter]}>
              <MPStarIcon />
              <MPText style={styles.seeLyricsText}>ACOMPANHA A LETRA</MPText>
            </View>
            <MPArrowDownIcon style={styles.alignCenter}/>
          </View>
        </TouchableWithoutFeedback>

        <View style={[styles.row, styles.tagContainer]}>
          <View style={[styles.row, styles.tagContent]}>
            <MPText style={styles.tagText}>#coraçãopartido</MPText>
            <MPText style={styles.tagText}>#descobertas</MPText>
            <MPText style={styles.tagText}>#paquera</MPText>
            <MPText style={styles.tagText}>#balada</MPText>
            <MPText style={styles.tagText}>#amor</MPText>
          </View>
          <MPCircleGradientButton icon={MPBalloonTalkIcon}/>
        </View>

        <View>
          <View style={[styles.sectionHeader, styles.row]}>
            <MPText style={styles.sectionTitle}>Outras de Almir Sater</MPText>
            <MPGradientBorderButton />
          </View>
          <FlatList
            data={this.state.data}
            keyExtractor={(item) => item.id}
            renderItem={this.renderItem}
            horizontal={true}/>
        </View>

        <View>
          <View style={[styles.sectionHeader, styles.row]}>
            <MPText style={styles.sectionTitle}>Outras de Zé da Clave</MPText>
            <MPGradientBorderButton />
          </View>
          <FlatList
            data={this.state.data}
            keyExtractor={(item) => item.id}
            renderItem={this.renderItem}
            horizontal={true}/>
        </View>

        <View style={styles.lastSectionMargin}>
          <View style={[styles.sectionHeader, styles.row]}>
            <MPText style={styles.sectionTitle}>Outras de Santiago Silva</MPText>
            <MPGradientBorderButton />
          </View>
          <FlatList
            data={this.state.data}
            keyExtractor={(item) => item.id}
            renderItem={this.renderItem}
            horizontal={true}/>
        </View>
      </ScrollView>
    );
  }

  renderItem = ({item, index}) => {
    let style = null;

    if (index == 0) {
      style = styles.songCardFirst;
    }

    return <MPSongRating style={style} songName={item.songName} indicateSong={true} imagePath={item.imagePath}
                         onPress={() => {
                         }}/>
  };

  renderHeaderMenu() {
    return [
      <MPIconButton title="200" titleStyle={styles.headerMenuText} icon={MPCommentWhiteIcon}
                    style={styles.headerMenuItem}
                    onPress={this.handleToggleComments.bind(this, true)}/>,
      <MPIconButton title="600" titleStyle={styles.headerMenuText} icon={MPShareWhiteIcon}/>
    ];
  }

  render() {
    return (
      <View style={styles.container}>

        <MPHeader back={true} onBack={this.handleBack} icons={this.renderHeaderMenu()}/>
        {this.renderMain()}
        {this.renderCommentContent()}

        <View style={styles.player}>
          <Slider style={styles.playerSlider} thumbStyle={styles.playerThumb}
                  minimumTrackTintColor='#e13223' maximumTrackTintColor='#808080'/>

          <View style={styles.playerContent}>
            <TouchableOpacity style={styles.playerPlayIcon}>
              <MPIconButton icon={MPDetailPlayIcon} iconSelected={MPDetailPauseIcon}/>
            </TouchableOpacity>

            <View style={styles.playerInfo}>
              <MPText style={styles.playerSongName}>Tocando em frente</MPText>
              <MPText style={styles.playerArtistName}>Almir Sater</MPText>
            </View>

            <TouchableOpacity style={styles.playerHeart}>
              <MPDetailHeartIcon />
            </TouchableOpacity>

            <MPButton title="INDICAR" style={styles.playerIndicate} textStyle={styles.playerIndicateText}/>
          </View>
        </View>

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
  scrollView: {
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
    fontFamily: 'montSerratBold',
    fontSize: 12,
    color: '#fff'
  },
  timeTotalText: {
    paddingVertical: 10,
    fontFamily: 'montSerratBold',
    fontSize: 10,
    color: '#fff'
  },
  musicPlayIcon: {
    marginTop: 8
  },
  musicTitleText: {
    marginLeft: 10,
    fontFamily: 'montSerrat',
    fontSize: 24,
    color: '#fff'
  },
  musicUploadDate: {
    paddingVertical: 10,
    fontFamily: 'montSerratMedium',
    fontSize: 10,
    fontWeight: '500',
    color: '#fff'
  },
  musicMessage: {
    fontFamily: 'montSerratMedium',
    fontSize: 15,
    fontWeight: '500',
    color: '#fff'
  },
  compositorTitle: {
    marginTop: 15,
    fontFamily: 'montSerrat',
    fontSize: 10,
    color: '#919191'
  },
  compositorText: {
    fontFamily: 'montSerratMedium',
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
    fontFamily: 'montSerratMedium',
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
    fontFamily: 'montSerratMedium',
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
    fontFamily: 'montSerratMedium',
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
    fontFamily: 'montSerrat',
    fontSize: 14,
    textDecorationLine: 'underline',
    color: '#5994db',
    paddingRight: 10
  },
  sectionTitle: {
    flex: 1,
    fontFamily: 'montSerratMedium',
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
    fontFamily: 'montSerratMedium',
    fontSize: 10
  },
  playerSongName: {
    fontFamily: 'montSerrat',
    fontSize: 14
  },
  playerArtistName: {
    fontFamily: 'montSerratBold',
    fontSize: 10,
    color: '#ff0000'
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
    fontFamily: 'probaProRegular',
    fontSize: 12,
    color: '#fff',
    paddingTop: 5
  },
  modalContent: {
    flex: 1
  }
});


export {PlayerScreen};
