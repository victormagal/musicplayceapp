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

  render() {
    const { error, loading } = this.props;
    return (
      <View style={styles.parent}>
        <MPHeader title="Termos e condições de uso" />
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
    const { termsAndConditions } = this.props;
    const { selectedOption, options } = this.state;
    const termsData = termsAndConditions && termsAndConditions.attributes.data;
    return (
      <View>
        <MPSelect label={"Selecione um tópico"}
                  value={selectedOption}
                  options={options}
                  style={styles.containerSelect}
                  onChangeOption={(selectedOption) => this.setState({ selectedOption })}
        />
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
    flex: 2
  },
  containerSelect: {
    borderBottomColor: 'rgba(0, 0, 0, 0.15)',
    borderBottomWidth: 1,
    paddingBottom: 30,
    paddingHorizontal: 30,
    backgroundColor: '#FFFFFF'
  },
  container: {
    marginVertical: 30
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
