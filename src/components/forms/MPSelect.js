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
import PropTypes from "prop-types";

class MPSelectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allOptions: [...props.options, 'Fechar']
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.options !== nextProps.options) {
      this.setState({ allOptions: [...nextProps.options, 'Fechar'] })
    }
  }

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  handleOptionChange = (index) => {
    if (index === this.state.allOptions.length-1) {
      index = null;
    }
    this.props.onChangeOption(index);
  }

  render() {
    const { allOptions } = this.state;
    const { label, value, style, options, customValue } = this.props;
    return (
      <View style={style}>
        <TouchableHighlight onPress={this.showActionSheet} underlayColor="transparent">
          <View style={styles.areaSelection}>
            <View style={styles.boxText}>
              { customValue ?
                <MPText style={styles.text}>
                  { customValue }
                </MPText>
                :
                <MPText style={styles.text}>
                  {value === null || value === undefined ? label : options[value]}
                </MPText>
              }
            </View>
            <View style={styles.boxFoward}>
              <MPArrowDownIcon />
            </View>
          </View>
        </TouchableHighlight>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={allOptions}
          cancelButtonIndex={allOptions.length-1}
          onPress={(index) => this.handleOptionChange(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  areaSelection: {
    paddingVertical: 15,
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
    fontFamily: 'Montserrat-Regular',
    fontSize: 16
  },
  boxFoward: {
    flex: 0.1,
    marginBottom: 15
  }
});

MPSelectComponent.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  style: PropTypes.any,
  onChangeOption: PropTypes.func.isRequired
};

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPSelect = connect(mapStateToProps)(MPSelectComponent);
export { MPSelect };
