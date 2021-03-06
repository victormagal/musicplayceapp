import React from 'react';
import {
  StyleSheet, TouchableOpacity, View
} from 'react-native';
import { MPText } from '../general/MPText';


class MPTabBar extends React.Component {
  state = {
    selected: 0
  };

  componentWillReceiveProps(nextProps){
    if (typeof nextProps.index !== 'undefined') {
      this.setState({ selected: nextProps.index });
    }
  }

  changeTabIndex = (index) => {
    if(index === this.state.selected){
      return;
    }

    this.setState({ selected: index });
    this.props.onTabChange && this.props.onTabChange(index);
  };

  render() {
    const { selected } = this.state;
    const { titles } = this.props;
    return (
      <View style={{ backgroundColor: '#FFF' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          { titles.map((title, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => this.changeTabIndex(index)}
              style={selected === index ? styles.selectedTitleContainer : styles.notSelectedTitleContainer }>
              <MPText style={selected === index ? styles.selectedTitleText : styles.notSelectedTitleText}>
                { title }
              </MPText>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectedTitleContainer: {
    flex: 1,
    alignContent: 'center',
    paddingVertical: 17,
    borderBottomWidth: 3,
    borderBottomColor: '#e13223'
  },
  notSelectedTitleContainer: {
    flex: 1,
    alignContent: 'center',
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
  },
  notSelectedTitleText: {
    color: '#626262',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular'
  },
  selectedTitleText: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
  }
});

export {MPTabBar};
