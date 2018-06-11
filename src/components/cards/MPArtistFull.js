import React, { Component } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Icon } from 'react-native-elements';
import { MPSongListIcon, MPPlayIcon, MPStarIcon } from '../../assets/svg';
import { MPText } from '../../components';

class MPArtistFullComponent extends Component{

    render() {
        let {songName, backgroundColor, style, onPress} = this.props;

        return (
            <TouchableOpacity style={style || {}} onPress={ onPress }>
            {
                this.props.fontLoaded ? (
                    <View style={ styles.simpleArtistCardContainer }>
                        <View style={{flex: 1}}>
                            <View style={ styles.simpleArtistCardImage } backgroundColor={ backgroundColor }>
                                <MPSongListIcon style={{position: 'absolute', top: 4, right: 4}} />
                                <MPPlayIcon style={{ marginTop: 48, alignSelf: 'center'}} />
                            </View>
                        </View>
                        <View style={ {backgroundColor: '#fff', flexDirection: 'column'} }>
                            <MPText style={ styles.simpleArtistCardText }>{songName}</MPText>
                            <View style={{marginHorizontal : 10, marginBottom: 10, marginTop: 5, flexDirection: 'row'}}>
                                <MPStarIcon style={{marginEnd: 3}} />
                                <MPStarIcon style={{marginEnd: 3}} />
                                <MPStarIcon style={{marginEnd: 3}} />
                                <MPStarIcon style={{marginEnd: 3}} />
                                <MPStarIcon style={{marginEnd: 3}} />
                            </View>
                            <View>
                                <View style={{backgroundColor: '#6f0', borderRadius: 25, width:40, height: 40}}></View>
                                <MPText>Adele</MPText>
                            </View>
                        </View>
                        
                    </View>
                ) : null
            }
            </TouchableOpacity>
        );
    }
}

MPArtistFullComponent.propTypes = {
    songName: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    backgroundColor: PropTypes.any,
    style: PropTypes.any,
};

const styles = StyleSheet.create({
	simpleArtistCardContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 4,
        marginHorizontal: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.9,
        shadowRadius: 4,
      },
      simpleArtistCardImage:{
        width: 120,
        height: 120,
        borderRadius: 4,
        backgroundColor: '#f60'
      },
      simpleArtistCardText: {
        fontSize: 14,
        color: '#000',
        paddingTop: 10,
        paddingStart: 10,
        paddingEnd: 10,
        fontFamily: 'montSerrat'
      }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPArtistFull = connect(mapStateToProps)(MPArtistFullComponent);
export { MPArtistFull };