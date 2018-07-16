import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {MPText} from '../general';
import {MPCameraIcon, MPPlusPhotoIcon} from '../../assets/svg';

class MPAddChangePhotoComponent extends Component {

  render() {
    let {hasPhoto} = this.props;

    return (
      hasPhoto ? (
          <View style={ styles.hasPhotoContainer }>
            <View style={ styles.photoButtonContainer }>
              <MPText style={ styles.photoButtonText }>Alterar foto</MPText>
            </View>
          </View>
        ) : (
          <View style={ styles.noPhotoContainer }>
            <TouchableOpacity onPress={this.props.onPressPhoto}>
              <View style={ styles.noPhotoIconContainer }>
                <MPCameraIcon style={styles.noPhotoIcon} />
              </View>
              <MPPlusPhotoIcon style={styles.noPhotoIconAdd} />
            </TouchableOpacity>

            <MPText style={ styles.photoButtonText }>Adicionar foto</MPText>
          </View>
        )
    )
  }
}

MPAddChangePhotoComponent.propTypes = {
  onPressPhoto: PropTypes.func
};

const styles = StyleSheet.create({
  hasPhotoContainer: {
    height: 220,
    justifyContent: 'flex-end',
    marginStart: 20,
    marginEnd: 206,
    marginBottom: 20,
  },
  photoButtonContainer: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'montSerrat',
    paddingLeft: 20
  },
  noPhotoContainer: {
    height: 220,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20
  },
  noPhotoIconContainer: {
    width: 66,
    height: 66,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 33,
    flexDirection: 'row',
    justifyContent: 'center'
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

