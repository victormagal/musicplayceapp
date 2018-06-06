import React from 'react';
import {StyleSheet, ScrollView, Text, View, TextInput} from 'react-native';
import { Icon } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import { MPHeader, MPTextField, MPFooter } from '../../components'
import { connect } from 'react-redux';

class IndicateSongSearchScreenContainer extends React.Component {
  
  handleBackClick = () => {
    this.props.navigation.pop();
  };

  goToScreen = (route) => {
    this.props.navigation.navigate(route);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={""} />
        <ScrollView>
        {
          this.props.fontLoaded ? (
            <View>
              <Text style={{fontSize: 20, color: '#f00'}}>Search</Text>
            </View>
          ) : null
        }
        </ScrollView>
        <MPFooter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'flex-end'
  },
  scroll: {
    flex: 2,
  },
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const IndicateSongSearchScreen = connect(mapStateToProps)(IndicateSongSearchScreenContainer);
export {IndicateSongSearchScreen};