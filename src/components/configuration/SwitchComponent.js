import React from 'react';
import { StyleSheet, Switch, View, Text } from 'react-native';
import { connect } from 'react-redux';

class SwitchElementComponent extends React.Component {

  state = {
    switchValue: true,
  };

  _handleToggleSwitch = () =>
    this.setState(state => ({
      switchValue: !state.switchValue,
    })
  );

  render() {
    return (
      <View style={styles.parent}>
        {
          this.props.fontLoaded ? (
            <View style={styles.areaSwitch}>
              <View style={styles.boxText}>
                <Text style={styles.text}>Celular</Text>
              </View>
              <View style={styles.boxSwitch}>
                <Switch
                  onValueChange={this._handleToggleSwitch}
                  value={this.state.switchValue}
                  onTintColor={"#BB1A1A"}
                />
              </View>
            </View>
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    marginTop: 20,
    marginHorizontal: 40,
    display: 'flex',
    backgroundColor: '#FCFCFC',
    justifyContent: 'flex-end'
  },
  areaSwitch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  boxText: {
    alignItems: 'flex-start',
    flex: 0.8
  },
  text: {
    fontSize: 14,
    fontFamily: 'montSerratMedium',
    color: '#000000'
  },
  boxSwitch: {
    alignItems: 'flex-end',
    flex: 0.2
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const SwitchElement = connect(mapStateToProps)(SwitchElementComponent);
export { SwitchElement };