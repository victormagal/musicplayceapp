import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {  MPAddSongNoteIcon, MPAddSongPlusIcon, MPAddSongWhiteNoteIcon, MPAddSongWhitePlusIcon } from '../../assets/svg';

class MPAddSongButtonComponent extends Component{
  render() {
    const { isColored, onPress } = this.props;
    const linearColorOptions = [['#BB1A1A', '#2E2C9D'], ['#FFF', '#FFF']];
    const linearColor = isColored ? linearColorOptions[0] : linearColorOptions[1];

    return (
      <TouchableOpacity style={styles.parent} onPress={onPress}>
        <LinearGradient
          colors={linearColor}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linear}
          selected={true}>
          { isColored ?
            <View style={[styles.buttonContainer, { marginTop: 5 }]}>
                <MPAddSongWhiteNoteIcon style={{ width: 30, height: 30, marginRight: -7 }} />
                <MPAddSongWhitePlusIcon style={{ width: 20, height: 20 }} />
            </View>
          :
            <View style={[styles.buttonContainer, { marginTop: 8 }]}>
                <MPAddSongNoteIcon style={{ width: 45, height: 45, marginRight: -14 }} />
                <MPAddSongPlusIcon style={{ width: 30, height: 30 }} />
            </View>
          }
        </LinearGradient>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  parent:{
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonContainer: {
    flex: 1,
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  linear: {
    padding: 8,
    width: 60,
    height: 60,
    borderRadius: 30,
  }
});

const mapStateToProps = () => {
    return {};
};

const MPAddSongButton = connect(mapStateToProps)(MPAddSongButtonComponent);
export { MPAddSongButton };

