import React from 'react';
import {
  Dimensions,
  StyleSheet, 
  TouchableHighlight, 
  View
} from 'react-native';
import {Card} from 'react-native-elements';
import { MPText } from '../../components';
import { connect } from 'react-redux';

class MPItemListComponent extends React.Component {
  render() {
    const { item } = this.props;
    const Icon = item.icon;
    const IconNext = item.iconNext;
    return (
      <TouchableHighlight onPress={item.onChooseOption} underlayColor="transparent">
        <Card containerStyle={styles.container}>
          <View style={styles.item}>
            {
              item.icon ?
                <View style={styles.boxIcon}>
                  <Icon />
                </View>
              : null
            }
            <View style={styles.boxText}>
              <MPText numberOfLines={1} style={styles.text}>
                { item.title }
              </MPText>
            </View>
            <View style={styles.boxFoward}>
              <IconNext />
            </View>
          </View>
        </Card>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginTop: 0,
    marginBottom: 20,
    marginHorizontal: Dimensions.get('window').width < 375 ? 15 : 20,
    paddingVertical: 15,
    borderRadius: 4
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 4
  },
  boxIcon: {
    display: 'flex',
    flex: 0,
    width: 37,
    paddingHorizontal: 12,
    borderRightWidth: 2,
    borderRightColor: '#F6F6F6',
    alignItems: 'center'
  },
  boxText: {
    marginLeft: 10,
    flex: 1
  },
  text: {
    color: 'black',
    fontFamily: 'Montserrat-Regular',
    fontSize: 16
  },
  boxFoward: {
    display: 'flex',
    flex: 0.05,
    paddingRight: 12,
    alignItems: 'flex-end'
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPItemList = connect(mapStateToProps)(MPItemListComponent);
export { MPItemList };
