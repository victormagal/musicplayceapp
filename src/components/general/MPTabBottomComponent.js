import React from 'react';
import {Card} from 'react-native-elements';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';


class MPTabBottomComponent extends React.Component {

  render() {
    const {navigation, onTabPress, jumpTo, renderIcon} = this.props;
    const { routes } = navigation.state;

    return (
      <Card containerStyle={styles.card} forceInset={{ bottom: 'always', top: 'never' }}>
        <View style={styles.container}>
          {routes.map((route, index) => {
            const focused = index === navigation.state.index;
            const addStyle = focused ? styles.buttonActive : {};
            const scene = { route, focused };

            return <TouchableOpacity style={[styles.button, addStyle]} key={route.key} onPress={() => {
              jumpTo(route.key);
              onTabPress({ route });
            }}>
              {renderIcon(scene)}
            </TouchableOpacity>;
          })}
        </View>
      </Card>
    );
  }
}


const styles = StyleSheet.create({
  card: {
    margin: 0,
    padding: 0
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF'
  },
  button: {
    alignItems: 'center',
    paddingVertical: 15,
    flex: 1
  },
  buttonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#E13223'
  }
});

/***
 *
 *  render() {
    const {
      navigation,
      activeBackgroundColor,
      inactiveBackgroundColor,
      onTabPress,
      jumpTo,
      style,
      tabStyle
    } = this.props;

    const { routes } = navigation.state;

    const tabBarStyle = [styles.tabBar, this._shouldUseHorizontalLabels() && !Platform.isPad ? styles.tabBarCompact : styles.tabBarRegular, style];

    return <SafeAreaView style={tabBarStyle} forceInset={{ bottom: 'always', top: 'never' }}>
        {routes.map((route, index) => {
        const focused = index === navigation.state.index;
        const scene = { route, focused };

        const backgroundColor = focused ? activeBackgroundColor : inactiveBackgroundColor;

        return <TouchableWithoutFeedback key={route.key} onPress={() => {
          jumpTo(route.key);
          onTabPress({ route });
        }}>
              <View style={[styles.tab, { backgroundColor }, this._shouldUseHorizontalLabels() ? styles.tabLandscape : styles.tabPortrait, tabStyle]}>
                {this._renderIcon(scene)}
                {this._renderLabel(scene)}
              </View>
            </TouchableWithoutFeedback>;
      })}
      </SafeAreaView>;
  }
 *
 *
 *
 */

export { MPTabBottomComponent };
