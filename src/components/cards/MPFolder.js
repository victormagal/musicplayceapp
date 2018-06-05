import React, { Component } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MPFolderContainer extends Component{

    render() {
        let {folderName, musicAmount, selected} = this.props;
        let borderStyle = {};
        let iconStyle = {};

        if(selected == true){
            borderStyle = {
                borderColor: "#e13223",
                borderWidth: 2
            };
            iconStyle = {
                position: 'absolute',
                right: 32,
                top: 0,
                zIndex: 99,
            };
        }

        return (
            <TouchableOpacity>

                <View style={{paddingTop: 8}}>
                    <View style={ [styles.chooseFolderCardContainer, borderStyle] }>
                        <View style={ styles.chooseFolderImage }>
                            <Icon type='font-awesome' name='folder-open-o' color='#5994db' />
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
    onPress: PropTypes.func.isRequired,
    selected: PropTypes.bool
};

const styles = StyleSheet.create({
	chooseFolderCardContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 4,
        shadowColor: '#000000',
        shadowOpacity: 0.15,
        shadowRadius: 2,
        shadowOffset: {
        width: 1,
        height: 1
        },
        height: 60,
        marginHorizontal: 40,
        marginBottom: 2,
        overflow: 'hidden'
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
const mapStateToProps = ({ fontReducer }) => {
    return { ...fontReducer };
  };
  
  const MPFolder = connect(mapStateToProps)(MPFolderContainer);
export { MPFolder };