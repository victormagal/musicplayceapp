import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MPHeader, MPSelect, MPFooter } from '../../components';
import { connect } from 'react-redux';

class TermsConfigurationScreenComponent extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.parent}>
        <MPHeader back={true} onBack={this.handleBack} title={"Termos e condições de uso"} />
        <ScrollView style={styles.scroll}>
          <MPSelect />
          {
            this.props.fontLoaded ? (
              <View style={styles.container}>
                <View style={styles.boxText}>
                  <Text style={styles.title}>Tópico 1 - Lorem ipsum</Text>
                  <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ipsum ante, viverra vitae orci non, tincidunt ullamcorper sapien. Ut non leo consectetur, iaculis nisl vel, facilisis ante. Sed fermentum odio ac egestas dapibus. Sed feugiat purus dui, in auctor justo mattis at.</Text>
                </View>
                <View style={styles.boxText}>
                  <Text style={styles.title}>Tópico 2 - Lorem ipsum</Text>
                  <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ipsum ante, viverra vitae orci non, tincidunt ullamcorper sapien. Ut non leo consectetur, iaculis nisl vel, facilisis ante. Sed fermentum odio ac egestas dapibus. Sed feugiat purus dui, in auctor justo mattis at.</Text>
                </View>
                <View style={styles.boxText}>
                  <Text style={styles.title}>Tópico 3 - Lorem ipsum</Text>
                  <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ipsum ante, viverra vitae orci non, tincidunt ullamcorper sapien. Ut non leo consectetur, iaculis nisl vel, facilisis ante. Sed fermentum odio ac egestas dapibus. Sed feugiat purus dui, in auctor justo mattis at.</Text>
                </View>
                <View style={styles.boxText}>
                  <Text style={styles.title}>Tópico 4 - Lorem ipsum</Text>
                  <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ipsum ante, viverra vitae orci non, tincidunt ullamcorper sapien. Ut non leo consectetur, iaculis nisl vel, facilisis ante. Sed fermentum odio ac egestas dapibus. Sed feugiat purus dui, in auctor justo mattis at.</Text>
                </View>
                <View style={styles.boxText}>
                  <Text style={styles.title}>Tópico 5 - Lorem ipsum</Text>
                  <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ipsum ante, viverra vitae orci non, tincidunt ullamcorper sapien. Ut non leo consectetur, iaculis nisl vel, facilisis ante. Sed fermentum odio ac egestas dapibus. Sed feugiat purus dui, in auctor justo mattis at.</Text>
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
  parent: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'flex-end'
  },
  scroll: {
    flex: 2
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
    fontFamily: 'montSerrat'
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const TermsConfigurationScreen = connect(mapStateToProps)(TermsConfigurationScreenComponent);
export { TermsConfigurationScreen };