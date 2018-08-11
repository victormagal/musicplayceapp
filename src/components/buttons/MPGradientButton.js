import React, {Component} from 'react';
import { 
  StyleSheet,
  TouchableOpacity 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import { MPText } from '../general/MPText';

class MPGradientButtonComponent extends Component {

  state = {
    textStyleRef: null
  };

  constructor(props){
    super(props);

    let { selected, textSize} = this.props;
    if (selected == null) {
      selected = true;
    }

    this.state.textStyleRef = this.setupText(textSize, selected);
  }

  componentWillReceiveProps(newProps){
    let { selected, textSize} = this.props;

    if(newProps.textSize !== textSize || newProps.selected !== selected){
      this.setState({
        textStyleRef: this.setupText(newProps.textSize, newProps.selected)
      });
    }
  }

  setupText(textSize, selected){
    let newTextStyle = {...textStyle};
    newTextStyle.fontSize = textSize ? textSize : 12;
    newTextStyle.color = selected ? '#FFFFFF' : '#E13223';
    if (this.props.icon){
      newTextStyle.paddingLeft = 30;
    }

    return StyleSheet.create({textStyle: newTextStyle}).textStyle;
  }

  render() {
    let {style, title, selected, onPress, icon, disabled} = this.props;
    if (selected == null) {
      selected = true;
    }

    let borderStyle = selected ? {} : {borderWidth: 1, borderColor: '#E13223'};
    const gradient = disabled ? ['#A9A9A9', '#CCC'] : ['#BB1A1A', '#2E2C9D'];
    let linearColorOptions = [gradient, ['transparent', 'transparent']];
    let linearColor = selected ? linearColorOptions[0] : linearColorOptions[1];

    let Icon = icon;

    return (
      <TouchableOpacity style={[styles.container, style || {}]} onPress={onPress} disabled={disabled}>
        <LinearGradient
          colors={linearColor}
          start={{x: 0, y: 0}}
          end={{x: 1, y:0}}
          style={[styles.linear, borderStyle]}
          selected={true}>
          <MPText style={this.state.textStyleRef} numberOfLines={1}>
            {title}
          </MPText>
          {icon && <Icon style={styles.icon}/>}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

MPGradientButtonComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  textSize: PropTypes.number,
  style: PropTypes.any,
  selected: PropTypes.bool,
  icon: PropTypes.any
};

const textStyle = {
  fontFamily: 'Montserrat-SemiBold',
  backgroundColor: 'transparent',
  fontSize: 10,
  color: '#FFFFFF'
};

const styles = StyleSheet.create({
  container: {
    height: 40
  },
  linear: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  icon: {
    position: 'absolute',
    left: 4
  }
});

const MPGradientButton = MPGradientButtonComponent;
export {MPGradientButton};
