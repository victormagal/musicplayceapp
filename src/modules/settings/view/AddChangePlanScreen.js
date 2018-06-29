import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View 
} from 'react-native';
import { 
  MPHeader, 
  MPFooter,
  MPText,
  MPAddChangePlan
} from '../../../components';
import { connect } from 'react-redux';

class AddChangePlanScreenContainer extends React.Component {

  handleBack = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.parent}>
        <MPHeader back={true} onBack={this.handleBack} title={"Assine o plano para ter mais vantagens"} />
        <ScrollView style={styles.scroll}>
          <MPAddChangePlan />
        </ScrollView>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  parent: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'flex-end'
  },
  scroll: {
    flex: 2
  },
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const AddChangePlanScreen = connect(mapStateToProps)(AddChangePlanScreenContainer);
export { AddChangePlanScreen };