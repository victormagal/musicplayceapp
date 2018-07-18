import React from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {updateSongRegisterData} from '../../../state/action';
import {MPHeader, MPInput, MPText, MPIconButton} from '../../../components';

class ArtistsScreenContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  handleSearchChange = ({value}) => {
    this.setState({search: value});
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleSaveClick = () => {
    //TODO: finish put co authors in redux
    let song = {...this.props.song};
    this.props.dispatch(updateSongRegisterData(song));
    this.handleBackClick();
  };

  renderHeaderMenuSave() {
    return [
      <MPIconButton title="Salvar" titleStyle={styles.headerMenuText} onPress={this.handleSaveClick}/>
    ];
  }

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title="Co-autores" icons={this.renderHeaderMenuSave()}/>
          <View style={styles.content}>
            <MPText style={styles.textTop}>Essa música tem outros autores?</MPText>
            <MPInput label='Pesquise pelo nome:' value={this.state.search} onChangeText={this.handleSearchChange}/>
            <View style={styles.clickableTextContainer}>
              <MPText style={styles.clickableText}>Não, apenas eu</MPText>
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC'
  },
  content: {
    flex: 2,
    marginHorizontal: 40,
    marginTop: 30
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    height: 20,
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
  },
  headerMenuText: {
    fontFamily: 'montSerrat',
    fontSize: 14,
    color: '#fff'
  }
});
const mapStateToProps = () => {
  return {};
};

const ArtistsScreen = connect(mapStateToProps)(ArtistsScreenContainer);
export {ArtistsScreen};
