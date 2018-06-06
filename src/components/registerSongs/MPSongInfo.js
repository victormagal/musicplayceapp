import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import {MPText} from '../general/MPText';

class MPSongInfoComponent extends Component {

  render() {
    let {title, info, selected, onPress, style} = this.props;
    let borderStyle = {};
    let iconStyle = {};

    if (selected == true) {
      borderStyle = {
        borderColor: "#e13223",
        borderWidth: 2
      };
      iconStyle = {
        position: 'absolute',
        right: -7,
        top: -7
      };
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={ onPress }>
            <View style={[styles.parent, borderStyle, style]}>
              <MPText style={styles.titleText}>{ title }</MPText>
              <MPText style={styles.infoText}>{ info }</MPText>
            </View>
        </TouchableOpacity>
        { selected && <Icon name='check-circle' color='#f00' size={18} containerStyle={ iconStyle }/> }
      </View>
    );
  }
}

MPSongInfoComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  info: PropTypes.string,
  selected: PropTypes.bool,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '2%',
    marginBottom: 10,
    height: 78,
    width: '46%',
    backgroundColor: '#fff',
  },
  parent: {
    height: '100%',
    borderRadius: 4,
    padding: 10,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
  titleText: {
    color: "#000",
    paddingStart: 10,
    fontSize: 12,
    fontFamily: 'montSerratMedium'
  },
  infoText: {
    color: '#9b9b9b',
    fontSize: 10,
    fontFamily: 'montSerrat',
    paddingStart: 10,
  }
});

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const MPSongInfo = connect(mapStateToProps)(MPSongInfoComponent);
export {MPSongInfo};
