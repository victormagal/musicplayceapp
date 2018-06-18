import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import { MPHeader, MPTextField, MPFooter, MPGradientButton, MPArtist, MPSongRating } from '../../../components'
import { connect } from 'react-redux';
import { MPPlusIcon, MPLogoIcon } from '../../../assets/svg';
import images from '../../../assets/img';

class IndicateSongFeedbackScreenContainer extends React.Component {
  
  handleBackClick = () => {
    this.props.navigation.pop();
  };

  goToScreen = (route) => {
    this.props.navigation.navigate(route);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={""} />
        <ScrollView>
        {
          this.props.fontLoaded ? (
            <View>
              <Text style={ styles.headerText }>Indicação feita!</Text>
              <View style={ styles.partnershipContainer}>
                <MPSongRating songName={'Tocando em Frente'} imagePath={images.daftPunk100} onPress={() => {}} style={{}}  />
                <MPPlusIcon   style={ styles.partnershipIcon }/>
                <MPArtist artist={'Bruno Caliman'} imagePath={images.bjork100} onPress={() => {}} style={{}} />
              </View>
              <Text style={ styles.infoText }><Text style={ styles.infoTextEmph }>203</Text> outras pessoas sugeriram esta parceria também!</Text>
              <MPGradientButton title={'Fechar'} textSize={16} style={{marginHorizontal: 133}} onPress={()=>{}} />
            </View>
          ) : null
        }
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
    fontFamily: 'montSerratBold',
    color: '#000',
    textAlign: 'center',
    marginTop: 90,
    marginBottom: 20,
  },
  infoText: {
    fontSize : 16,
    color : '#000',
    fontFamily: 'montSerrat',
    marginHorizontal: 32,
    textAlign: 'center',
    marginBottom : 20,
    marginTop: 22,
  },
  infoTextEmph: {
    fontFamily: 'montSerratBold',
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

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const IndicateSongFeedbackScreen = connect(mapStateToProps)(IndicateSongFeedbackScreenContainer);
export {IndicateSongFeedbackScreen};