import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';
import {
  MPSongListIcon, MPPlayIcon, MPSongMenuIcon, MPSongIndicateIcon,
  MPSongIndicateFullIcon, MPAddSongWhiteNoteIcon
} from '../../assets/svg';
import images from '../../assets/img';
import {MPText} from '../general';
import {MPShowRating} from '../profile';


class MPSongRating extends Component {
  state = {
    menuOpen: false,
    isAdded: this.props.isAdded,
  };

  toggleState = () => {
    this.setState({menuOpen: !this.state.menuOpen});
  };

  toggleAdded = () => {
    this.setState({isAdded: !this.state.isAdded})
  };

  renderTopIcons() {
    if (this.state.isAdded) {
      return (
        <TouchableOpacity style={styles.menuIcon} onPress={this.toggleState}>
          <MPSongMenuIcon/>
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity style={ styles.addSongIcon } onPress={this.toggleAdded}>
        <MPSongListIcon/>
      </TouchableOpacity>
    );
  }

  render() {
    let {song, style, isAdded, indicateSong, indications, isNew, rating, isDraft, onExclude, onUnpublish} = this.props;

    return (
      <View style={style || {}}>
        {
          this.state.menuOpen == false ? (
              <View style={styles.simpleArtistCardContainer}>
                <View>
                  <View style={ styles.simpleArtistCardImage }>
                    <Image source={ images.daftPunk100 }/>

                    <TouchableOpacity style={styles.playIcon} onPress={this.toggleState}>
                      <MPPlayIcon />
                    </TouchableOpacity>
                    { this.renderTopIcons() }
                    {!song.published_at && (
                      <View style={ styles.draftContainer}>
                        <MPText style={ styles.draftText}>RASCUNHO</MPText>
                      </View>
                    )}
                  </View>
                </View>
                <View>
                  <MPText style={ styles.simpleArtistCardText }
                          onPress={this.toggleState.bind(this)}>{ song.name }</MPText>
                  <MPShowRating rating={rating}/>
                </View>
                {
                  indicateSong && indications == null && isNew == null && (
                    <TouchableOpacity style={ styles.indicateSongContainer } onPress={() => this.props.onIndicateClick(song)}>
                      <MPSongIndicateIcon />
                      <MPText style={styles.indicateSongText}>INDIQUE</MPText>
                    </TouchableOpacity>
                  )
                }
                {
                  indications != null && isNew == null && (
                    <View style={styles.indicateSongContainer}>
                      <MPSongIndicateFullIcon />
                      <MPText style={styles.indicateSongText}>{ indications } INDICAÇÕES</MPText>
                    </View>
                  )
                }
                {
                  isNew && (
                    <View style={ styles.newSongContainer}>
                      <MPAddSongWhiteNoteIcon style={{alignSelf: 'center'}}/>
                      <MPText style={ styles.newSongText}>NOVIDADE</MPText>
                    </View>
                  )
                }
              </View>
            ) : (
              <View style={ styles.menuContainer }>
                <MPText style={ styles.menuCloseText} onPress={this.toggleState.bind(this)}>X</MPText>
                <MPText style={ styles.menuText }>EDITAR</MPText>
                <View style={ styles.menuSeparator }/>
                <MPText style={ styles.menuText } onPress={onUnpublish}>DESPUBLICAR</MPText>
                <View style={ styles.menuSeparator }/>
                <MPText style={ styles.menuText } onPress={onExclude}>EXCLUIR</MPText>
              </View>
            )
        }
      </View>
    );
  }
}

MPSongRating.propTypes = {
  song: PropTypes.object.isRequired,
  onIndicateClick: PropTypes.any,
  style: PropTypes.any
};

const styles = StyleSheet.create({
  simpleArtistCardContainer: {
    width: 100,
    marginBottom: 5,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 4,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  simpleArtistCardImage: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: '#f60',
    overflow: 'hidden',
  },
  simpleArtistCardText: {
    height: 40,
    fontSize: 14,
    color: '#000',
    paddingTop: 10,
    paddingStart: 10,
    paddingEnd: 10,
    fontFamily: 'ProbaPro-Regular',
    flexWrap: 'wrap',
  },
  indicateSongContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 16
  },
  indicateSongText: {
    fontSize: 9,
    fontFamily: 'Montserrat-Medium',
    color: '#000',
    marginStart: 5
  },
  newSongContainer: {
    backgroundColor: '#e13223',
    borderRadius: 8,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  newSongText: {
    fontSize: 10,
    fontFamily: 'Montserrat-Medium',
    color: '#FFF',
  },
  menuContainer: {
    width: 100,
    backgroundColor: '#000',
    paddingVertical: 35,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  menuText: {
    fontSize: 11,
    fontFamily: 'Montserrat-Medium',
    color: '#FFF',
    textAlign: 'center'
  },
  menuSeparator: {
    width: 20,
    height: 1,
    backgroundColor: '#FFF',
    marginVertical: 20,
    alignSelf: 'center'
  },
  menuCloseText: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontSize: 13,
    color: '#FFF',
    fontFamily: 'Montserrat-Bold',
  },
  draftContainer: {
    position: 'absolute',
    bottom: 11,
    alignSelf: 'center',
    backgroundColor: '#e13223',
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 25,
    paddingVertical: 2,
    paddingHorizontal: 7,
  },
  draftText: {
    color: '#FFF',
    fontSize: 10,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium'
  },
  menuIconContainer: {
    backgroundColor: '#f60',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 30
  },
  menuIcon: {
    position: 'absolute',
    top: 8,
    right: 8
  },
  addSongIcon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  playIcon: {
    position: 'absolute',
    alignSelf: 'center'
  }

});

export {MPSongRating};
