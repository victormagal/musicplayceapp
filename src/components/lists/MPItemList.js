import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { MPArrowRightIcon } from '../../assets/svg';
import { connect } from 'react-redux';

class MPItemListComponent extends React.Component {

  onPress = (rota) => {
    this.props.navigation.navigate(rota);
  }

  render() {
    let { item } = this.props;
    let Icon = item.icon;
    let IconNext = item.iconNext;
    return (
      <TouchableHighlight onPress={this.onPress.bind(this, item.rota)} underlayColor="transparent">
        <View style={styles.item}>
          {
            item.icon ? (
              <View style={styles.boxIcon}>
                <Icon />
              </View>
            ) : null
          }
          <View style={styles.boxText}>
            {
              this.props.fontLoaded ? (
                <Text style={styles.text}>
                  {item.title}
                </Text>
              ) : null
            }
          </View>
          <View style={styles.boxFoward}>
            <IconNext />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
  boxIcon: {
    display: 'flex',
    flex: 0.05,
    marginLeft: 12,
    paddingRight: 12,
    borderRightWidth: 2,
    borderRightColor: '#F6F6F6',
    alignItems: 'center'
  },
  boxText: {
    marginLeft: 10,
    flex: 0.9
  },
  text: {
    color: 'black',
    fontFamily: 'montSerrat',
    fontSize: 16
  },
  boxFoward: {
    display: 'flex',
    flex: 0.05,
    paddingRight: 10,
    alignItems: 'flex-end'
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPItemList = connect(mapStateToProps)(MPItemListComponent);
export { MPItemList };