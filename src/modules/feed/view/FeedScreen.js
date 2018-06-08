import React from 'react';
import {StyleSheet, ScrollView, Text, View, ViewPagerAndroid, FlatList} from 'react-native';
import { MPHeader, MPTextField, MPFooter, MPArtist, MPSong, MPGradientButton, MPText } from '../../../components'
import { connect } from 'react-redux';
import Swiper from 'react-native-swiper';

class FeedScreenContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          textValue: '',
          songHeader: true,
          notFoundArtist: false,
          tabIndex: 0,
        }

    }
  handleBackClick = () => {
    this.props.navigation.pop();
  };

  goToScreen = (route) => {
    this.props.navigation.navigate(route);
  }
  
  renderItem = ({item}) => (
    <MPArtist artist={item.title} backgroundColor={item.backgroundColor} onPress={this.goToScreen.bind(this, 'IndicateSongFeedbackScreen')} style={{marginBottom: 10,}} />
  )

  toggleState = (att) => {
    this.setState({[att]: !this.state.songHeader});
  }

  changeTabIndex = (index) => {
    this.setState({tabIndex: index});
    console.log(index)
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={""} />
        <MPTextField label={'Pesquise pelo nome, músicas e temas'} value={''} style={{backgroundColor: '#FFF', marginHorizontal: 20}}/>
        {
          this.state.tabIndex == 0 ? (
            <View style={ styles.tabTitlesContainer }>
              <View style={ styles.selectedTitleContainer }>
                <MPText style={ styles.selectedTitleText }>Para você</MPText>
              </View>
              <View style={ styles.notSeletecTitleContainer }>
              <MPText style={ styles.notSeletecTitleText}>Seguindo</MPText>  
              </View>
            </View>
          ) : (
            <View style={ styles.tabTitlesContainer }>
              <View style={ styles.notSeletecTitleContainer }>
                <MPText style={ styles.notSeletecTitleText }>Para você</MPText>
              </View>
              <View style={ styles.seletecTitleContainer }>
              <MPText style={ styles.seletecTitleText}>Seguindo</MPText>  
              </View>
            </View>
          )
        }
        <Swiper  style={ styles.swiperWrapper }
          showsPagination={false}
          onIndexChanged={ this.changeTabIndex }
           loop={false}>
          <View style={ styles.slider1 }>
            <Text>slider 1</Text>
          </View>
          <View style={ styles.slider2}>
            <Text>slider 2</Text>
          </View>
        </Swiper>
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
    justifyContent: 'flex-end'
  },
  scroll: {
    flex: 2,
  },
  slider1: {
    flex: 1,
    backgroundColor: '#F60',
  },
  slider2: {
    flex: 1,
    backgroundColor: '#6F0',
  },
  tabTitlesContainer: {
    flexDirection: 'row',
  },
  selectedTitleContainer: {
    flex: 1,
    alignContent: 'center',
    paddingTop: 17,
    paddingBottom: 17,
    borderBottomWidth : 3,
    borderColor: '#e13223',
  },
  notSeletecTitleContainer: {
    flex: 1,
    alignContent: 'center',
    paddingTop: 17,
    paddingBottom: 17
  },
  notSelectedTitleText:{
    color: '#626262',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'montSerrat'
  },
  selectedTitleText:{
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'montSerratBold',
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const FeedScreen = connect(mapStateToProps)(FeedScreenContainer);
export {FeedScreen};