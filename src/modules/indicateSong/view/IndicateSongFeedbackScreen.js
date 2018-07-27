import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import { MPHeader, MPText, MPGradientButton, MPArtist, MPSongRating } from '../../../components'
import { connect } from 'react-redux';
import { MPPlusIcon,  } from '../../../assets/svg';

import images from '../../../assets/img';
import { fetchOneSong } from '../../../state/action';

class IndicateSongFeedbackScreenContainer extends React.Component {
  constructor(props){
    super(props);
    if(this.props.navigation.state && this.props.navigation.state.params){
      let {artist, song } = this.props.navigation.state.params;
      this.state = {artist, song};
    }
  }

  handleBackClick = () => {
    this.props.navigation.popToTop();
  };

  goToScreen = (route) => {
    this.props.navigation.navigate(route);
  }

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} />
        <ScrollView>
          <MPText style={ styles.headerText }>Indicação feita!</MPText>
          <View style={ styles.partnershipContainer}>
            <MPSongRating song={this.state.song} imagePath={images.daftPunk100} onPress={() => {}} style={{}} />
            <MPPlusIcon   style={ styles.partnershipIcon }/>
            <MPArtist artist={this.state.artist} imagePath={this.state.artist.picture_url} onPress={() => {}} style={{}} />
          </View>
          <MPText style={ styles.infoText }><MPText style={ styles.infoTextEmph }>203</MPText> outras pessoas sugeriram esta parceria também!</MPText>
          <MPGradientButton title={'Fechar'} textSize={16} style={{marginHorizontal: 133}} onPress={this.handleBackClick} />
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
  }
});


const mapStateToProps = () => {
  return {};
};

const IndicateSongFeedbackScreen = connect(mapStateToProps)(IndicateSongFeedbackScreenContainer);
export {IndicateSongFeedbackScreen};
