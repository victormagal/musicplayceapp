import React from 'react';
import { 
  StyleSheet, 
  TouchableHighlight, 
  View
} from 'react-native';
import { MPText } from '../../components';
import { connect } from 'react-redux';

class MPItemListComponent extends React.Component {
  render() {
    const { item } = this.props;
    const Icon = item.icon;
    const IconNext = item.iconNext;
    return (
      <TouchableHighlight onPress={item.onChooseOption} underlayColor="transparent">
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
    flex: 0,
    width: 37,
    paddingRight: 12,
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
    paddingRight: 10,
    alignItems: 'flex-end'
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPItemList = connect(mapStateToProps)(MPItemListComponent);
export { MPItemList };
