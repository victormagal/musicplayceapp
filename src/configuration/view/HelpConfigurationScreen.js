import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MPHeader, MPTextField, MPToggleList, MPFooter } from '../../components';
import { connect } from 'react-redux';

// measurements = []
class HelpConfigurationScreenComponent extends React.Component {

  render() {

    return (
      <ScrollView style={styles.container}>
        <MPToggleList title="A Panel with short content text">
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </MPToggleList>
        <MPToggleList title="A Panel with long content text">
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nullam.</Text>
        </MPToggleList>
        <MPToggleList title="Another Panel">
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor eleifend consectetur. Duis eu dui mauris. Maecenas elementum nullam.</Text>
        </MPToggleList>
      </ScrollView>
      // <View style={styles.parent}>
      //   <MPHeader back={true} onBack={this.handleBackClick} title={"Pesquise sua dúvida ou consulte na lista abaixo"} />
      //   <ScrollView style={styles.scroll}>
      //     <MPTextField label={"Pesquisar"} />
      //     {
      //       this.props.fontLoaded ? (
      //         <View style={styles.container}>
      //           <TouchableHighlight onPress={this.animate.bind(this, Easing.quad)}>
      //           <View style={styles.boxText}>
      //             <Text style={styles.title}>Tópico 1 - Lorem ipsum</Text>
      //           </View>
      //           </TouchableHighlight>
      //           <Animated.View style={[styles.block, { altura }]}>
      //             <Text style={styles.paragraph}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ipsum ante, viverra vitae orci non, tincidunt ullamcorper sapien. Ut non leo consectetur, iaculis nisl vel, facilisis ante. Sed fermentum odio ac egestas dapibus. Sed feugiat purus dui, in auctor justo mattis at.</Text>
      //           </Animated.View>
      //         </View>
      //       ) : null
      //     }
      //   </ScrollView>
      //   <MPFooter />
      // </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7f9',
    paddingTop: 30
  },
  parent: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'flex-end'
  },
  scroll: {
    flex: 2
  },
  container: {
    marginTop: 30,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(104, 104, 104, 0.4)'
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
  },
  block: {
    height: 200,
    backgroundColor: 'red'
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const HelpConfigurationScreen = connect(mapStateToProps)(HelpConfigurationScreenComponent);
export { HelpConfigurationScreen };