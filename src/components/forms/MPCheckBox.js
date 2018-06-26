import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import {
    MPText,
} from '../../components';
import { saveProfile } from '../../state/action';
import { MPCheckboxIcon } from '../../assets/svg';

class MPCheckBoxComponent extends React.Component {
  state = {
      checked: this.props.checked,
  }

  toggleCheck = () => {
      this.setState({checked: !this.state.checked})
  }

  render() {
      let { checked , title} = this.props;
    return (
        <TouchableWithoutFeedback style={styles.parent} onPress={ this.toggleCheck.bind(this) }>
          <View style={{flexDirection: 'row', marginEnd: 20}}>
            <View style={{width: 20, height: 20, marginEnd: 10, padding: 2.5, borderColor: '#686868', borderWidth: 1, borderRadius: 3}}>
            {
                this.state.checked == true ? (
                    <MPCheckboxIcon/>      
                ) : null
            }
            </View>
            <MPText style={{fontSize: 16, color: '#686868', fontFamily: 'probaProRegular', justifyContent:'center', alignSelf: 'center',}}>{title}</MPText>
          </View>
        </TouchableWithoutFeedback>
    );
  }

}

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPCheckBox = connect(mapStateToProps)(MPCheckBoxComponent);
export { MPCheckBox };