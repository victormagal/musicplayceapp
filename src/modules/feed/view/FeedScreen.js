import React from 'react';
import {StyleSheet, ScrollView, Text, View, ViewPagerAndroid, FlatList} from 'react-native';
import { MPHeader, MPTextField, MPFooter, MPArtist, MPSong, MPGradientButton } from '../../../components'
import { connect } from 'react-redux';

class FeedScreenContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          textValue: '',
          songHeader: true,
          notFoundArtist: false,
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

  checkArtistName = (value) => {
    this.setState({textValue: value});
    if(value == 'Madonna'){
      this.setState({notFoundArtist: true});
    }else{
      this.setState({notFoundArtist: false});
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={""} />
        <ViewPagerAndroid
            style={styles.viewPager}
            initialPage={0}>
            <View style={styles.pageStyle} key="1">
                <Text>First page</Text>
            </View>
            <View style={styles.pageStyle} key="2">
                <Text>Second page</Text>
            </View>
        </ViewPagerAndroid>
        <MPFooter />
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
  }, viewPager: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'stretch',
  },
  pageStyle: {
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const FeedScreen = connect(mapStateToProps)(FeedScreenContainer);
export {FeedScreen};