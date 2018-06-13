import React from 'react';
import {
  FlatList,
  ScrollView, 
  StyleSheet, 
  View,
} from 'react-native';
import {
  MPArtist,
  MPArtistFull, 
  MPFeedNotification, 
  MPFooter, 
  MPHeader, 
  MPTabBar, 
  MPText, 
  MPTextField 
} from '../../../components'
import { connect } from 'react-redux';
import images from '../../../assets/img';


class FeedScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      textValue: '',
      searching: false,
      searchingNotFound: false,
    }

    this.topArtists = {
      data: [
        {
          id: '00',
          artistName: 'Michel Teló',
          imagePath: images.daftPunk100,
          backgroundColor: '#f60'
        },
        {
          id: '01',
          artistName: 'Paula Fernandes',
          imagePath: images.bjork100,
          backgroundColor: '#0f6'
        },
        {
          id: '02',
          artistName: 'Almir Sater',
          imagePath: images.daftPunk100,
          backgroundColor: '#f06'
        },
        {
          id: '03',
          artistName: 'Michel Teló',
          imagePath: images.bjork100,
          backgroundColor: '#06f'
        }
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
          type: '1'
        },
        {
          id: '01',
          artistName: 'Vitor e leo',
          composerName: 'Rick Joe',
          songName: 'Música Xis',
          timeText: '15m',
          type: '2'
        },
        {
          id: '02',
          artistName: 'Peter Jener',
          composerName: 'Rick Joe',
          songName: 'Música Xis',
          timeText: '59m',
          type: '3'
        },
        {
          id: '03',
          artistName: 'Ivete Sangalo',
          composerName: 'Rick Joe',
          songName: 'Camaro Amarelo',
          timeText: '2h',
          type: '4'
        },
        {
          id: '04',
          artistName: 'Vitor e leo',
          composerName: 'Rick Joe',
          songName: 'Camaro Amarelo',
          timeText: '1d',
          type: '5'
        }
      ]
    }
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  renderItemTopArtists = ({item}) => (
    <MPArtist artist={item.artistName} imagePath={item.imagePath}/>
  )

  renderItemFeed = ({item}) => (
    <MPFeedNotification notificationType={item.type} artistName={item.artistName} composerName={item.composerName} songName={item.songName} timeText={item.timeText}/>
  )

  checkArtistName = (value) => {
    this.setState({textValue: value});
    if(value == 'amorenanssoas'){
      this.setState({searchingNotFound: true});
    }else if (value != ''){
      this.setState({searching: true, searchingNotFound: false});
    }else if ( value == ''){
      this.setState({searching: false, searchingNotFound: false})
    } 
  }

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={""}/>
        <MPTextField 
          value={this.state.textValue}
          label={'Pesquise pelo nome, músicas e temas'} 
          style={{backgroundColor: '#FFF', marginHorizontal: 20}}
          onChangeText={this.checkArtistName}
        />
        {
          this.state.searching == true && this.state.searchingNotFound == false && (
            <ScrollView style={{flex: 2, backgroundColor: '#FCFCFC',}}>
              <MPText style={ styles.searchTitle }>Resultados para <MPText style={ styles.searchTitleEmph}>"{ this.state.textValue }"</MPText></MPText>
              <View style={styles.topArtistsContainer}>
                <MPText style={ styles.searchArtistRollText}>Artistas com o nome <MPText style={ styles.searchArtistRollTextEmph}>"{this.state.textValue}"</MPText></MPText>
                <FlatList 
                  data = {this.topArtists.data}
                  keyExtractor={(item) => item.id} 
                  renderItem={this.renderItemTopArtists}
                  horizontal={true}
                />
              </View>
              <MPText style={{marginHorizontal: 20, marginBottom: 16, fontSize: 20, fontFamily: 'probaProRegular', color: '#000', }}>Músicas relacionadas a busca <MPText style={{color: '#5994db'}}>{ this.state.textValue }</MPText></MPText>
              <MPArtistFull artistName={'Adelle'} songName={'Nome da música'} imagePath={images.daftPunk120}/>
              <MPArtistFull artistName={'Freddie'} songName={'Nome da música'} imagePath={images.bjork120}/>
              <MPArtistFull artistName={'Bjork'} songName={'Nome da música'} imagePath={images.daftPunk120}/>
            </ScrollView>
          )
        }
        {
          this.state.searchingNotFound == true && (
            <View style={{flex: 1, backgroundColor: '#FCFCFC',}}>
              <MPText style={ styles.searchTitle }>Sem resultados para <MPText style={ styles.searchTitleEmph}>"{ this.state.textValue }"</MPText></MPText>
              <MPText style={ styles.searchNotFoundTextTitle }>Idéias que podem ajudar na sua busca</MPText>
              <MPText style={ styles.searchNotFoundText }>Amor</MPText>
              <MPText style={ styles.searchNotFoundText }>Morena</MPText>
              <MPText style={ styles.searchNotFoundText }>Pessoas</MPText>
              <MPText style={ styles.searchNotFoundText }>Sertanejo</MPText>
              <MPText style={ styles.searchNotFoundText }>Rock</MPText>
              <MPText style={ styles.searchNotFoundText }>MPB</MPText>
            </View>
          )
        }
        {
          this.state.searching == false && (
            <MPTabBar firstTabTitle={'PARA VOCÊ'} secondTabTitle={"SEGUINDO"}>
              <View style={styles.firstSliderContainer}>
                <ScrollView style={{flex: 2,}}>
                  <MPText style={{ fontFamily: 'probaProRegular', fontSize: 20,marginHorizontal: 20, marginBottom: 16, marginTop: 20}}>Talvez você goste dessas músicas:</MPText>
                  <MPArtistFull artistName={'Adelle'} songName={'Nome da música'} imagePath={images.bjork120}/>
                  <MPArtistFull artistName={'Freddie'} songName={'Nome da música'} imagePath={images.daftPunk120}/>
                  <MPArtistFull artistName={'Bjork'} songName={'Nome da música'} imagePath={images.bjork120}/>
                  <View style={styles.topArtistsContainer}>
                    <MPText style={{fontSize: 20, fontFamily: 'probaProRegular', marginBottom: 16, color: '#000'}}>Artistas em alta</MPText>
                    <FlatList 
                      data = {this.topArtists.data}
                      keyExtractor={(item) => item.id} 
                      renderItem={this.renderItemTopArtists}
                      horizontal={true}
                    />
                  </View>
                  <MPArtistFull artistName={'Adelle'} songName={'Nome da música'} imagePath={images.daftPunk120}/>
                  <MPArtistFull artistName={'Freddie'} songName={'Nome da música'} imagePath={images.daftPunk120}/>
                  <MPArtistFull artistName={'Bjork'} songName={'Nome da música'} imagePath={images.bjork120}/>
                </ScrollView>
              </View>
              <View style={styles.secondSliderContainer}>
                <ScrollView style={{flex: 2,}}>
                  <FlatList 
                    data = {this.artistList.data}
                    keyExtractor={(item) => item.id} 
                    renderItem={this.renderItemFeed} 
                  />
                </ScrollView>
              </View>
            </MPTabBar>
          )
        }
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
  },
  searchTitle:{
    fontSize:14,
    marginHorizontal: 20,
    marginVertical: 20,
    fontFamily: 'montSerratItalic',
    color: '#000',
  },
  searchTitleEmph:{
    fontFamily: 'montSerratBoldItalic',
    color: '#5994db'
  },
  searchNotFoundTextTitle: {
    fontSize: 20, 
    fontFamily: 'probaProRegular', 
    color: '#000', 
    marginStart: 20, 
    marginBottom: 20
  },
  searchNotFoundText: {
    fontSize: 16, 
    fontFamily: 'montSerrat', 
    textDecorationLine: 'underline', 
    color: '#5994db', 
    marginBottom: 20, 
    marginStart: 40,
  },
  searchArtistRollText: {
    fontSize: 20, 
    fontFamily: 'probaProRegular', 
    marginBottom: 16, 
    color: '#000'
  },
  searchArtistRollTextEmph: {
    color: '#5994db'
  }
});

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const FeedScreen = connect(mapStateToProps)(FeedScreenContainer);
export {FeedScreen};
