import React from 'react';
import {
  StyleSheet, TouchableHighlight, View
} from 'react-native';
import { MPText } from '../general/MPText';


class MPTabBar extends React.Component {
  state = {
    selected: 0,
  };

  componentWillReceiveProps(nextProps){
    if(typeof nextProps.index !== 'undefined'){
      this.setState({selected: nextProps.index});
    }
  }

  changeTabIndex = (index) => {
    this.setState({selected: index});
    this.props.onTabChange && this.props.onTabChange(index);
  };

  render() {
    let {titles} = this.props;
    return (
      <View style={styles.parent}>
        <View style={ styles.tabTitlesContainer }>
          {titles.map((title, index) =>
            <TouchableHighlight key={index} underlayColor="transparent" onPress={this.changeTabIndex.bind(this, index)}
                                style={this.state.selected === index ? styles.selectedTitleContainer : styles.notSeletecTitleContainer }>
              <MPText style={this.state.selected === index ? styles.selectedTitleText : styles.notSeletecTitleText}>
                {title}
              </MPText>
            </TouchableHighlight>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent:{
    height: 48,
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
    fontFamily: 'Montserrat-Regular'
  },
  selectedTitleText: {
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Bold',
  }
});

export {MPTabBar};
