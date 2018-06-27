import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View 
} from 'react-native';
import { 
  MPHeader, 
  MPSelect, 
  MPFooter,
  MPText
} from '../../../components';
import { connect } from 'react-redux';

class TermsSettingsScreenContainer extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.parent}>
        <MPHeader back={true} onBack={this.handleBack} title={"Termos e condições de uso"} />
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.containerSelect}>
              <MPSelect label={"Selecione um tópico"} />
            </View>
            <View style={styles.boxText}>
              <MPText style={styles.title}>Tópico 1 - Lorem ipsum</MPText>
              <MPText style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ipsum ante, viverra vitae orci non, tincidunt ullamcorper sapien. Ut non leo consectetur, iaculis nisl vel, facilisis ante. Sed fermentum odio ac egestas dapibus. Sed feugiat purus dui, in auctor justo mattis at.</MPText>
            </View>
            <View style={styles.boxText}>
              <MPText style={styles.title}>Tópico 2 - Lorem ipsum</MPText>
              <MPText style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ipsum ante, viverra vitae orci non, tincidunt ullamcorper sapien. Ut non leo consectetur, iaculis nisl vel, facilisis ante. Sed fermentum odio ac egestas dapibus. Sed feugiat purus dui, in auctor justo mattis at.</MPText>
            </View>
            <View style={styles.boxText}>
              <MPText style={styles.title}>Tópico 3 - Lorem ipsum</MPText>
              <MPText style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ipsum ante, viverra vitae orci non, tincidunt ullamcorper sapien. Ut non leo consectetur, iaculis nisl vel, facilisis ante. Sed fermentum odio ac egestas dapibus. Sed feugiat purus dui, in auctor justo mattis at.</MPText>
            </View>
            <View style={styles.boxText}>
              <MPText style={styles.title}>Tópico 4 - Lorem ipsum</MPText>
              <MPText style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ipsum ante, viverra vitae orci non, tincidunt ullamcorper sapien. Ut non leo consectetur, iaculis nisl vel, facilisis ante. Sed fermentum odio ac egestas dapibus. Sed feugiat purus dui, in auctor justo mattis at.</MPText>
            </View>
            <View style={styles.boxText}>
              <MPText style={styles.title}>Tópico 5 - Lorem ipsum</MPText>
              <MPText style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ipsum ante, viverra vitae orci non, tincidunt ullamcorper sapien. Ut non leo consectetur, iaculis nisl vel, facilisis ante. Sed fermentum odio ac egestas dapibus. Sed feugiat purus dui, in auctor justo mattis at.</MPText>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'flex-end'
  },
  scroll: {
    flex: 2
  },
  containerSelect: {
    borderBottomColor: 'rgba(0, 0, 0, 0.15)',
    borderBottomWidth: 1,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF'
  },
  container: {
    marginVertical: 30
  },
  boxText: {
    marginHorizontal: 40,
    marginTop: 30
  },
  title: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'montSerratMedium',
    marginBottom: 5
  },
  paragraph: {
    fontSize: 16,
    color: '#686868',
    fontFamily: 'probaProRegular'
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const TermsSettingsScreen = connect(mapStateToProps)(TermsSettingsScreenContainer);
export { TermsSettingsScreen };
