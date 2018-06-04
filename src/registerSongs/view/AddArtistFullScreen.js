import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import { MPArtistHorizontal, MPInvitation, MPHeader, MPFooter, MPTextField } from '../../components';
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

  goToScreen = (route) => {
    this.props.navigation.navigate(route);
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Co-autores"} />
        <ScrollView style={styles.scroll}>
          <MPArtistHorizontal artist={"Almir Sater"} selected={true} onPress={() => {}} />
          <MPInvitation artistName={"Roberto Carlos"} artistEmail={"robertocarlos@gmail.com"} selected={true} onPress={() => {}} />
          {
            this.props.fontLoaded ? (
              <View>
                <Text style={styles.textTop}>Essa música tem outros autores?</Text>
                <MPTextField label={'Pesquise pelo nome:'} value={''} />
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
    height: 20,
    marginHorizontal: 40,
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