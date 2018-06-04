import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { MPArtistHorizontal, MPHeader, MPFooter, MPTextField } from '../../components';
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
    marginHorizontal: 40,
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