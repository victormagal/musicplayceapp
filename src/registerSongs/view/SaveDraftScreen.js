import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { MPGradientButton, MPHeader } from '../../components';
import { connect } from 'react-redux';

class SaveDraftScreenContainer extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={false} onBack={this.handleBackClick} title={""} />
        <ScrollView style={styles.scroll}>
          {
            this.props.fontLoaded ? (
              <View>
                <Text style={styles.textTop}>Deseja salvar como rascunho?</Text>
              </View>
            ) :null
          }
          <MPGradientButton title="Deseja salvar como rascunho" onPress={ () => {} } />
          <MPGradientButton title="Apagar música" onPress={ () => {} } />
        </ScrollView>
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
    flex: 2
  },
  textTop: {
    fontSize: 20,
    color: '#000000',
    height: 22,
    marginBottom: 20,
    fontFamily: 'montSerrat'
  },
  buttonStyle: {
    paddingStart: 70,
    paddingEnd: 70
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const SaveDraftScreen = connect(mapStateToProps)(SaveDraftScreenContainer);
export {SaveDraftScreen};