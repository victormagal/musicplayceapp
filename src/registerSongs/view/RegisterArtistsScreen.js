import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { Icon } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import { MPHeader, MPTextField } from '../../components'
import { connect } from 'react-redux';

class RegisterArtistsScreenContainer extends React.Component {
  
  render() {
    return (
      <View>
        {
          this.props.fontLoaded ? (
            <View>
              <MPHeader back={true} onBack={this.handleBackClick} title={"Intérpretes"} />
              <View style={styles.container}>
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
              </View>
            </View>
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 30,
    marginStart: 40,
    marginEnd: 40,
    flexDirection: 'column',
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    height: 20,
    marginBottom: 20,
    fontFamily: 'montSerrat'
  },
  textFieldWithButtonContainer: {
      flexDirection: 'row',
      padding: 0,
  },
  textFieldIcon: {
      alignSelf: 'flex-end',
      paddingBottom: 16,
  },
  clickableTextContainer: {
    alignItems: 'center',
    height: 20
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