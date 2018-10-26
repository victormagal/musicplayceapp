import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View 
} from 'react-native';
import { 
  MPHeader, 
  MPSelect,
  MPText
} from '../../../components';
import { connect } from 'react-redux';
import {fetchTermsAndConditions} from "../../../state/settings/termsAndConditions/termsAction";
import {MPLoading} from "../../../components/general";

class TermsSettingsScreenContainer extends React.Component {
  state = {
    options: [],
    selectedOption: null
  };

  componentDidMount() {
    this.props.dispatch(fetchTermsAndConditions());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.termsAndConditions !== nextProps.termsAndConditions) {
      const options = nextProps.termsAndConditions.attributes.data.map(data => data.section);
      this.setState({ options });
    }
  }

  handleBackButton = () => {
    this.props.navigation.pop();
  };

  render() {
    let { error, loading, terms } = this.props;

    if (typeof terms === 'undefined') {
      terms = true;
    }

    const noBack = !(this.props.navigation.state.params && this.props.navigation.state.params['back'] === false);
    return (
      <View style={styles.parent}>
        <MPHeader
          back={noBack}
          terms={terms}
          onBack={this.handleBackButton}
          title="Termos e condições de uso"
        />
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            { error ?
              <MPText style={styles.errorText}>
                Não conseguimos carregar essas informações. Por favor tente mais tarde.
              </MPText>
              :
              this.renderTermsAndConditions()
            }
          </View>
        </ScrollView>
        <MPLoading visible={loading}/>
      </View>
    );
  }

  renderTermsAndConditions() {
    let { termsAndConditions, showTopics } = this.props;
    const { selectedOption, options } = this.state;
    const termsData = termsAndConditions && termsAndConditions.attributes.data;
    if (typeof showTopics === 'undefined') {
      showTopics = true;
    }
    return (
      <View>
        { termsAndConditions && termsData
          .filter(term => {
            if (selectedOption !== null) {
              return term.section === options[selectedOption]
            }
            return term;
          })
          .map(term => (
            <View key={Math.random()} style={styles.boxText}>
              <MPText style={styles.title}>
                { term.section }
              </MPText>
              <MPText style={styles.paragraph}>
                { term.text }
              </MPText>
            </View>
          ))
        }
      </View>
    )
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
    flex: 2,
    marginTop: 15
  },
  containerSelect: {
    borderBottomColor: 'rgba(0, 0, 0, 0.15)',
    borderBottomWidth: 1,
    paddingBottom: 30,
    paddingHorizontal: 30,
    backgroundColor: '#FFFFFF'
  },
  container: {
    marginBottom: 30,
    marginTop: 10
  },
  errorText: {
    color: 'rgba(255,0,0,1)',
    fontFamily: 'Montserrat',
    fontSize: 12,
    marginTop: 10,
    paddingHorizontal: 30
  },
  boxText: {
    marginTop: 30,
    paddingHorizontal: 30
  },
  title: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5
  },
  paragraph: {
    fontSize: 16,
    color: '#686868',
    fontFamily: 'ProbaPro-Regular'
  }
});

const mapStateToProps = ({ termsReducer }) => {
  return { ...termsReducer };
};

const TermsSettingsScreen = connect(mapStateToProps)(TermsSettingsScreenContainer);
export { TermsSettingsScreen };
