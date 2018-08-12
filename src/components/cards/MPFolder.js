import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import PropTypes from 'prop-types';
import {MPText} from '../../components';
import {MPFolderIcon, MPValidatedFilledRedIcon} from '../../assets/svg';


class MPFolderContainer extends Component {

  handlePress = () => {
    let {onPress} = this.props;
    onPress && onPress();
  };

  render() {
    let {folderName, musicAmount, selected} = this.props;
    let borderStyle = {};
    let iconStyle = {};

    if (selected) {
      borderStyle = {
        borderColor: "#e13223",
        borderWidth: 1
      };
      iconStyle = {
        position: 'absolute',
        top: 4,
        right: 5
      };
    }

    return (
      <View style={styles.paddingShadow}>
        <TouchableOpacity style={styles.paddingShadow} onPress={this.handlePress}>
          <Card containerStyle={[styles.container, borderStyle]}>
            <View style={[styles.chooseFolderCardContainer] }>
              <View style={ styles.chooseFolderImage }>
                <MPFolderIcon />
              </View>
              <View>
                <MPText style={ styles.chooseFolderText}>{ folderName }</MPText>
                <MPText style={ styles.chooseFolderSubText}>{ musicAmount } músicas</MPText>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
        { selected && <MPValidatedFilledRedIcon style={iconStyle}/> }
      </View>
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
  paddingShadow: {
    padding: 10
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 4,
    margin: 0,
    padding: 0
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
    fontFamily: 'Montserrat-Regular',
  },
  chooseFolderSubText: {
    color: "#c0c0c0",
    fontSize: 10,
    fontFamily: 'Montserrat-Regular',
  },
});
const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const MPFolder = connect(mapStateToProps)(MPFolderContainer);
export {MPFolder};
