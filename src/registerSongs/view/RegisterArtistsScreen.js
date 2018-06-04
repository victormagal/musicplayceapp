import React from 'react';
import {StyleSheet, ScrollView, Text, View, TextInput} from 'react-native';
import { Icon } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import { MPHeader, MPTextField, MPFooter } from '../../components'
import { connect } from 'react-redux';

class RegisterArtistsScreenContainer extends React.Component {
  
  handleBackClick = () => {
    this.props.navigation.pop();
  };
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Intérpretes"} />
        <ScrollView>
        {
          this.props.fontLoaded ? (
            <View>
              <Text style={styles.textTop}>Essa música tem intérpretes?</Text>
              <MPTextField label={'Pesquise pelo nome:'} value={''} />
              <View style={styles.clickableTextContainer}>
                <Text style={styles.clickableText}>Não, apenas eu</Text>
              </View>
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
  textTop: {
    fontSize: 16,
    color: '#686868',
    marginHorizontal: 40,
    fontFamily: 'montSerrat'
  },
  clickableTextContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  clickableText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#5994db',
    fontSize: 14,
    marginTop: 152,
    fontFamily: 'montSerrat'
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const RegisterArtistsScreen = connect(mapStateToProps)(RegisterArtistsScreenContainer);
export {RegisterArtistsScreen};