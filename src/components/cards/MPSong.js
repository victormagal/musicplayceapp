import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {MPText} from '../general';
import {MPPlayBlackIcon} from '../../assets/svg';

class MPSong extends Component {

  handleSongComposers = (song) => {
    // TODO: handle songs without composers
    let composerString = song.artist.name;
    if(song.coAuthors && song.coAuthors.length > 0){
      let coAuthors = song.coAuthors;
      coAuthors.map((coAuthor, index, array) => {
        if(index == array.length - 1){
          composerString = composerString.concat(` e ${coAuthor.name}`);
        }else{
          composerString = composerString.concat(`, ${coAuthor.name}`);
        }
      })
    }
    return composerString;
  }

  render() {
    let {song, style} = this.props;
    let multipleComposers = (song.coAuthors && song.coAuthors.length > 0) ? true : false;

    return (
      <TouchableOpacity style={[styles.parent, style]}>
        <View>
          <View>
            <View style={ styles.songHeaderContainer }>
              <MPPlayBlackIcon style={ styles.songHeaderIcon}/>
              <MPText style={ styles.songHeaderText}>{song ? song.name : 'Tocando em Frente'}</MPText>
            </View>
            <MPText style={ styles.songCardTitle}>{ multipleComposers ?  'COMPOSITORES' : 'COMPOSITOR'}</MPText>
            <MPText>
              <MPText style={ styles.songCardUser}>{song ? this.handleSongComposers(song): 'Almir Sater'}</MPText>
            </MPText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

MPSong.propTypes = {
  songName: PropTypes.string,
  composers: PropTypes.array,
  onPress: PropTypes.func,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderRadius: 4,
  },
  songHeaderContainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    marginBottom: 20,
  },
  songHeaderText: {
    fontSize: 24,
    fontFamily: 'Montserrat-Regular',
    color: '#000',
  },
  songHeaderIcon: {
    marginEnd: 14,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  songCardTitle: {
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
    color: '#919191',
    letterSpacing: 1
  },
  songCardText: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'Montserrat-Medium',
  },
  songCardUser: {
    textDecorationLine: 'underline',
    color: '#000'
  }
});

export {MPSong};
