import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {MPHeader, MPTextField, MPFooter, MPTabBar, MPText, MPFeedNotification} from '../../../components'
import {connect} from 'react-redux';


class FeedScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    }

    this.artistList = {
      data: [
          {
              id: '00',
              artistName: 'Vitor e leo',
              composerName: 'Rick Joe',
              songName: 'Música Xis',
              timeText: '1m',
              type: '',
          },
      ]
  }
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  renderItem = ({item}) => (
    <MPFeedNotification artistName={item.artistName} composerName={item.composerName} songName={item.songName} timeText={item.timeText}/>
  )

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={""}/>
        <MPTextField label={'Pesquise pelo nome, músicas e temas'} value={''}
                     style={{backgroundColor: '#FFF', marginHorizontal: 20}}/>
        <MPTabBar firstTabTitle={'PARA VOCÊ'} secondTabTitle={"SEGUINDO"}>
          <View style={styles.firstSliderContainer}>
          <FlatList data = {this.artistList.data}
                      keyExtractor={(item,index) => item.id} 
                      renderItem={this.renderItem} />
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
