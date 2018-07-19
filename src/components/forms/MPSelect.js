import React from 'react';
import { 
  StyleSheet, 
  TouchableHighlight, 
  View 
} from 'react-native';
import { MPText } from '../../components';
import { MPArrowDownIcon } from '../../assets/svg';
import ActionSheet from 'react-native-actionsheet';
import { connect } from 'react-redux';

class MPSelectComponent extends React.Component {
  state = {
    selectedOption: null
  };

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  render() {
    let { label, style, options } = this.props;
    const { selectedOption } = this.state;
    return (
      <View style={style}>
        <TouchableHighlight onPress={this.showActionSheet} underlayColor="transparent">
          <View style={styles.areaSelection}>
            <View style={styles.boxText}>
              <MPText style={styles.text}>{label}</MPText>
            </View>
            <View style={styles.boxFoward}>
              <MPArrowDownIcon />
            </View>
            { selectedOption !== null &&
              <View style={styles.boxText}>
                <MPText style={styles.text}>{options[selectedOption]}</MPText>
              </View>
            }
          </View>
        </TouchableHighlight>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={options}
          cancelButtonIndex={3}
          onPress={(selectedOption) => this.setState({ selectedOption }) }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  areaSelection: {
    paddingVertical: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#b1b1b1'
  },
  boxText: {
    alignItems: 'flex-start',
    flex: 0.9
  },
  text: {
    color: 'rgba(104, 104, 104, 0.8)',
    fontFamily: 'montSerrat',
    fontSize: 16
  },
  boxFoward: {
    flex: 0.1,
    marginBottom: 15
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPSelect = connect(mapStateToProps)(MPSelectComponent);
export { MPSelect };
