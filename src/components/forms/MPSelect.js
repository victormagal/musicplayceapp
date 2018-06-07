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

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.showActionSheet} underlayColor="transparent">
          <View style={styles.areaSelection}>
            <View style={styles.boxText}>
              <MPText style={styles.text}>Assunto do feedback</MPText>
            </View>
            <View style={styles.boxFoward}>
              <MPArrowDownIcon />
            </View>
          </View>
        </TouchableHighlight>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={['Interface', 'Navegação', 'Experiência', 'Fechar']}
          cancelButtonIndex={3}
          onPress={(index) => { return false; }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  areaSelection: {
    marginHorizontal: 40,
    paddingVertical: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(104, 104, 104, 0.8)'
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
    alignItems: 'flex-end',
    flex: 0.1
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const MPSelect = connect(mapStateToProps)(MPSelectComponent);
export { MPSelect };