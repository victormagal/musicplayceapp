import React from 'react';
import { Animated, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { MPArrowDownIcon, MPArrowUpIcon } from '../../assets/svg';
import { connect } from 'react-redux';

// measurements = []
class MPToggleListComponent extends React.Component {


  DELAY = 300;
  timer = null;

  constructor(props) {
    super(props);

    this.icons = {
      'up': MPArrowUpIcon,
      'down': MPArrowDownIcon
    };

    this.state = {
      title: props.title,
      expanded: true,
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

    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.toggle.bind(this)} underlayColor="#f1f1f1">
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{this.state.title}</Text>
            <Icon />
          </View>
        </TouchableHighlight>
        {this.state.expanded && (
          <Animated.View style={[styles.body, {opacity: this.state.animation}]}>
            {this.props.children}
          </Animated.View>
        )}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    overflow: 'hidden'
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    padding: 10,
    color: '#2a2f43',
    fontWeight: 'bold'
  },
  body: {
    padding: 10,
    paddingTop: 0
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPToggleList = connect(mapStateToProps)(MPToggleListComponent);
export { MPToggleList };
