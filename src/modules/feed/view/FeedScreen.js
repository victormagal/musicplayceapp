import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {MPHeader, MPTextField, MPFooter, MPTabBar, MPText, MPFeedNotification, MPArtistFull} from '../../../components'
import {connect} from 'react-redux';


class FeedScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
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

  renderItem = ({item}) => (
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
            <MPText style={{marginHorizontal: 20, marginBottom: 16}}>Talvez você goste dessas músicas:</MPText>
            <MPArtistFull style={{backgroundColor: '#fff'}} songName={'Nome da música'} backgroundColor={'#f60'}/>
          </View>
          <View style={styles.secondSliderContainer}>
            <FlatList data = {this.artistList.data}
                      keyExtractor={(item,index) => item.id} 
                      renderItem={this.renderItem} />
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
});

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const FeedScreen = connect(mapStateToProps)(FeedScreenContainer);
export {FeedScreen};
