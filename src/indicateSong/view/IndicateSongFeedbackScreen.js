import React from 'react';
import {StyleSheet, ScrollView, Text, View, TextInput} from 'react-native';
import { Icon } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import { MPHeader, MPTextField, MPFooter, MPGradientButton, MPArtist, MPSongRating } from '../../components'
import { connect } from 'react-redux';
import { MPPlusIcon, MPLogoIcon } from '../../assets/svg';

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
              <MPLogoIcon />
              <View style={ styles.partnershipContainer}>
                <MPSongRating songName={'Tocando em Frente'} backgroundColor={'#f60'} onPress={() => {}} style={{}} />
                <MPArtist artist={'Bruno Caliman'} backgroundColor={'#6f0'} onPress={() => {}} style={{}} />
              </View>
              <Text style={ styles.infoText }><Text style={ styles.infoTextEmph }>203</Text> outras pessoas sugeriram esta parceria também!</Text>
              <MPGradientButton title={'Fechar'} textSize={16} style={{marginHorizontal: 133}} />
            </View>
          ) : null
        }
        </ScrollView>
        <MPFooter />
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
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const IndicateSongFeedbackScreen = connect(mapStateToProps)(IndicateSongFeedbackScreenContainer);
export {IndicateSongFeedbackScreen};