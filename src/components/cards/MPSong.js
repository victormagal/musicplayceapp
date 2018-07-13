import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {MPText} from '../general';
import {MPPlayBlackIcon} from '../../assets/svg';

class MPSong extends Component {

  render() {
    let {songName, composers, onPress, style} = this.props;

    return (
      <TouchableOpacity style={[styles.parent, style]}>
        <View>
          <View>
            <View style={ styles.songHeaderContainer }>
              <MPPlayBlackIcon style={ styles.songHeaderIcon}/>
              <MPText style={ styles.songHeaderText}>Tocando em Frente</MPText>
            </View>
            <MPText style={ styles.songCardTitle}>COMPOSITORES</MPText>
            <MPText>
              <MPText style={ styles.songCardArtist}>Almir Sater</MPText> e <MPText style={ styles.songCardArtist}>Zé da Clave</MPText>
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
    fontFamily: 'montSerrat',
    color: '#000',
  },
  songHeaderIcon: {
    marginEnd: 14,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  songCardTitle: {
    fontSize: 10,
    fontFamily: 'montSerrat',
    color: '#919191',
    letterSpacing: 1
  },
  songCardText: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'montSerratMedium',
  },
  songCardArtist: {
    textDecorationLine: 'underline',
    color: '#000'
  }
});

export {MPSong};
