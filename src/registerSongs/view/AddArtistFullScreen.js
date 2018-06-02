import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import { MPArtistHorizontal, MPInvitation, MPHeader, MPFooter } from '../../components';
import { connect } from 'react-redux';

class AddArtistFullScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
        text: "Pesquise pelo nome",
        item: {
            selected: true,
            backgroundColor: '#f05',
            title: 'Almir Sater'
        },
        emailItem: {
            selected: true,
            title: "Roberto Carlos",
            email: "robertocarlos@gmail.com"
        }
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Co-autores"} />
        <ScrollView style={styles.scroll}>
          <MPArtistHorizontal artist={"Almir Sater"} selected={true} onPress={() => {}} />
          <MPInvitation artistName={"Roberto Carlos"} artistEmail={"robertocarlos@gmail.com"} selected={true} onPress={() => {}} />
          {
            this.props.fontLoaded ? (
              <View style={{marginStart: 20, marginEnd: 20}}>
                <Text style={styles.textTop}>Essa música tem outros autores?</Text>
                <View style={ styles.textFieldWithButtonContainer}>
                    <TextField label="Pesquisar por nome"
                    value=""
                    labelFontSize={16} 
                    lineWidth={1}
                    containerStyle={{flex: 1}}
                    labelTextStyle={{ fontFamily: 'montSerrat' }}
                    titleTextStyle={{ fontFamily: 'montSerrat' }}/>
                    <Icon name='search' color='#e13223' size={20} containerStyle={ styles.textFieldIcon }/>
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
    paddingTop: 30,
    paddingStart: 20,
    paddingEnd: 20
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    height: 20,
    marginBottom: 20,
    marginTop: 20,
    fontFamily: 'montSerrat'
  },
  textFieldWithButtonContainer: {
    flexDirection: 'row',
    padding: 0,
  },
  textFieldIcon: {
      alignSelf: 'flex-end',
      paddingBottom: 16,
  }
});
const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const AddArtistFullScreen = connect(mapStateToProps)(AddArtistFullScreenContainer);
export {AddArtistFullScreen};