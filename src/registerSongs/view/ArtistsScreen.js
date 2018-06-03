import React from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import { MPHeader, MPFooter } from '../../components';

class ArtistsScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: "Pesquise pelo nome"};
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Co-autores"} />
        {
          this.props.fontLoaded ? (
            <ScrollView style={styles.scroll}>
              <Text style={styles.textTop}>Essa música tem outros autores?</Text>
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
  scroll: {
    flex: 2,
    paddingStart: 40,
    paddingEnd: 40,
    paddingTop: 30 
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

const ArtistsScreen = connect(mapStateToProps)(ArtistsScreenContainer);
export {ArtistsScreen};