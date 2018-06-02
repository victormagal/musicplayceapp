import React from 'react';
import {StyleSheet, ScrollView, Text, View, TextInput} from 'react-native';
import { Icon } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import { MPHeader, MPTextField, MPFooter } from '../../components'
import { connect } from 'react-redux';

class RegisterArtistsScreenContainer extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Intérpretes"} />
        {
          this.props.fontLoaded ? (
            <ScrollView>
              <Text style={styles.textTop}>Essa música tem intérpretes?</Text>
              <View style={ styles.textFieldWithButtonContainer}>
                  <TextField label="Pesquise pelo nome"
                  value=""
                  baseColor="#b1b1b1"
                  labelFontSize={16} 
                  lineWidth={1}
                  containerStyle={{flex: 1}}
                  labelTextStyle={{ fontFamily: 'montSerrat' }}
                  titleTextStyle={{ fontFamily: 'montSerrat' }}/>
                  <Icon name='search' color='#e13223' size={20} containerStyle={ styles.textFieldIcon }/>
              </View>
              <View style={styles.clickableTextContainer}>
                <Text style={styles.clickableText}>Não, apenas eu</Text>
              </View>
            </ScrollView>
          ) : null
        }
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
  textTop: {
    fontSize: 16,
    color: '#686868',
    height: 20,
    marginBottom: 20,
    marginTop: 30,
    marginStart: 40,
    marginEnd: 40,
    fontFamily: 'montSerrat'
  },
  textFieldWithButtonContainer: {
      flexDirection: 'row',
      padding: 0,
      marginStart: 40, 
      marginEnd: 40,
  },
  textFieldIcon: {
      alignSelf: 'flex-end',
      paddingBottom: 16,
  },
  clickableTextContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  clickableText: {
    borderBottomWidth: 1,
    borderColor: '#5994db',
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