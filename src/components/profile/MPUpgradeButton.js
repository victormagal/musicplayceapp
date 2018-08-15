import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {MPText} from '../../components';
import {MPUpgradeNoteIcon} from '../../assets/svg';
import {MPGradientButton} from '../buttons';

class MPUpgradeButton extends Component {

  render() {
    return (
      <View style={ styles.parent }>
        <View style={styles.upgradeContainer}>
          <MPUpgradeNoteIcon style={{alignSelf: 'center',}}/>
          <MPText style={ styles.upgradeText}>Assine o plano premium para cadastrar mais músicas!</MPText>
          <MPGradientButton title='Fazer upgrade' textSize={14} onPress={() => console.log('upgrade plan')}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: 35
  },
  upgradeContainer: {
    justifyContent: 'space-between',
    width: 150
  },
  upgradeText: {
    fontSize: 16,
    paddingVertical: 20,
    fontFamily: 'ProbaPro-Regular',
    color: '#777777',
    textAlign: 'center',
    flexWrap: 'wrap',
  }
});

export {MPUpgradeButton};

