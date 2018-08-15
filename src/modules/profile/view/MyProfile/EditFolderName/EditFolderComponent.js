import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {MPHeader, MPInput, MPText, MPIconButton, MPLoading, MPUserHorizontal} from '../../../../../components';
import {MPSearchRedIcon, MPCloseFilledRedIcon} from '../../../../../assets/svg';

class EditFolderComponent extends React.Component {
  state = {
	  foldername : '',
  }

  renderHeaderMenuSave() {
    return [
      <MPIconButton
        key={1}
        title="Salvar"
        titleStyle={styles.headerMenuText}
        onPress={() => this.props.onSave(this.state.foldername)}
      />
    ];
  }

  handleTextChange = (value) => {
	  this.setState({foldername: value});
  }

  render() {
    return (
      <View style={styles.container}>
        <MPHeader
          back={true}
          onBack={this.props.onBack}
          title="Editar o nome da pasta"
          icons={this.renderHeaderMenuSave()}
        />
        <ScrollView style={styles.content}>
          <View style={styles.contentSearch}>
              <MPInput
                label='Pesquise pelo nome:'
                value={this.state.foldername}
                onChangeText={this.handleTextChange}
              />
          </View>
        </ScrollView>
        <MPLoading visible={this.props.loading} />
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
    flex: 1
  },
  contentSearch: {
    marginHorizontal: 40,
    marginTop: 30
  },
  contentUsers: {
    marginTop: 30,
    paddingHorizontal: 10
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    fontFamily: 'ProbaPro-Regular'
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
    fontFamily: 'Montserrat-Regular'
  },
  headerMenuText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#fff'
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    bottom: 15
  },
  textInputSubTextHeader: {
    color: '#686868',
    fontSize: 12,
    fontFamily: 'Montserrat-BoldItalic'
  },
  textInputSubTextSuggestion: {
    fontSize: 12,
    color: '#686868',
    fontFamily: 'Montserrat-Italic'
  }
});
export {EditFolderComponent};
