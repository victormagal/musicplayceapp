import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {Card} from 'react-native-elements';
import PropTypes from 'prop-types';
import {
  MPSongListIcon, MPPlayIcon, MPSongMenuIcon, MPSongIndicateIcon,
  MPSongIndicateFullIcon, MPAddSongWhiteNoteIcon
} from '../../assets/svg';
import images from '../../assets/img';
import {MPText} from '../general';
import {MPShowRating} from '../profile';

class MPSongRating extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuOpen: false,
      isNew: false,
      isAdded: this.props.isAdded,
    };
  }

  toggleState = () => {
    this.setState({menuOpen: !this.state.menuOpen});
  };

  toggleAdded = () => {
    this.setState({isAdded: !this.state.isAdded})
  };

  handlePlayClick = () => {
    let {onPlayClick, song} = this.props;
    onPlayClick && onPlayClick(song);
  };

  handleClose = () => {
    this.setState({menuOpen: false});
  };

  handleEditClick = () => {
    let {onEditClick, song} = this.props;
    onEditClick(song);
    this.handleClose();
  };

  handleUnpublishClick = () => {
    let {onUnpublish, song} = this.props;
    onUnpublish(song);
    this.handleClose();
  };

  handleRemoveClick = () => {
    let {onExclude, song} = this.props;
    onExclude(song);
    this.handleClose();
  };

  renderTopIcons() {
    let {me, hideSettings} = this.props;

    if (me && !hideSettings) {
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
    const {
      song,
      style,
      indicateSong,
      indications,
      isNew
    } = this.props;

    return (
      <View style={style || {}}>

        <Card containerStyle={[styles.simpleUserCardContainer]}>
          {!this.state.menuOpen && (
            <View>
              <View>
                <View style={ styles.simpleUserCardImage }>
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={ song.picture_url ? { uri: song.picture_url } : require('../../assets/img/album-default.png')}/>

                  <TouchableOpacity style={styles.playIcon} onPress={this.handlePlayClick}>
                    <MPPlayIcon />
                  </TouchableOpacity>
                  { this.renderTopIcons() }
                  {song && !song.published_at && (
                    <View style={ styles.draftContainer}>
                      <MPText style={ styles.draftText}>RASCUNHO</MPText>
                    </View>
                  )}
                </View>
                <View>
                  <MPText style={ styles.simpleUserCardText }
                          onPress={this.toggleState.bind(this)}>{ song && song.name || '' }</MPText>
                  <MPShowRating rating={song.rating}/>
                </View>
                {
                  indicateSong && indications == null && isNew == null && (
                    <TouchableOpacity style={ styles.indicateSongContainer }
                                      onPress={() => this.props.onIndicateClick(song)}>
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
                {isNew && (
                  <View style={ styles.newSongContainer}>
                    <MPAddSongWhiteNoteIcon style={{alignSelf: 'center'}}/>
                    <MPText style={ styles.newSongText}>NOVIDADE</MPText>
                  </View>
                )}
              </View>
              {/* <View>
                <MPText style={ styles.simpleUserCardText }
                        onPress={this.toggleState.bind(this)}>{ song && song.name }</MPText>
                <MPShowRating rating={rating}/>
              </View>
              {
                indicateSong && indications == null && isNew == null && (
                  <TouchableOpacity style={ styles.indicateSongContainer }
                                    onPress={() => this.props.onIndicateClick(song)}>
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
              } */}
            </View>
          )}

          {this.state.menuOpen && (
            <View style={ styles.menuContainer }>
              <MPText style={ styles.menuCloseText} onPress={this.toggleState.bind(this)}>X</MPText>

              <MPText style={[styles.menuText, styles.menuTextFirst]} onPress={this.handleEditClick}>EDITAR</MPText>
              <View style={ styles.menuSeparator }/>

              {song.published_at && (
                <View>
                  <MPText style={ styles.menuText } onPress={this.handleUnpublishClick}>DESPUBLICAR</MPText>
                  <View style={ styles.menuSeparator }/>
                </View>
              )}

              <MPText style={ styles.menuText } onPress={this.handleRemoveClick}>EXCLUIR</MPText>
            </View>
          )}
        </Card>
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
  simpleUserCardContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    margin: 0,
    padding: 0,
    height: 190,
    overflow: 'hidden',
    width: 100,
    marginBottom: 5,
    flexDirection: 'column',
    marginHorizontal: 5
  },
  simpleUserCardImage: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    backgroundColor: '#f60',
  },
  simpleUserCardText: {
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
    backgroundColor: '#000',
    borderRadius: 4,
    width: 100,
    height: '100%'
  },
  menuText: {
    fontSize: 11,
    fontFamily: 'Montserrat-Medium',
    color: '#FFF',
    textAlign: 'center',
    paddingVertical: 18
  },
  menuTextFirst: {
    marginTop: 20
  },
  menuSeparator: {
    width: 20,
    height: 1,
    backgroundColor: '#FFF',
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
