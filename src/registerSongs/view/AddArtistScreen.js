import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { MPArtistHorizontal, MPHeader, MPFooter } from '../../components';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';

class AddArtistScreenContainer extends React.Component {
  constructor(props){
    super(props);
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
          <MPArtistHorizontal artist={"Almir Sater"} selected={true} onPress={ () => {}} />
          {
            this.props.fontLoaded ? (
              <View style={{paddingStart: 20, paddingEnd: 20}}>
                <Text style={styles.textTop}>Essa música tem outros autores?</Text>
                <View style={ styles.textFieldWithButtonContainer}>
                    <TextField label="Pesquise pelo nome"
                    value=""
                    labelFontSize={16} 
                    lineWidth={1}
                    containerStyle={{flex: 1}}
                    labelTextStyle={{ fontFamily: 'montSerrat' }}
                    titleTextStyle={{ fontFamily: 'montSerrat' }}
                    onFocus={ this.goToScreen.bind(this,'AddArtistByEmailScreen')}/>
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
  textFieldWithButtonContainer: {
    flexDirection: 'row',
    padding: 0,
    marginBottom: 30
},
textFieldIcon: {
    alignSelf: 'flex-end',
    paddingBottom: 16,
}
  
});
const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const AddArtistScreen = connect(mapStateToProps)(AddArtistScreenContainer);
export {AddArtistScreen};