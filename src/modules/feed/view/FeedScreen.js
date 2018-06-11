import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MPHeader, MPTextField, MPFooter, MPTabBar} from '../../../components'
import {connect} from 'react-redux';


class FeedScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    }

  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };


  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={""}/>
        <MPTextField label={'Pesquise pelo nome, músicas e temas'} value={''}
                     style={{backgroundColor: '#FFF', marginHorizontal: 20}}/>
        <MPTabBar firstTab={'PARA VOCÊ'} secondTab={"SEGUINDO"} style={{flex: 1}}>
          <View style={styles.slider1}><Text>slider1</Text></View>
          <View style={styles.slider2}><Text>slider2</Text></View>
        </MPTabBar>
        <MPFooter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FFF',
  },

  slider1: {
    backgroundColor: '#F60',
    justifyContent: 'center',
    alignContent: 'center',
  },
  slider2: {
    backgroundColor: '#6F0',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const FeedScreen = connect(mapStateToProps)(FeedScreenContainer);
export {FeedScreen};
