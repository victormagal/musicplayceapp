import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import {
  MPHeader,
  MPSelect,
  MPIconButton
} from '../../../../components';
import { connect } from 'react-redux';
import {fetchCityBrazil, fetchStateBrazil} from "../../../../state/general/generalAction";
import {MPLoading} from "../../../../components/general";

class EditProfileLocationComponent extends React.Component {
  refSaveButton = null;

  constructor(props){
    super (props);
    this.refSaveButton = React.createRef();
    this.state = {
      city: props.location.city || null,
      state: props.location.state || null
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCityBrazil());
    dispatch(fetchStateBrazil());
  }

  handleSave = () => {
    this.props.onSave({ ...this.state });
  };

  renderHeaderMenuSave() {
    return [
      <MPIconButton
        key={1}
        title='Salvar'
        titleStyle={styles.headerMenuText}
        onPress={this.handleSave}
      />
    ];
  }

  render() {
    const { onBack, cities, states } = this.props;
    const { state, city } = this.state;

    return (
      <View style={styles.parent}>
        <MPHeader
          back={true}
          onBack={onBack}
          title={'De onde você é?'}
          icons={this.renderHeaderMenuSave()}
        />
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            { (states && cities) &&
              <View style={{ marginHorizontal: 20 }}>
                <MPSelect
                  label={'Selecione o estado'}
                  value={state}
                  options={states.map(state => state.sigla)}
                  style={styles.containerSelect}
                  onChangeOption={(state) => this.setState({ state })}
                />
                { state &&
                  <MPSelect
                    label={'Selecione a cidade'}
                    value={city}
                    options={cities.filter(city => (
                      city.microrregiao.mesorregiao.UF.id === states[state].id).map(city => city.nome)
                    )}
                    style={styles.containerSelect}
                    onChangeOption={(city) => this.setState({ city })}
                  />
                }
              </View>
            }
          </View>
        </ScrollView>
        <MPLoading visible={this.props.loading}/>
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
  container: {
    marginVertical: 30
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'ProbaPro-Regular',
    color: '#686868',
    marginHorizontal: 50,
  },
  textFieldContainer: {
    marginHorizontal: 50,
  },
  headerMenuText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#fff'
  }
});

const mapStateToProps = ({ generalReducer }) => {
  return {...generalReducer};
};

const EditProfileLocation = connect(mapStateToProps)(EditProfileLocationComponent);
export {EditProfileLocation};
