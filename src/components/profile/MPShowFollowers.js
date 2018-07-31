import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import {
  MPArtist,
  MPText
} from '../../components'
import { MPGroupIcon } from "../../assets/svg";

class MPShowFollowers extends Component {
  state = {
    tabIndex: 0,
  };

  changeTabIndex = (tabIndex) => {
    const { following, followers } = this.props;
    this.setState({ tabIndex });
    const hasToScroll = tabIndex === 0 ? following.length > 0 : followers.length > 0;

    if (hasToScroll) {
      this.flatList.scrollToIndex({ index: 0 });
    }
  };

  renderArtists = ({ item }) => (
    <MPArtist
      artist={item}
      onPress={() => this.props.navigation.navigate('ArtistProfileScreen', { artistId: item.id })}
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
            ref={ref => this.flatList = ref}
            data={tabIndex === 0 ? following : followers}
            keyExtractor={(item) => item.id}
            renderItem={this.renderArtists}
            horizontal={true}
            ListEmptyComponent={() => (
              <View style={{ width: Dimensions.get('screen').width - 40, alignItems: 'center' }}>
                <MPGroupIcon style={{ width: 50, height: 50 }}/>
                <MPText style={styles.noContent}>
                  { `Ainda não ${ tabIndex === 0 ? 'está \nseguindo' : 'é \nseguido por' } ninguém.` }
                </MPText>
              </View>
            )}
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
  },
  noContent: {
    marginTop: 8,
    color: '#626262',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular'
  }
});

export {MPShowFollowers};

