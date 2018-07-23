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
  MPHeader,
  MPTabBar,
  MPText,
  MPTextField,
  MPIconButton
} from '../../../components'
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';
import images from '../../../assets/img';
import {MPSearchRedIcon, MPCloseFilledRedIcon} from '../../../assets/svg';


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

  handleNavigateMusic = () => {
    this.props.navigation.navigate('player');
  };

  handleNavigateArtistProfile = (artistId) => {
    this.props.navigation.navigate('artistProfile', { artistId });
  };

  handleSearchChange = (value) => {
    this.setState({textValue: value});

    if(value.length >= 3){
      this.checkArtistName(value);
    }
  };

  handleClearClick = () => {
    this.setState({textValue: ''});
  };

  handleChangeTab = (index) => {
    this.setState({tabIndex: index});
  };

  renderItemTopArtists = ({item}) => (
    <MPArtist artist={item.artistName} imagePath={item.imagePath} onPress={()=>{}} isFollowing={false}/>
  );

  renderItemFeed = ({item}) => (
    <MPFeedNotification notificationType={item.type} artistName={item.artistName} composerName={item.composerName}
                        songName={item.songName} timeText={item.timeText}/>
  );

  checkArtistName = (value) => {
    this.setState({textValue: value});
    if (value == 'amorenanssoas') {
      this.setState({searchingNotFound: true});
    } else if (value != '') {
      this.setState({searching: true, searchingNotFound: false});
    } else if (value == '') {
      this.setState({searching: false, searchingNotFound: false})
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MPHeader inverse={true}/>
        <View style={styles.content}>
          <MPTextField label='Pesquise pelo nome, músicas e temas' value={this.state.textValue} onChangeText={this.handleSearchChange}/>
          {this.state.textValue.length < 3 && <MPSearchRedIcon style={styles.searchIcon} />}
          {this.state.textValue.length >= 3 && (
            <MPIconButton style={styles.searchIcon} icon={MPCloseFilledRedIcon} onPress={this.handleClearClick}/>
          )}
        </View>

        {
          this.state.searching == true && this.state.searchingNotFound == false && (
            <ScrollView style={{flex: 2, backgroundColor: '#FCFCFC',}}>
              <MPText style={ styles.searchTitle }>Resultados para <MPText
                style={ styles.searchTitleEmph}>"{ this.state.textValue }"</MPText></MPText>
              <View style={styles.topArtistsContainer}>
                <MPText style={ styles.searchArtistRollText}>Artistas com o nome <MPText
                  style={ styles.searchArtistRollTextEmph}>"{this.state.textValue}"</MPText></MPText>
                <FlatList
                  data={this.topArtists.data}
                  keyExtractor={(item) => item.id}
                  renderItem={this.renderItemTopArtists}
                  horizontal={true}
                />
              </View>
              <MPText style={{
                marginHorizontal: 20,
                marginBottom: 16,
                fontSize: 20,
                fontFamily: 'ProbaPro-Regular',
                color: '#000',
              }}>Músicas relacionadas a busca <MPText
                style={{color: '#5994db'}}>{ this.state.textValue }</MPText></MPText>
              <MPArtistFull artistName={'Adelle'} songName={'Nome da música'} imagePath={images.daftPunk120}
                            artistImagePath={images.adele40}
                            onPressArtist={(artistId) => this.handleNavigateArtistProfile(artistId)}
                            onPressMusic={this.handleNavigateMusic}
              />
              <MPArtistFull artistName={'Freddie'} songName={'Nome da música'} imagePath={images.bjork120}
                            artistImagePath={images.freddieMercury40}
                            onPressArtist={(artistId) => this.handleNavigateArtistProfile(artistId)}
                            onPressMusic={this.handleNavigateMusic}
              />
              <MPArtistFull artistName={'Bjork'} songName={'Nome da música'} imagePath={images.daftPunk120}
                            artistImagePath={images.freddieMercury40}
                            onPressArtist={(artistId) => this.handleNavigateArtistProfile(artistId)}
                            onPressMusic={this.handleNavigateMusic}
              />
            </ScrollView>
          )
        }
        {
          this.state.searchingNotFound == true && (
            <View style={{flex: 1, backgroundColor: '#FCFCFC',}}>
              <MPText style={ styles.searchTitle }>Sem resultados para <MPText
                style={ styles.searchTitleEmph}>"{ this.state.textValue }"</MPText></MPText>
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
            <View style={styles.tabContainer}>
              <MPTabBar
                titles={['PARA VOCÊ','SEGUINDO']} onTabChange={this.handleChangeTab}
                index={this.state.tabIndex}/>
              <Swiper
                showsPagination={false}
                loop={false}
                index={this.state.tabIndex}
                onIndexChanged={this.handleChangeTab}>

                <View style={styles.firstSliderContainer}>
                  <ScrollView style={{flex: 2,}}>
                    <MPText style={{
                    fontFamily: 'ProbaPro-Regular',
                    fontSize: 20,
                    marginHorizontal: 20,
                    marginBottom: 16,
                    marginTop: 20
                  }}>Talvez você goste dessas músicas:</MPText>
                    <MPArtistFull artistName={'Adelle'} songName={'Nome da música'} imagePath={images.bjork120}
                                  artistImagePath={images.adele40}
                                  onPressArtist={(artistId) => this.handleNavigateArtistProfile(artistId)}
                                  onPressMusic={this.handleNavigateMusic} />
                    <MPArtistFull artistName={'Freddie'} songName={'Nome da música'} imagePath={images.daftPunk120}
                                  artistImagePath={images.freddieMercury40}
                                  onPressArtist={(artistId) => this.handleNavigateArtistProfile(artistId)}
                                  onPressMusic={this.handleNavigateMusic} />
                    <MPArtistFull artistName={'Bjork'} songName={'Nome da música'} imagePath={images.bjork120}
                                  artistImagePath={images.adele40}
                                  onPressArtist={(artistId) => this.handleNavigateArtistProfile(artistId)}
                                  onPressMusic={this.handleNavigateMusic} />
                    <View style={styles.topArtistsContainer}>
                      <MPText style={{fontSize: 20, fontFamily: 'ProbaPro-Regular', marginBottom: 16, color: '#000'}}>Artistas
                      em alta</MPText>
                      <FlatList
                        data={this.topArtists.data}
                        keyExtractor={(item) => item.id}
                        renderItem={this.renderItemTopArtists}
                        horizontal={true}
                      />
                    </View>
                    <MPArtistFull artistName={'Adelle'} songName={'Nome da música'} imagePath={images.daftPunk120}
                                  artistImagePath={images.freddieMercury40}
                                  onPressArtist={(artistId) => this.handleNavigateArtistProfile(artistId)}
                                  onPressMusic={this.handleNavigateMusic}
                    />
                    <MPArtistFull artistName={'Freddie'} songName={'Nome da música'} imagePath={images.daftPunk120}
                                  artistImagePath={images.adele40}
                                  onPressArtist={(artistId) => this.handleNavigateArtistProfile(artistId)}
                                  onPressMusic={this.handleNavigateMusic}
                    />
                    <MPArtistFull artistName={'Bjork'} songName={'Nome da música'} imagePath={images.bjork120}
                                  artistImagePath={images.adele40}
                                  onPressArtist={(artistId) => this.handleNavigateArtistProfile(artistId)}
                                  onPressMusic={this.handleNavigateMusic}
                    />
                  </ScrollView>
                </View>
                <View style={styles.secondSliderContainer}>
                  <ScrollView style={{flex: 2,}}>
                    <FlatList
                      data={this.artistList.data}
                      keyExtractor={(item) => item.id}
                      renderItem={this.renderItemFeed}
                    />
                  </ScrollView>
                </View>
              </Swiper>
            </View>
          )
        }

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
  content: {
    marginTop: 0,
    marginHorizontal: 20
  },
  firstSliderContainer: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  secondSliderContainer: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  topArtistsContainer: {
    backgroundColor: '#f3f3f3',
    padding: 20,
    marginBottom: 20,
  },
  searchTitle: {
    fontSize: 14,
    marginHorizontal: 20,
    marginVertical: 20,
    fontFamily: 'Montserrat-Italic',
    color: '#000',
  },
  searchTitleEmph: {
    fontFamily: 'Montserrat-BoldItalic',
    color: '#5994db'
  },
  searchNotFoundTextTitle: {
    fontSize: 20,
    fontFamily: 'ProbaPro-Regular',
    color: '#000',
    marginStart: 20,
    marginBottom: 20
  },
  searchNotFoundText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    textDecorationLine: 'underline',
    color: '#5994db',
    marginBottom: 20,
    marginStart: 40,
  },
  searchArtistRollText: {
    fontSize: 20,
    fontFamily: 'ProbaPro-Regular',
    marginBottom: 16,
    color: '#000'
  },
  searchArtistRollTextEmph: {
    color: '#5994db'
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    bottom: 15
  },
  tabContainer: {
    flex: 1,
    marginTop: 20
  }
});

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const FeedScreen = connect(mapStateToProps)(FeedScreenContainer);
export {FeedScreen};
