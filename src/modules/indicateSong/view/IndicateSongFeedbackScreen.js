import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import { MPHeader, MPText, MPGradientButton, MPUser, MPSongRating } from '../../../components'
import { connect } from 'react-redux';
import { MPPlusIcon,  } from '../../../assets/svg';


class IndicateSongFeedbackScreenContainer extends React.Component {
  constructor(props){
    super(props);
    if(this.props.navigation.state && this.props.navigation.state.params){
      let {artist, song, indicationCount } = this.props.navigation.state.params;
      this.state = {artist, song, indicationCount};
    }
  }

  handleBackClick = () => {
    if(this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.registerSong){
      this.props.navigation.navigate('MyProfileScreen', { backFromPublishedOrDraft: true });
    }else {
      this.props.navigation.navigate('player', {song: this.state.song})
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} />
        <ScrollView>
          <MPText style={ styles.headerText }>Indicação feita!</MPText>
          <View style={styles.partnershipContainer}>
            <MPSongRating song={this.state.song} indication={true} onPress={() => {}} style={{marginTop: 15}} />
            <MPPlusIcon style={ styles.partnershipIcon }/>
            <MPUser user={this.state.artist} imagePath={this.state.artist.picture_url} onPress={() => {}} style={{}} />
          </View>
          <MPText style={ styles.infoText }><MPText style={ styles.infoTextEmph }>{this.state.indicationCount}</MPText> outras pessoas sugeriram esta parceria também!</MPText>
          <MPGradientButton title='Fechar' textSize={16} style={styles.closeButton} onPress={this.handleBackClick} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'flex-end'
  },
  scroll: {
    flex: 2,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 90,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Montserrat-Regular',
    marginHorizontal: 32,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 22,
  },
  infoTextEmph: {
    fontFamily: 'Montserrat-Bold',
  },
  partnershipContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center'
  },
  partnershipIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  closeButton: {
    justifyContent: 'center',
    alignSelf: 'center'
  }
});


const mapStateToProps = () => {
  return {};
};

const IndicateSongFeedbackScreen = connect(mapStateToProps)(IndicateSongFeedbackScreenContainer);
export {IndicateSongFeedbackScreen};
