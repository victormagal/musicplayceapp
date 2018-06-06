import React from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {MPHeader, MPFooter, MPTextField, MPText} from '../../../components';

class ArtistsScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: "Pesquise pelo nome"};
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Co-autores"}/>
        <ScrollView style={styles.scroll}>
          <View>
            <MPText style={styles.textTop}>Essa música tem outros autores?</MPText>
            <MPTextField label={'Pesquise pelo nome:'} value={''}/>
            <View style={styles.clickableTextContainer}>
              <MPText style={styles.clickableText}>Não, apenas eu</MPText>
            </View>
          </View>
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
const mapStateToProps = () => {
  return {};
};

const ArtistsScreen = connect(mapStateToProps)(ArtistsScreenContainer);
export {ArtistsScreen};
