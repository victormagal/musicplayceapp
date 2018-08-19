import React, {Component} from 'react';
import {
  StyleSheet, View, FlatList, Dimensions, TouchableOpacity, ActivityIndicator
} from 'react-native';
import {
  MPUser, MPText
} from '../../components'
import { MPGroupIcon } from "../../assets/svg";

class MPShowFollowers extends Component {
  state = {
    tabIndex: 0,
  };

  changeTabIndex = (tabIndex) => {
    this.setState({ tabIndex });
  };

  handlePagination = () => {
    if(this.state.tabIndex === 0){
      this.props.onFollowingsPagination();
    }else{
      this.props.onFollowersPagination();
    }
  };

  renderFooter = () => {
    if(this.props.userFollowingLoading || this.props.userFollowersLoading) {
      return (
        <View style={styles.containerLoading}>
          <ActivityIndicator size="large" color="#BB1A1A" style={styles.loading}/>
        </View>
      );
    }

    return null;
  };

  renderUsers = ({ item }) => (
    <MPUser
      key={item.id}
      user={item}
      hideSettings={this.props.hideSettings}
      onToggleFollowUser={this.props.onToggleFollowUser}
      onPress={() => this.props.onFollowerFollowingClick(item)}
    />
  );

  render() {
    const { tabIndex } = this.state;
    const  { followers, following, userFollowingLoading, userFollowersLoading } = this.props;

    return (
      <View>
        <View style={ styles.tabTitlesContainer }>
          <TouchableOpacity
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
          </TouchableOpacity>
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
        <View style={styles.sliderContainer}>
          {this.state.tabIndex == 0 && (
            <FlatList
              data={following}
              keyExtractor={(item) => item.id}
              renderItem={this.renderUsers}
              onEndReached={this.handlePagination}
              onEndReachedThreshold={0.1}
              horizontal={true}
              ListFooterComponent={this.renderFooter}
              ListEmptyComponent={() => (
                <View style={{ width: Dimensions.get('screen').width - 40, alignItems: 'center' }}>
                  <MPGroupIcon style={{ width: 50, height: 50 }}/>
                  <MPText style={styles.noContent}>
                    { `Ainda não ${ tabIndex === 0 ? 'está \nseguindo' : 'é \nseguido por' } ninguém.` }
                  </MPText>
                </View>
              )}
            />
          )}

          {this.state.tabIndex == 1 && (
            <FlatList
              data={followers}
              keyExtractor={(item) => item.id}
              renderItem={this.renderUsers}
              onEndReached={this.handlePagination}
              onEndReachedThreshold={0.1}
              horizontal={true}
              ListFooterComponent={this.renderFooter}
              ListEmptyComponent={() => (
                <View style={{ width: Dimensions.get('screen').width - 40, alignItems: 'center' }}>
                  <MPGroupIcon style={{ width: 50, height: 50 }}/>
                  <MPText style={styles.noContent}>
                    { `Ainda não ${ tabIndex === 0 ? 'está \nseguindo' : 'é \nseguido por' } ninguém.` }
                  </MPText>
                </View>
              )}
            />
          )}
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
  },
  containerLoading: {
    width: 100,
    height: 152,
    justifyContent: 'center'
  },
  loading: {
    alignSelf:'center'
  }
});

export {MPShowFollowers};

