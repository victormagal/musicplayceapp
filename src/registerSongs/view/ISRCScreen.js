import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';
import { MPHeader, MPFooter } from '../../components';

class ISRCScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: ''};
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Nº ISRC (código-padrão internacional de gravação)"} />
        {
          this.props.fontLoaded ? (
            <ScrollView style={styles.scroll}>
              <Text style={styles.textTop}>Informe o ISRC, caso a música já esteja registrada:</Text>
              <TextField 
              label='Nº do ISRC'
              value={this.state.text}
              labelFontSize={16}
              multiline={true}
              lineWidth={1}
              baseColor={'#b1b1b1'} 
              labelTextStyle={{ fontFamily: 'montSerrat' }}
              titleTextStyle={{ fontFamily: 'montSerrat' }}/>
              <View style={[styles.clickableTextContainer, {marginTop: 76}]}>
                <Text style={styles.clickableText}>A gravação ainda nao está registrada.</Text>
              </View>
              <View style={[styles.clickableTextContainer, {marginTop: 20}]}>
                <Text style={styles.clickableText}>Eu não sei o que é ISRC.</Text>
              </View>
            </ScrollView>
          ) : null
        }
        <MPFooter/>
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
    paddingStart :40,
    paddingEnd: 40,
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    marginBottom: 20,
    fontFamily: 'montSerrat'
  },
  textInputContainer: {
    height: 46,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#b1b1b1',
    padding: 5
  },
  textInput: {
    borderColor: 'transparent',
  },
  clickableTextContainer: {
    alignItems: 'flex-start',
    height: 20
  },
  clickableText: {
    borderBottomWidth: 1,
    borderColor: '#5994db',
    textAlign: 'center',
    color: '#5994db',
    fontSize: 14,
    fontFamily: 'montSerrat'
  }
});
const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const ISRCScreen = connect(mapStateToProps)(ISRCScreenContainer);
export {ISRCScreen};