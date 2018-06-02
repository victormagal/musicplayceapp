import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { MPArrowRightIcon } from '../../assets/svg';
import { connect } from 'react-redux';

class MPItemListComponent extends React.Component {

  onPress = (rota) => {
    this.props.navigation.navigate(rota);
  }

  renderPaths(item) {
    if (item.paths) {
      return item.paths.map((p, index) => {
        return <Path
        key={index}
        fill={p.fill}
        stroke={p.stroke}
        strokeWidth={p.strokeWidth}
        strokeLinecap={p.strokeLinecap}
        strokeLinejoin={p.strokeLinejoin}
        d={p.d}
        />
      })
    } else {
      return false;
    }
  }

  render() {
    let { item } = this.props;
    return (
      <TouchableHighlight onPress={this.onPress.bind(this, item.rota)} underlayColor="transparent">
        <View style={styles.item}>
          {
            item.paths ? (
              <View style={styles.boxIcon}>
                <Svg width={item.width} height={item.height} viewBox={item.viewBox}>
                  {this.renderPaths(item)}
                </Svg>
              </View>
            ) : null
          }
          <View style={styles.boxText}>
            {
              this.props.fontLoaded ? (
                <Text style={styles.text}>
                  {item.name}
                </Text>
              ) : null
            }
          </View>
          <View style={styles.boxFoward}>
            <MPArrowRightIcon />
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
    marginVertical: 10,
    flexDirection: 'row',
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