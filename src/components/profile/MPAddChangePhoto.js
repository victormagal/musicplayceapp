import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {MPText} from '../general';
import {MPCameraIcon, MPPlusPhotoIcon} from '../../assets/svg';

class MPAddChangePhotoComponent extends Component {

  render() {
    const { hasPhoto, onPressPhoto } = this.props;

    if (hasPhoto) {
      return (
        <View style={[ styles.container, { justifyContent: 'flex-end' } ]}>
          <TouchableOpacity style={styles.photoButtonContainer} onPress={onPressPhoto}>
            <MPCameraIcon />
            <MPText style={ styles.photoButtonText }>Alterar foto</MPText>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={[ styles.container, { justifyContent: 'center' } ]}>
        <TouchableOpacity style={styles.noPhotoContent} onPress={onPressPhoto}>
          <View style={styles.noPhotoIconContainer}>
            <MPCameraIcon style={styles.noPhotoIcon} />
          </View>
          <MPPlusPhotoIcon style={styles.noPhotoIconAdd} />
          <MPText style={ styles.photoButtonText }>Adicionar foto</MPText>
        </TouchableOpacity>
      </View>
    )
  }
}

MPAddChangePhotoComponent.propTypes = {
  onPressPhoto: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    flexDirection: 'column',
    marginHorizontal: 20,
    marginBottom: 20
  },
  photoButtonContainer: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 16,
    padding: 8,
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    paddingLeft: 10
  },
  noPhotoContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  noPhotoIconContainer: {
    flex: 0,
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 1,
    marginRight: 10,
    justifyContent: 'center',
    borderColor: '#FFF'
  },
  noPhotoIcon: {
    alignSelf: 'center'
  },
  noPhotoIconAdd: {
    position: 'absolute',
    marginLeft: 53
  }
});

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const MPAddChangePhoto = connect(mapStateToProps)(MPAddChangePhotoComponent);
export {MPAddChangePhoto};

