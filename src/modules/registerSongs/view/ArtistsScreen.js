import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {MPHeader, MPInput, MPText, MPIconButton, MPLoading, MPArtistHorizontal} from '../../../components';
import {updateSongRegisterData, fetchArtists} from '../../../state/action';
import {MPSearchRedIcon, MPCloseFilledRedIcon} from '../../../assets/svg';

class ArtistsScreenContainer extends React.Component {

  debounceTimer = null;

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      waiting: false,
      artists: [],
      artistsSelected: [],
      artistsSelectedTemp: {}
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.artists){
      this.setState({artists: nextProps.artists.data, waiting: false});
    }
  }

  componentWillUnmount(){
    if(this.debounceTimer !== null){
      clearTimeout(this.debounceTimer);
    }
  }

  handleSearchChange = ({value}) => {
    this.setState({search: value, waiting: true});
    this.handleSearch(value);

    if(value.length === 0){
      this.setState({artistsSelected: Object.values(this.state.artistsSelectedTemp)});
    }

    if(value.length < 3){
      this.setState({artists: []});
    }
  };

  handleSearch = (value) => {
    if(this.debounceTimer !== null){
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      if(value.length >= 3) {
        this.props.dispatch(fetchArtists(value));
      }
    }, 700);
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSaveClick = () => {
    let {artistsSelectedTemp} = this.state;
    let selecteds = Object.values(artistsSelectedTemp);

    if(selecteds.length > 0){
      let song = {...this.props.song};

      song.coAuthors = selecteds;
      this.props.dispatch(updateSongRegisterData(song));
      this.handleBackClick();
    }

    //TODO: must choose one to save
  };

  handleClearClick = () => {
    this.setState({artists: [], search: ''});
  };

  handleArtistClick = (index) => {
    let newState = {...this.state};
    let artist = newState.artists[index];
    newState.artists[index].selected = !artist.selected;

    if(artist.selected){
      newState.artistsSelectedTemp[artist.id] = artist;
    }else{
      delete newState.artistsSelectedTemp[artist.id];
    }

    this.setState(newState);
  };

  handleArtistSelectedClick = (index, id) => {
    let newState = {...this.state};
    newState.artistsSelected[index].selected = !newState.artistsSelected[index].selected;
    delete newState.artistsSelectedTemp[id];
    this.setState(newState);
  };

  renderHeaderMenuSave() {
    return [
      <MPIconButton title="Salvar" titleStyle={styles.headerMenuText} onPress={this.handleSaveClick}/>
    ];
  }

  render() {
    let hasSelected = Object.keys(this.state.artistsSelectedTemp).length > 0;

    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title="Co-autores" icons={this.renderHeaderMenuSave()}/>

        <ScrollView style={styles.content}>
          {this.state.artistsSelected.length > 0 && (
            <View style={styles.contentArtists}>
              {this.state.artistsSelected.map((item, index) =>
                <MPArtistHorizontal key={index} artist={item.name} selected={item.selected}
                                    image={item.picture_url} onPress={this.handleArtistSelectedClick.bind(this, index, item.id)}/>
              )}
            </View>
          )}

          <View style={styles.contentSearch}>
            <MPText style={styles.textTop}>Essa música tem outros autores?</MPText>
            <View>
              <MPInput label='Pesquise pelo nome:' value={this.state.search} onChangeText={this.handleSearchChange}/>
              {this.state.search.length < 3 && <MPSearchRedIcon style={styles.searchIcon} />}
              {this.state.search.length >= 3 && (
                <MPIconButton style={styles.searchIcon} icon={MPCloseFilledRedIcon} onPress={this.handleClearClick}/>
              )}
            </View>

            {this.state.search.length >= 3 && this.state.artists.length === 0 && !this.props.loading && !this.state.waiting && (
              <View>
                <MPText style={ styles.textInputSubTextHeader}>Não encontrou o co-autor?</MPText>
                <MPText style={ styles.textInputSubTextSuggestion}>Convide-o para se juntar ao MusicPlayce.</MPText>
                <MPInput label='E-mail' />
              </View>
            )}

            {!this.state.search && !hasSelected && (
              <TouchableOpacity style={styles.clickableTextContainer} onPress={this.handleBackClick}>
                <MPText style={styles.clickableText}>Não, apenas eu</MPText>
              </TouchableOpacity>
            )}
          </View>

          {this.state.search.length >= 3 && this.state.artists.length > 0 && !this.props.loading && (
            <View style={styles.contentArtists}>
              {this.state.artists.map((item, index) =>
                <MPArtistHorizontal key={index} artist={item.name} selected={!!item.selected}
                                    image={item.picture_url} onPress={this.handleArtistClick.bind(this, index)} />
              )}
            </View>
          )}
        </ScrollView>
        <MPLoading visible={this.props.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC'
  },
  content: {
    flex: 1
  },
  contentSearch: {
    marginHorizontal: 40,
    marginTop: 30
  },
  contentArtists: {
    marginTop: 30,
    paddingHorizontal: 10
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    fontFamily: 'ProbaPro-Regular'
  },
  clickableTextContainer: {
    alignItems: 'center',
  },
  clickableText: {
    borderBottomWidth: 1,
    borderColor: '#5994db',
    textAlign: 'center',
    color: '#5994db',
    fontSize: 14,
    marginTop: 152,
    fontFamily: 'Montserrat-Regular'
  },
  headerMenuText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#fff'
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    bottom: 15
  },
  textInputSubTextHeader: {
    color: '#686868',
    fontSize: 12,
    fontFamily: 'montSerratBoldItalic'
  },
  textInputSubTextSuggestion: {
    fontSize: 12,
    color: '#686868',
    fontFamily: 'montSerratItalic'
  }
});
const mapStateToProps = ({artistReducer, songsReducer}) => {
  return {...artistReducer, song: songsReducer.song};
};

const ArtistsScreen = connect(mapStateToProps)(ArtistsScreenContainer);
export {ArtistsScreen};
