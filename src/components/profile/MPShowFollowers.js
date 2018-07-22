import React, {Component} from 'react';
import {StyleSheet, View, FlatList, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {MPArtist, MPText} from '../../components'
import images from '../../assets/img';

class MPShowFollowers extends Component {

  state = {
    tabIndex: 0,
  };

  changeTabIndex = (index) => {
    this.setState({tabIndex: index});
  };

  renderArtists = ({item}) => (
    <MPArtist artist={item.artistName} imagePath={item.imagePath} onPress={()=>{}} isFollowing={item.isFollowing}/>
  );

  render() {
    let {followers, following} = this.props;

    return (
      <View>
        {
          this.state.tabIndex == 0 ? (
              <View>
                <View style={ styles.secondTabTitlesContainer }>
                  <TouchableHighlight underlayColor="transparent" onPress={ this.changeTabIndex.bind(this, 0)}
                                      style={ [styles.secondSelectedTitleContainer, styles.tabMargin] }>
                    <MPText style={ styles.selectedTitleText }>SEGUINDO</MPText>
                  </TouchableHighlight>
                  <TouchableHighlight underlayColor="transparent" onPress={ this.changeTabIndex.bind(this, 1)}
                                      style={ styles.secondNotSeletecTitleContainer }>
                    <MPText style={ styles.notSeletecTitleText}>SEGUIDORES</MPText>
                  </TouchableHighlight>
                </View>
                <View style={styles.sliderContainer}>
                  <FlatList
                    data={following}
                    keyExtractor={(item) => item.id}
                    renderItem={this.renderArtists}
                    horizontal={true}
                  />
                </View>
              </View>
            ) : (
              <View>
                <View style={ styles.secondTabTitlesContainer }>
                  <TouchableHighlight underlayColor="transparent" onPress={this.changeTabIndex.bind(this, 0)}
                                      style={ [styles.secondNotSeletecTitleContainer, styles.tabMargin] }>
                    <MPText style={ styles.notSeletecTitleText }>SEGUINDO</MPText>
                  </TouchableHighlight>
                  <TouchableHighlight underlayColor="transparent" onPress={this.changeTabIndex.bind(this, 1)}
                                      style={ styles.secondSelectedTitleContainer }>
                    <MPText style={ styles.selectedTitleText}>SEGUIDORES</MPText>
                  </TouchableHighlight>
                </View>
                <View style={styles.sliderContainer}>
                  <FlatList
                    data={followers}
                    keyExtractor={(item) => item.id}
                    renderItem={this.renderArtists}
                    horizontal={true}
                  />
                </View>
              </View>
            )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  secondTabTitlesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FCFCFC',
    paddingTop: 30,
    paddingBottom: 10,
  },
  secondSelectedTitleContainer: {
    alignSelf: 'center',
    paddingVertical: 5,
    borderBottomWidth: 3,
    borderColor: '#e13223',
  },
  secondNotSeletecTitleContainer: {
    alignSelf: 'center',
    paddingVertical: 5,
  },
  sliderContainer: {
    height: 200,
    paddingTop: 20,
    backgroundColor: '#FCFCFC',
  },
  notSeletecTitleText: {
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

