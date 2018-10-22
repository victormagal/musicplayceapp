import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { MPText } from '../general';

class MPShowLanguagesComponent extends Component{

    render() {
      let { languages } = this.props;
      if (!Array.isArray(languages)) {
        languages = [];
      }
      return (
        <View style={ styles.parent }>
          <MPText style={ styles.placeHolderText}>
            Músicas em
          </MPText>
          { languages.map(language => (
            <MPText key={Math.random()} style={styles.languageText}>
              { language.name }
            </MPText>
          ))}
        </View>
      )
    }
}

const styles = StyleSheet.create({
    parent: {
      flexDirection: 'row',
      marginHorizontal : 20,
      marginBottom: 20
    },
    placeHolderText: {
      fontSize: 12,
      color : '#000',
      fontFamily: 'Montserrat-Medium'
    },
    languageText: {
      fontSize: 12,
      color : '#FFF',
      marginLeft: 12,
      fontFamily: 'Montserrat-Regular'
    }
});

const mapStateToProps = ({fontReducer}) => {
    return {...fontReducer};
};

const MPShowLanguages = connect(mapStateToProps)(MPShowLanguagesComponent);
export { MPShowLanguages };

