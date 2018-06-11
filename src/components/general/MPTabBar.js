import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import {connect} from 'react-redux';
import {MPText} from '../general/MPText';
import Swiper from 'react-native-swiper';


class MPTabBarComponent extends React.Component {
  state = {
    tabIndex: 0,
  };

  changeTabIndex = (index) => {
    this.setState({tabIndex: index});
  };

  render() {
    let {firstTabTitle, secondTabTitle} = this.props;
    return (
      <View style={styles.parent} {...this.props}>
        {
          this.state.tabIndex == 0 ? (
              <View style={ styles.tabTitlesContainer }>
                <View style={ styles.selectedTitleContainer }>
                  <MPText style={ styles.selectedTitleText }
                          onPress={ this.changeTabIndex.bind(this, 0)}>{firstTabTitle}</MPText>
                </View>
                <View style={ styles.notSeletecTitleContainer }>
                  <MPText style={ styles.notSeletecTitleText}
                          onPress={ this.changeTabIndex.bind(this, 1)}>{secondTabTitle}</MPText>
                </View>
              </View>
            ) : (
              <View style={ styles.tabTitlesContainer }>
                <View style={ styles.notSeletecTitleContainer }>
                  <MPText style={ styles.notSeletecTitleText }
                          onPress={ this.changeTabIndex.bind(this, 0)}>{ firstTabTitle }</MPText>
                </View>
                <View style={ styles.selectedTitleContainer }>
                  <MPText style={ styles.selectedTitleText}
                          onPress={ this.changeTabIndex.bind(this, 1)}>{secondTabTitle}</MPText>
                </View>
              </View>
            )
        }
        <Swiper showsPagination={false}
                onIndexChanged={ this.changeTabIndex }
                index={this.tabIndex}
                loop={false}>
          {this.props.children}
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent:{
      flex:1,
  },
  tabTitlesContainer: {
    display: 'flex',
    flexDirection: 'row',
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
    paddingBottom: 17
  },
  notSeletecTitleText: {
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
