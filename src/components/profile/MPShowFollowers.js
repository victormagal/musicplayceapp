import React, {Component} from 'react';
import {StyleSheet, View, FlatList, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {MPArtist, MPText} from '../../components'
import images from '../../assets/img';

class MPShowFollowers extends Component {
  state = {
    tabIndex: 0,
  };

  changeTabIndex = (tabIndex) => {
    this.setState({ tabIndex });
  };

  renderArtists = ({ item}) => (
    <MPArtist
      artist={item}
      onPress={()=>{}}
      isFollowing={this.state.tabIndex === 0}
    />
  );

  render() {
    const { tabIndex } = this.state;
    const  { followers, following } = this.props;

    return (
      <View>
        <View style={ styles.tabTitlesContainer }>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.changeTabIndex(0)}
            style={[ styles.tabMargin, tabIndex === 0
              ? styles.selectedTitleContainer
              : styles.notSelectedTitleContainer
            ]}
          >
            <MPText style={ tabIndex === 0 ? styles.selectedTitleText : styles.notSelectedTitleText }>
              SEGUINDO
            </MPText>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.changeTabIndex(1)}
            style={[ styles.tabMargin, tabIndex === 1
              ? styles.selectedTitleContainer
              : styles.notSelectedTitleContainer
            ]}
          >
            <MPText style={ tabIndex === 1 ? styles.selectedTitleText : styles.notSelectedTitleText }>
              SEGUIDORES
            </MPText>
          </TouchableHighlight>
        </View>
        <View style={styles.sliderContainer}>
          <FlatList
            data={tabIndex === 0 ? following : followers}
            keyExtractor={(item) => item.id}
            renderItem={this.renderArtists}
            horizontal={true}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabTitlesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FCFCFC',
    paddingTop: 30,
    paddingBottom: 10,
  },
  selectedTitleContainer: {
    alignSelf: 'center',
    paddingVertical: 5,
    borderBottomWidth: 3,
    borderColor: '#e13223',
  },
  notSelectedTitleContainer: {
    alignSelf: 'center',
    paddingVertical: 5,
  },
  sliderContainer: {
    height: 200,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FCFCFC',
  },
  notSelectedTitleText: {
    flex: 1,
    color: '#626262',
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Regular'
  },
  selectedTitleText: {
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Bold',
  },
  tabMargin: {
    marginEnd: 20
  }
});

export {MPShowFollowers};

