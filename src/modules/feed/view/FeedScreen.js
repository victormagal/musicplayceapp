import React from 'react';
import {StyleSheet, ScrollView, View, FlatList} from 'react-native';
import {MPHeader, MPTextField, MPFooter, MPTabBar, MPText, MPFeedNotification, MPArtistFull, MPArtist} from '../../../components'
import {connect} from 'react-redux';


class FeedScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    }

    this.topArtists = {
      data: [
          {
              id: '00',
              artistName: 'Michel Teló',
              backgroundColor: '#f60',
          },
          {
            id: '01',
            artistName: 'Paula Fernandes',
            backgroundColor: '#0f6',
          },
          {
                id: '02',
                artistName: 'Almir Sater',
                backgroundColor: '#f06',
            },
            {
              id: '03',
              artistName: 'Michel Teló',
              backgroundColor: '#06f',
          },
      ]
    }

    this.artistList = {
      data: [
          {
              id: '00',
              artistName: 'Vitor e leo',
              composerName: 'Rick Joe',
              songName: 'Música Xis',
              timeText: '1m',
              type: '1',
          },
          {
            id: '01',
            artistName: 'Vitor e leo',
            composerName: 'Rick Joe',
            songName: 'Música Xis',
            timeText: '15m',
            type: '2',
        },
        {
          id: '02',
          artistName: 'Peter Jener',
          composerName: 'Rick Joe',
          songName: 'Música Xis',
          timeText: '59m',
          type: '3',
        },
        {
          id: '03',
          artistName: 'Ivete Sangalo',
          composerName: 'Rick Joe',
          songName: 'Camaro Amarelo',
          timeText: '2h',
          type: '4',
        },
        {
          id: '04',
          artistName: 'Vitor e leo',
          composerName: 'Rick Joe',
          songName: 'Camaro Amarelo',
          timeText: '1d',
          type: '5',
        },
      ]
    }
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  renderItemTopArtists = ({item}) => (
    <MPArtist artist={item.artistName} backgroundColor={item.backgroundColor} />
  )

  renderItemFeed = ({item}) => (
    <MPFeedNotification notificationType={item.type} artistName={item.artistName} composerName={item.composerName} songName={item.songName} timeText={item.timeText}/>
  )

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={""}/>
        <MPTextField label={'Pesquise pelo nome, músicas e temas'} value={''}
                     style={{backgroundColor: '#FFF', marginHorizontal: 20}}/>
        <MPTabBar firstTabTitle={'PARA VOCÊ'} secondTabTitle={"SEGUINDO"}>
          <View style={styles.firstSliderContainer}>
            <ScrollView>
              <MPText style={{ fontFamily: 'probaProRegular', fontSize: 20,marginHorizontal: 20, marginBottom: 16, marginTop: 20}}>Talvez você goste dessas músicas:</MPText>
              <MPArtistFull artistName={'Adelle'} songName={'Nome da música'} backgroundColor={'#f60'}/>
              <MPArtistFull artistName={'Freddie'} songName={'Nome da música'} backgroundColor={'#06f'}/>
              <MPArtistFull artistName={'Bjork'} songName={'Nome da música'} backgroundColor={'#0f6'}/>
              <View style={styles.topArtistsContainer}>
                <MPText style={{fontSize: 20, fontFamily: 'probaProRegular', marginBottom: 16, color: '#000'}}>Artistas em alta</MPText>
                <FlatList data = {this.topArtists.data}
                          keyExtractor={(item,index) => item.id} 
                          renderItem={this.renderItemTopArtists}
                          horizontal={true}
                          />
              </View>
              <MPArtistFull artistName={'Adelle'} songName={'Nome da música'} backgroundColor={'#f60'}/>
              <MPArtistFull artistName={'Freddie'} songName={'Nome da música'} backgroundColor={'#06f'}/>
              <MPArtistFull artistName={'Bjork'} songName={'Nome da música'} backgroundColor={'#0f6'}/>
            </ScrollView>
          </View>
          <View style={styles.secondSliderContainer}>
            <ScrollView style={{flex: 2,}}>
              <FlatList data = {this.artistList.data}
                        keyExtractor={(item,index) => item.id} 
                        renderItem={this.renderItemFeed} />
            </ScrollView>
          </View>
        </MPTabBar>
        <MPFooter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FFF',
  },
  firstSliderContainer: {
    flex:1,
    backgroundColor: '#FCFCFC',
  },
  secondSliderContainer: {
    flex:1,
    backgroundColor: '#FCFCFC',
  },
  topArtistsContainer: {
    backgroundColor: '#f3f3f3',
    padding: 20,
    marginBottom: 20,
  }
});

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const FeedScreen = connect(mapStateToProps)(FeedScreenContainer);
export {FeedScreen};
