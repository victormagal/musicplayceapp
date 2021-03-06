import React from 'react';
import { 
  Animated, 
  StyleSheet, 
  TouchableHighlight,
  View 
} from 'react-native';
import { MPText } from '../general/MPText';
import { 
  MPArrowDownIcon, 
  MPArrowUpIcon 
} from '../../assets/svg';

class MPToggleList extends React.Component {

  DELAY = 150;
  timer = null;

  constructor(props) {
    super(props);

    this.icons = {
      'up': MPArrowUpIcon,
      'down': MPArrowDownIcon
    };

    this.state = {
      title: props.title,
      expanded: false,
      animation: new Animated.Value(1)
    };
  }

  componentWillUnmount(){
    if(this.timer){
      clearTimeout(this.timer);
    }
  }

  toggle() {
    let value = this.state.expanded ? 0 : 1;

    Animated.timing(
      this.state.animation,
      {
        toValue: value,
        duration: this.DELAY
      }
    ).start();

    this.timer = setTimeout(() => {
      this.setState({
        expanded: !this.state.expanded
      });
      clearTimeout(this.timer);
    }, this.DELAY);
  }

  render() {

    let Icon = this.icons[this.state.expanded ? 'up' : 'down'];

    let fontFamilyStyle = {}
    {
      this.props.fontLoaded ? fontFamilyStyle = { fontFamily: 'Montserrat-Medium' } : null;
    }

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.toggle.bind(this)} underlayColor="transparent">
          <View style={styles.headerContainer}>
            <MPText style={styles.title}>{this.state.title}</MPText>
            <Icon />
          </View>
        </TouchableHighlight>
        {this.state.expanded && (
          <Animated.View style={[styles.content, {opacity: this.state.animation}]}>
            {this.props.children}
          </Animated.View>
        )}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 22,
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: '#DFDFDF'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#000000'
  },
  content: {
    marginTop: 22
  }
});

export { MPToggleList };
