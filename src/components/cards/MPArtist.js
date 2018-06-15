import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {MPText} from '../general';
import {MPPlusArtistIcon, MPPlusArtistAvatarIcon} from '../../assets/svg';

class MPArtistComponent extends Component {

  render() {
    let {artist, imagePath, style} = this.props;

    return (
      <View style={style || {}}>
        <View style={ styles.simpleArtistCardContainer }>
          <View>
            <View style={ styles.simpleArtistCardImage }>
              <Image source={ imagePath }/>
            </View>
            <MPPlusArtistIcon style={styles.iconArtist}/>
            <MPPlusArtistAvatarIcon style={styles.iconArtistAvatar}/>
          </View>
          <MPText style={ styles.simpleArtistCardText }>{ artist }</MPText>
        </View>
      </View>
    );
  }
}

MPArtistComponent.propTypes = {
  artist: PropTypes.string.isRequired,
  imagePath: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired,
  backgroundColor: PropTypes.any,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  simpleArtistCardContainer: {
    flex: 1,
    width: 100,
    height: 152,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 4,
    marginHorizontal: 5,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  simpleArtistCardImage: {
    borderRadius: 4,
    backgroundColor: '#f60',
    overflow: 'hidden'
  },
  simpleArtistCardText: {
    fontSize: 14,
    color: '#000',
    paddingTop: 10,
    paddingStart: 10,
    paddingEnd: 10,
    paddingBottom: 26,
    fontFamily: 'montSerrat'
  },
  iconArtist: {
    position: 'absolute',
    left: 8,
    top: 8
  },
  iconArtistAvatar: {
    position: 'absolute',
    left: 23,
    top: 8
  }
});

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const MPArtist = connect(mapStateToProps)(MPArtistComponent);
export {MPArtist};
