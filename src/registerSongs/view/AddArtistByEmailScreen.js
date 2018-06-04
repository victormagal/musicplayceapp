import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import { MPArtistHorizontal, MPHeader, MPFooter } from '../../components';
import { connect } from 'react-redux';

class AddArtistByEmailScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
        text: "Roberto Carlos",
        emailText: "robertocarlos@gmail.com",
        item: {
            selected: true,
            backgroundColor: '#f05',
            title: 'Almir Sater'
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
          {
            this.props.fontLoaded ? (
              <View style={{paddingStart: 20, paddingEnd: 20}}>
                <Text style={styles.textTop}>Essa música tem outros autores?</Text>
                <View style={ styles.textFieldWithButtonContainer}>
                    <TextField label="Pesquisar por nome"
                    value="Roberto Carlos"
                    labelFontSize={16} 
                    lineWidth={1}
                    baseColor={"#b1b1b1"}
                    containerStyle={{flex: 1}}
                    labelTextStyle={{ fontFamily: 'montSerrat' }}
                    titleTextStyle={{ fontFamily: 'montSerrat' }}/>
                    <Icon name='search' color='#e13223' size={20} containerStyle={ styles.textFieldIcon }/>
                </View>
                <View>
                    <Text style={ styles.textInputSubTextHeader}>Não encontrou o co-autor?</Text>
                    <Text style={ styles.textInputSubTextSuggestion}>Convide-o para se juntar ao MusicPlayce.</Text>
                </View>
                <TextField 
                label='E-mail'
                value={this.state.emailText}
                labelFontSize={16}
                lineWidth={1}
                baseColor={'#b1b1b1'}
                onChangeText={(emailText) => this.setState({emailText})}
                labelTextStyle={{ fontFamily: 'montSerrat' }}
                titleTextStyle={{ fontFamily: 'montSerrat' }}
                onFocus={ this.goToScreen.bind(this, 'AddArtistFullScreen')}/>
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
    paddingEnd: 20,
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    height: 20,
    marginBottom: 20,
    fontFamily: 'montSerrat'
  },
  textInputContainer: {
    height: 46,
    flexDirection: 'row',
    marginBottom: 10    ,
    borderBottomWidth: 1,
    borderColor: '#b1b1b1',
    padding: 5
  },
  textInput: {
    borderColor: 'transparent',
    flex: 9
  },
  textInputSubTextHeader: {
    fontWeight: 'bold',
    color: '#686868',
    fontSize: 12,
    fontFamily: 'montSerrat'
  },
  textInputSubTextSuggestion: {
    fontWeight: 'normal',
    fontSize: 12,
    color: '#686868',
    fontFamily: 'montSerrat'
  },
  textFieldWithButtonContainer: {
    flexDirection: 'row',
    padding: 0,
    marginBottom: 2
},
textFieldIcon: {
    alignSelf: 'flex-end',
    paddingBottom: 16,
}
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const AddArtistByEmailScreen = connect(mapStateToProps)(AddArtistByEmailScreenContainer);
export {AddArtistByEmailScreen};