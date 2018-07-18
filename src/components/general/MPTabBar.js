import React from 'react';
import {
  StyleSheet, TouchableHighlight, View
} from 'react-native';
import { connect } from 'react-redux';
import { MPText } from '../general/MPText';
import Swiper from 'react-native-swiper';


class MPTabBarComponent extends React.Component {
  state = {
    tabIndex: 0,
  };

  changeTabIndex = (index) => {
    this.setState({tabIndex: index});
  };

  render() {
    let {firstTabTitle, secondTabTitle, secondLayout} = this.props;
    return (
      <View style={styles.parent} {...this.props}>
        {this.state.tabIndex == 0 ? (
            <View style={ styles.tabTitlesContainer }>
              <TouchableHighlight underlayColor="transparent" onPress={ this.changeTabIndex.bind(this, 0)} style={ styles.selectedTitleContainer }>
                <MPText style={ styles.selectedTitleText }>{firstTabTitle}</MPText>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="transparent" onPress={ this.changeTabIndex.bind(this, 1)} style={ styles.notSeletecTitleContainer }>
                <MPText style={ styles.notSeletecTitleText}>{secondTabTitle}</MPText>
              </TouchableHighlight>
            </View>
          ) : (
            <View style={ styles.tabTitlesContainer }>
              <TouchableHighlight underlayColor="transparent" onPress={this.changeTabIndex.bind(this, 0)} style={ styles.notSeletecTitleContainer }>
                <MPText style={ styles.notSeletecTitleText }>{ firstTabTitle }</MPText>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="transparent" onPress={this.changeTabIndex.bind(this, 1)} style={ styles.selectedTitleContainer }>
                <MPText style={ styles.selectedTitleText}>{secondTabTitle}</MPText>
              </TouchableHighlight>
            </View>
        )}
        <Swiper showsPagination={false}
          onIndexChanged={this.changeTabIndex}
          index={this.state.tabIndex}
          loop={false}>
          {this.props.children}
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent:{
    flex: 1,
    backgroundColor: 'white'
  },
  tabTitlesContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  selectedTitleContainer: {
    flex: 1,
    alignContent: 'center',
    paddingTop: 17,
    paddingBottom: 17,
    borderBottomWidth: 3,
    borderColor: '#e13223',
  },
  notSeletecTitleContainer: {
    flex: 1,
    alignContent: 'center',
    paddingTop: 17,
    paddingBottom: 17,
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
  },
  notSeletecTitleText: {
    flex: 1,
    color: '#626262',
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'montSerrat'
  },
  selectedTitleText: {
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'montSerratBold',
  }
});

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const MPTabBar = connect(mapStateToProps)(MPTabBarComponent);
export {MPTabBar};
