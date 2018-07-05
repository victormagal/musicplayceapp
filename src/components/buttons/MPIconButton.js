import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {MPText} from '../general/MPText';

class MPIconButton extends Component {

  state = {
    selected: false
  };

  componentWillReceiveProps(nextProps){
    if(typeof nextProps.selected !== 'undefined'){
      this.setState({selected: nextProps.selected});
    }
  }

  handlePress = (e) => {
    let {iconSelected, onPress} = this.props;

    if(iconSelected){
      this.setState({selected: !this.state.selected});
    }

    onPress && onPress(e);
  };

  renderIcon(){
    let {icon, iconStyle, iconSelected} = this.props;
    iconStyle = iconStyle || {};

    let Icon = icon;
    let IconSelected = iconSelected;

    if(this.state.selected){
      return <IconSelected style={[styles.icon, iconStyle]} />
    }

    if(icon) {
      return <Icon style={[styles.icon, iconStyle]}/>;
    }

    return null;
  }

  render() {
    let {style, title, titleStyle} = this.props;
    titleStyle = titleStyle || {};

    return (
      <TouchableOpacity style={style || {}} onPress={this.handlePress}>
        {this.renderIcon()}
        {title && (
          <MPText style={[styles.text, titleStyle]}>
            {title.toUpperCase()}
          </MPText>
        )}
      </TouchableOpacity>
    );
  }
}

MPIconButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.any,
  icon: PropTypes.any,
  iconSelected: PropTypes.any,
  iconStyle: PropTypes.any,
  titleStyle: PropTypes.any
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "500",
    fontFamily: 'montSerratMedium',
    color: '#fff',
    textAlign: 'center'
  },
  icon: {
    alignSelf: 'center'
  }
});

export {MPIconButton};
