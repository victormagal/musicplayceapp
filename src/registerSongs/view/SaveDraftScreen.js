import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { MPGradientButton, MPHeader } from '../../components';
import { connect } from 'react-redux';

class SaveDraftScreenContainer extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <View>
        {
          this.props.fontLoaded ? (
            <View>
              <MPHeader back={false} onBack={this.handleBackClick} title={""} />
              <View style={styles.container}>
                <Text style={styles.textTop}>Deseja salvar como rascunho?</Text>
                <MPGradientButton title="Salvar Rascunho" onPress={ () => {} } style={[styles.buttonStyle, {marginBottom: 20}]} textSize={16}/>
                <MPGradientButton title="Apagar música" onPress={ () => {} } style={ styles.buttonStyle } textSize={16}/>
              </View>
            </View>
          ) :null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    marginStart: 40,
    marginEnd: 40,
    flexDirection: 'column',
    alignItems: 'center'
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