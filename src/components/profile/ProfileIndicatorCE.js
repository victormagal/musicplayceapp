import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {MPText} from '../general';
import PropTypes from 'prop-types';

class ProfileIndicatorCE extends Component {
  renderEmpty() {
    const { style, titlePlural, subtitle, onEmptyClick } = this.props;
    return (
      <View style={style}>
        <MPText style={styles.titleEmpty}>
          { titlePlural.toUpperCase() }
        </MPText>
        <View style={styles.top}/>
        <TouchableOpacity onPress={onEmptyClick}>
          <MPText style={styles.subtitle}>
            { subtitle }
          </MPText>
        </TouchableOpacity>
      </View>
    );
  }

  renderIndicator() {
    let { style, title, titlePlural, titleZero, count} = this.props;

    if(typeof count === 'undefined'){
      count = 0;
    }

    let label = count <= 1 ? title : titlePlural;
    label = count === 0 ? titlePlural : label;

    const moreThan1k = count > 1000 ? `${ count/1000 }K` : count;
    const finalCount = count > 1000000 ? `${ count/1000000 }M` : moreThan1k;

    return (
      <View style={style}>
        <View style={styles.top}/>
        <View style={{ flexDirection: 'row' }}>
          <MPText style={styles.countText}>
            { finalCount }
          </MPText>
          <MPText style={styles.labelText} numberOfLines={2}>
            { label.toUpperCase() }
          </MPText>
        </View>
      </View>
    );
  }

  render() {
    const { count, me } = this.props;
    if (!me || count || count > 0) {
      return this.renderIndicator()
    }
    return this.renderEmpty()
  }
}

ProfileIndicatorCE.propTypes = {
  style: PropTypes.any,
  title: PropTypes.string.isRequired,
  titlePlural: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  me : PropTypes.bool,
  onEmptyClick : PropTypes.func
};

const styles = StyleSheet.create({
  top: {
    width: 40,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
  countText: {
    fontSize: 24,
    fontFamily: 'Montserrat-Black',
    fontWeight: "900",
    color: "#FFF",
    marginRight: 4
  },
  titleEmpty: {
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    fontWeight: "500",
    fontSize: 12,
    marginBottom: 11,
  },
  labelText: {
    color: '#000',
    fontWeight: "500",
    fontSize: 12,
    width: 100,
    marginTop: 6,
    fontFamily: 'Montserrat-Medium'
  },
  subtitle: {
    fontSize: 13,
    marginTop: 9,
    color: "#FFF",
    fontFamily: 'Montserrat-Bold',
    textDecorationLine: "underline"
  }
});

export {ProfileIndicatorCE};

