import React from 'react';
import { Animated, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { MPArrowDownIcon, MPArrowUpIcon } from '../../assets/svg';
import { connect } from 'react-redux';

// measurements = []
class MPToggleListComponent extends React.Component {

  constructor(props) {
    super(props);

    this.icons = {
      'up': 'up',
      'down': 'down'
    }

    this.state = {
      title: props.title,
      expanded: true,
      animation: new Animated.Value()
    }

  }

  toggle() {

    let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight, finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded
    });

    this.state.animation.setValue(initialValue);

    Animated.spring(
      this.state.animation,
      {
        toValue: finalValue
      }
    ).start();

    console.log(initialValue, finalValue);
  }

  _setMaxHeight(event) {

    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });

  }

  _setMinHeight(event) {
    
    this.setState({
      minHeight: event.nativeEvent.layout.height
    });
  
  }

  render() {

    let icon = this.icons['down'];

    if (this.state.expanded) {
      icon = this.icons['up'];
    }

    return (
      <Animated.View style={[styles.container, { height: this.state.animation }]}>
        <TouchableHighlight style={styles.button} onPress={this.toggle.bind(this)} underlayColor="#f1f1f1">
          <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
            <Text style={styles.title}>{this.state.title}</Text>
              <Text>{icon}</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
          {this.props.children}
        </View>
      </Animated.View>
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