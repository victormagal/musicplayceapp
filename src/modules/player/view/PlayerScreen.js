import React from 'react';
import {LinearGradient} from 'expo';
import {
  Text, View, StyleSheet, TouchableOpacity, FlatList, ScrollView
} from 'react-native';
import {
  MPHeader, MPText, MPGradientButton, MPIconButton, MPCircleGradientButton,
  MPSongRating, MPGradientBorderButton
} from '../../../components';
import {
  MPStarIcon,
  MPPlayIcon,
  MPSongListIcon,
  MPHeartIcon,
  MPArrowDownIcon,
  MPBalloonTalkIcon,
  MPDetailPauseIcon
} from '../../../assets/svg';
import images from '../../../assets/img';


class PlayerScreen extends React.Component {

  state = {
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
    ]
  };

  handleBack = () => {
    this.props.navigation.pop();
  };

  renderItem = ({item, index}) => {
    let style = null;

    if(index == 0){
      style = styles.songCardFirst;
    }

    return <MPSongRating style={style} songName={item.songName} indicateSong={true} imagePath={item.imagePath} onPress={() => {
    }}/>
  };

  render() {
    return (
      <View style={styles.container}>

        <MPHeader back={true} onBack={this.handleBack} />

        <ScrollView>
          <LinearGradient
            colors={['#000000', '#fcfcfc']}
            start={[0, 0]}
            end={[0, 1]}>

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
                <MPPlayIcon />
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
                                icon={MPSongListIcon} iconStyle={styles.iconButton} titleStyle={styles.iconButtonText}/>

                  <MPIconButton title="SALVAR" icon={MPHeartIcon} style={styles.iconButtonContainer}
                                iconStyle={styles.iconButton} titleStyle={styles.iconButtonText}/>
                </View>

                <View style={styles.totalIndicationsContainer}>
                  <MPGradientButton title="INDICAR"/>
                  <MPText style={styles.totalIndications}>200 indicações</MPText>
                </View>
              </View>
            </View>
          </LinearGradient>

          <View style={[styles.seeLyricsContainer, styles.row]}>
            <View style={[styles.row, styles.alignCenter]}>
              <MPStarIcon />
              <MPText style={styles.seeLyricsText}>ACOMPANHA A LETRA</MPText>
            </View>
            <MPArrowDownIcon style={styles.alignCenter}/>
          </View>

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

          <View>
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

        <View style={{height: 70, backgroundColor: '#fff', width: '100%', position: 'absolute', bottom: 0}}>
          <MPDetailPauseIcon />
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
  musicContent: {
    paddingHorizontal: 20,
    marginTop: 17
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
  musicTitleText: {
    marginLeft: 20,
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
  songCardFirst: {
    paddingLeft: 20
  }
});


export {PlayerScreen};
