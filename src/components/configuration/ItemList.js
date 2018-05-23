import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { connect } from 'react-redux';

class ItemListComponent extends React.Component {

  onPress = (rota) => {
    this.props.navigation.navigate(rota);
  }

  renderPaths(item) {
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
  }

  render() {
    let { item } = this.props;
    return (
      <TouchableHighlight onPress={this.onPress.bind(this, item.rota)} underlayColor="transparent">
        <View style={styles.item}>
          <View style={styles.boxIcon}>
            <Svg width={item.width} height={item.height} viewBox={item.viewBox}>
              {this.renderPaths(item)}
            </Svg>
          </View>
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
            <Svg width='8' height='14' viewBox='0 0 18 32'>
              <Path
                fill='#2424d3'
                d='M13.365 15.977l-12.77 12.606c-0.367 0.36-0.594 0.86-0.594 1.414 0 0.557 0.23 1.060 0.6 1.42l0 0c0.8 0.779 2.091 0.777 2.885-0.007l14.206-14.021c0.367-0.36 0.595-0.861 0.595-1.415s-0.228-1.055-0.595-1.415l-0-0-14.208-13.973c-0.372-0.363-0.881-0.587-1.442-0.587s-1.070 0.224-1.443 0.587l0-0c-0.369 0.36-0.597 0.862-0.597 1.417s0.229 1.057 0.597 1.417l0 0 12.763 12.555z'
              />
            </Svg>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    height: 50,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    width: 32,
    marginLeft: 12,
    paddingRight: 12,
    borderRightWidth: 2,
    borderRightColor: '#F6F6F6',
    alignItems: 'center'
  },
  boxText: {
    marginLeft: 10,
    width: 260
  },
  text: {
    color: 'black',
    fontFamily: 'montSerrat',
    fontSize: 16
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const ItemList = connect(mapStateToProps)(ItemListComponent);
export { ItemList };