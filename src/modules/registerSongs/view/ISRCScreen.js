import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { MPHeader, MPFooter, MPTextField, MPText } from '../../../components';

class ISRCScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: ''
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader
          back={true}
          onBack={this.handleBackClick}
          title={"Nº ISRC (código-padrão internacional de gravação)"}
        />
        <ScrollView style={styles.scroll}>
            <View>
              <MPText style={styles.textTop}>
                Informe o ISRC, caso a música já esteja registrada:
              </MPText>
              <MPTextField label={'Nº do ISRC'} value={''} />
              <View style={[ styles.clickableTextContainer, { marginTop: 76 } ]}>
                <MPText style={[ styles.clickableText, { marginBottom: 20 } ]}>
                  A gravação ainda nao está registrada.
                </MPText>
                <MPText style={styles.clickableText}>
                  Eu não sei o que é ISRC.
                </MPText>
              </View>
            </View>
        </ScrollView>
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
    justifyContent: 'flex-end',
  },
  scroll: {
    flex: 2,
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    fontFamily: 'Montserrat-Regular',
    marginHorizontal: 40
  },
  clickableTextContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 40
  },
  clickableText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#5994db',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular'
  }
});

const mapStateToProps = () => {
  return {  };
};

const ISRCScreen = connect(mapStateToProps)(ISRCScreenContainer);
export {ISRCScreen};
