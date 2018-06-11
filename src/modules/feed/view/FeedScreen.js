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
        <MPTabBar firstTabTitle={'PARA VOCÊ'} secondTabTitle={"SEGUINDO"}>
          <View style={styles.firstSliderContainer}>
            <View style={{marginHorizontal: 20, marginVertical: 12, flexDirection:'row',}}>
              <View style={{width: 40, height: 40, backgroundColor: '#f60'}}></View>

            </View>
          </View>
          <View style={styles.secondSliderContainer}>
            <Text>slider2</Text>
          </View>
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
  firstSliderContainer: {
    flex:1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'center',
    alignContent: 'center',
  },
  secondSliderContainer: {
    flex:1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const FeedScreen = connect(mapStateToProps)(FeedScreenContainer);
export {FeedScreen};
