import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class MPFooter extends React.Component {

  onPress = () => {
    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.onPress} activeOpacity={0.5} underlayColor="transparent">
          <Svg width="20" height="22" viewBox="0 0 29 32">
            <Path
              fill="#999999"
              d="M13.091 10.182h10.182v1.455h-10.182zM13.091 20.364h10.182v1.455h-10.182z"
            />
            <Path
              fill="#999999"
              d="M4.364 4.364h17.455v2.909h-17.455zM4.364 10.182h7.273v7.273h-7.273zM4.364 20.364h7.273v7.273h-7.273z"
            />
            <Path
              fill="#999999"
              d="M13.091 13.091h11.636v1.455h-11.636zM13.091 23.273h11.636v1.455h-11.636z"
            />
            <Path
              fill="none"
              stroke="#999999"
              strokeWidth="1.4545"
              strokeMiterlimit="4"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              d="M28.364 31.273v-30.545h-27.636v30.545h27.636z"
            />
            <Path
              fill="#999999"
              d="M13.091 16h10.182v1.455h-10.182zM13.091 26.182h10.182v1.455h-10.182z"
            />
          </Svg>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.onPress} activeOpacity={0.5} underlayColor="transparent">
          <Svg width="18" height="22" viewBox="0 0 35 32">
            <Path
              fill="none"
              stroke="#999999"
              strokeWidth="1.4545"
              strokeMiterlimit="4"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              d="M23.818 12.844v-0.017c0.167-7.219-4.413-12.099-10.727-12.099-6.249 0-10.727 4.825-10.727 12.116v7.67c0 0.785-0.255 1.321-0.86 2.161l-0.096 0.132c-0.518 0.716-0.681 1.055-0.681 1.543 0 0.611 0.49 1.104 1.095 1.104h22.537c0 0 0 0 0 0 0.605 0 1.095-0.49 1.095-1.095 0-0.003 0-0.005-0-0.008v0c0-0.378-0.151-0.7-0.598-1.34l-0.089-0.127c-0.687-0.979-0.95-1.527-0.95-2.371v-7.671zM10.182 28.364l0.007 0.029c0.348 1.304 1.518 2.25 2.91 2.25 1.388 0 2.556-0.94 2.902-2.218l0.005-0.021 0.009-0.039h-5.833z"
            />
            <Path
              fill="#999999"
              d="M34.909 8.727c0 4.82-3.907 8.727-8.727 8.727s-8.727-3.907-8.727-8.727c0-4.82 3.907-8.727 8.727-8.727s8.727 3.907 8.727 8.727z"
            />
          </Svg>
        </TouchableHighlight>
        <TouchableHighlight style={styles.buttonActive} onPress={this.onPress} activeOpacity={0.5} underlayColor="transparent">
          <Svg width="18" height="22" viewBox="0 0 26 32">
            <Path
              fill="#E13223"
              d="M13.073 0c3.706 0 6.711 2.54 6.711 6.889 0 4.348-3.004 7.871-6.711 7.871-3.705 0-6.71-3.523-6.71-7.871 0-4.349 3.005-6.889 6.71-6.889zM13.073 32c-5.1 0-9.472-1.409-13.073-4.044 0.015-0.673 0.029-1.924 0.045-2.071 0.655-5.712 6.153-7.745 12.838-7.745 0.065 0 0.127 0.004 0.189 0.006 0.064 0 0.128-0.006 0.191-0.006 6.687 0 12.183 2.033 12.838 7.745 0.016 0.148 0.033 1.398 0.047 2.073-3.584 2.583-8.029 4.042-13.073 4.042z"
            />
          </Svg>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: {
      width: 2,
      height: 0
    },
    marginTop: 20
  },
  button: {
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1
  },
  buttonActive: {
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#E13223'
  }
});

export { MPFooter };