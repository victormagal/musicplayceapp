import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {MPText} from '../general';
import PropTypes from 'prop-types';

class ProfileIndicatorCE extends Component {

  renderEmpty() {
    let {style, title, subtitle} = this.props;

    return (
      <View style={style}>
        <MPText style={styles.titleEmpty}>
          {title}
        </MPText>
        <View style={styles.top}/>
        <TouchableOpacity onPress={this.props.onEmptyClick}>
          <MPText style={styles.subtitle}>
            {subtitle}
          </MPText>
        </TouchableOpacity>
      </View>
    );
  }

  renderIndicator() {
    let {style, title, count} = this.props;

    return (
      <View style={style}>
        <View style={styles.top}/>

        <TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <MPText style={styles.count}>{count}K</MPText>
            <MPText style={styles.title} numberOfLines={2}>{title.toUpperCase()}</MPText>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let {count} = this.props;

    if (count) {
      return this.renderIndicator()
    }

    return this.renderEmpty()
  }
}

ProfileIndicatorCE.propTypes = {
  style: PropTypes.any,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  onEmptyClick : PropTypes.func
};

const styles = StyleSheet.create({
  top: {
    width: 40,
    height: 1,
    backgroundColor: '#000000'
  },
  count: {
    fontSize: 24,
    fontWeight: "900",
    color: "#ffffff",
    marginRight: 4
  },
  titleEmpty: {
    color: '#000000',
    fontWeight: "500",
    fontSize: 11,
    marginBottom: 11
  },
  title: {
    color: '#000000',
    fontWeight: "500",
    fontSize: 11,
    marginBottom: 11,
    width: 100
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff",
    textDecorationLine: "underline",
    marginTop: 9
  }
});

export {ProfileIndicatorCE};

