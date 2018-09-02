import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TermsSettingsScreen } from '../../../settings/view/TermsSettingsScreen';
import { MPGradientButton } from '../../../../components';

class TermsConditionsScreen extends Component {

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF', paddingBottom: 40 }}>
        <TermsSettingsScreen
          showTopics={false}
          terms={false}
          navigation={this.props.navigation}
        />
        <View style={styles.acceptButton}> 
          <MPGradientButton
            title={"Voltar"}
            textSize={16}
            style={{ width: Dimensions.get('screen').width - 40 }}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  acceptButton: {
    flex: 0,
    bottom: 0,
    zIndex: 2,
    alignSelf: 'center',
    marginBottom: 15,
    position: 'absolute',
    backgroundColor: 'transparent'
  }
})

const mapStateToProps = ({ termsReducer }) => {
  return {...termsReducer};
};

const TermsScreen = connect(mapStateToProps)(TermsConditionsScreen);
export {TermsScreen};
