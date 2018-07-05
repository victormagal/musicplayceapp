import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class MPFolderContainer extends Component {

  handlePress = () => {
    let {onPress} = this.props;
    onPress && onPress();
  };

  render() {
    let {folderName, musicAmount, selected} = this.props;
    let borderStyle = {};
    let iconStyle = {};

    if(selected) {
      borderStyle = {
        borderColor: "#e13223",
        borderWidth: 1
      };
      iconStyle = {
        position: 'absolute',
        right: -10,
        top: -10,
        zIndex: 99,
      };
    }

    return (
      <TouchableOpacity onPress={this.handlePress}>

        <View style={[styles.container, borderStyle]}>
          <View style={[styles.chooseFolderCardContainer] }>
            <View style={ styles.chooseFolderImage }>
              <Icon type='font-awesome' name='folder-open-o' color='#5994db'/>
            </View>
            {
              this.props.fontLoaded ? (
                  <View style={ styles.chooseFolderTextContainer }>
                    <Text style={ styles.chooseFolderText}>{ folderName }</Text>
                    <Text style={ styles.chooseFolderSubText}>{ musicAmount }</Text>
                  </View>
                ) : null
            }
          </View>
          { selected &&
          <Icon name='check-circle' color='#f00' size={18} containerStyle={ iconStyle }/>
          }
        </View>
      </TouchableOpacity>
    );
  }
}

MPFolderContainer.propTypes = {
  folderName: PropTypes.string.isRequired,
  musicAmount: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  selected: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 4,
    marginHorizontal: 40,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 4
  },
  chooseFolderCardContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60
  },
  chooseFolderImage: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chooseFolderText: {
    color: "#000",
    fontSize: 16,
    fontFamily: 'montSerratSemiBold',
  },
  chooseFolderSubText: {
    color: "#c0c0c0",
    fontSize: 10,
    fontFamily: 'montSerrat',
  },
  chooseFolderSelectedIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const MPFolder = connect(mapStateToProps)(MPFolderContainer);
export {MPFolder};
