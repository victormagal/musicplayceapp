import React from 'react';
import {
  ScrollView, StyleSheet, Platform, TouchableOpacity, View
} from 'react-native';
import Permissions from 'react-native-permissions'
import {
  MPHeader,
  MPSelect,
  MPIconButton,
  MPText,
  MPLoading
} from '../../../../../components';
import {connect} from 'react-redux';
import {GeneralService} from '../../../../../service';
import {
  fetchCityBrazil, fetchStateBrazil, generalStartLoading, generalFinishLoading, fetchFeeds
} from "../../../../../state/action";
import {MPLocationPinIcon} from "../../../../../assets/svg/index";
import {MPTextField} from "../../../../../components/forms";
import AutoComplete from '../../../../../components/autocomplete-select/AutoComplete/AutoComplete'
import Cities from './Cidades.json';
import States from './Estados.json';

class EditProfileLocationComponent extends React.Component {
  refSaveButton = null;
  searchTimer = null;

  constructor(props) {
    super(props);
    this.refSaveButton = React.createRef();
    this.statesOrder = this.sortStates(States);
    this.state = {
      city: props.location.city || '',
      state: props.location.state || '',
      cityTextValue: '',
      selectedState: null,
      error: null,
      searching: false,
      isCurrentLocation: false,
      value: '',
      citiesByState:[],
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchStateBrazil());
  }

  onSelect = (suggestion) => {
    this.setState({value: suggestion.nome_municipio});
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedState, isCurrentLocation } = this.state;

    if (prevState.selectedState === null && !this.props.loading && prevProps.location.state !== null) {
      const selectedState = this.statesOrderOrder.filter(s => s.sigla === this.state.state)[0].id;
      this.setState({ selectedState, isCurrentLocation: true });
    }

    if (selectedState !== prevState.selectedState) {
      if (prevState.selectedState !== null) {
        this.setState({ cityTextValue: '' });
      }
      this.props.dispatch(fetchCityBrazil(selectedState));
    }

    if (prevProps.cities !== this.props.cities && isCurrentLocation) {
      let cityTextValue = '';
      this.props.dispatch(fetchCityBrazil(selectedState, this.state.city)).then(response => {
        if (response && response.data && response.data.length > 0) {
          cityTextValue = response.data[0].nome;
        }
        this.setState({ cityTextValue });
      });
      this.setState({ isCurrentLocation: false });
    }
  }

  handleCitySearchChange = (cityTextValue) => {
    this.setState({ cityTextValue, error: null });

    if (cityTextValue.length >= 3) {
      this.handleSearch(cityTextValue);
    }
  };

  handleSearch = (value) => {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }

    this.searchTimer = setTimeout(() => {
      this.props.dispatch(fetchCityBrazil(this.state.selectedState, value));
      this.setState({ searching: true });
      clearTimeout(this.searchTimer);
    }, 400);
  };

  handleSave = () => {
    const {selectedState, state} = this.state;
    let error = null;

    if (selectedState === null) {
      error = 'O estado n??o pode ficar em branco.';
    } else if (state === '') {
      error = 'A cidade n??o pode ficar em branco.';
    } else {
      this.props.onSave({...this.state});
    }
    this.setState({error});
  };

  handleChangeStateOption = (index) => {
    if(index !== null) {
    this.setState({ citiesByState: this.sort(Cities.filter(cities => cities.uf === this.statesOrder[index].sigla))});

      if(index) {
        this.setState({
          selectedState: this.statesOrder[index].id,
          state: this.statesOrder[index].sigla
       });
     }
    }
  };

  sortStates(states) {
    const orderStates = {}
    const statesResultOrder = []
    for (const state of states) {
      orderStates[state.nome.toLowerCase()] = state
    }

    for (const stateName of Object.keys(orderStates).sort()) {
      statesResultOrder.push(orderStates[stateName])
    }

    return statesResultOrder
  }

  sort(cities) {
    const orderCities = {}
    const citiesResultOrder = []
    for (const city of cities) {
        orderCities[city.nome_municipio.toLowerCase()] = city
    }

    for (const cityName of Object.keys(orderCities).sort()) {
      citiesResultOrder.push(orderCities[cityName])
    }

    return citiesResultOrder
  }

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
    const {onBack, cities} = this.props;
    const {selectedState, cityTextValue, error, searching} = this.state;

    return (
      <View style={styles.parent}>
        <MPHeader
          back={true}
          onBack={onBack}
          title={'De onde voc?? ???'}
          icons={this.renderHeaderMenuSave()}
        />
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            { this.statesOrder &&
              <View style={{ marginHorizontal: 20 }}>
                <MPSelect
                  label={'Selecione o estado'}
                  customValue={selectedState ? this.statesOrder.filter(states => states.id === selectedState)[0].sigla : null}
                  value={selectedState ? selectedState.id : null}
                  options={this.statesOrder.map(state => state.nome)}
                  style={styles.containerSelect}
                  onChangeOption={this.handleChangeStateOption}
                />
                {selectedState &&
                <AutoComplete
                onSelect={this.onSelect}
                suggestions={this.state.citiesByState}
                suggestionObjectTextProperty='nome_municipio'
                value={this.state.value}
                onChangeText={(value) => this.setState({value})}
                label={'Digite o nome da cidade'}

              />
                }
                {(selectedState && cities) &&
                  <View style={{ marginTop: -8 }}>
                    {(searching && cityTextValue !== '') && cities.map(city => (
                      <TouchableOpacity
                        key={city.id}
                        style={styles.citiesItem}
                        onPress={() => this.setState({
                          cityTextValue: city.nome, city: city.nome,
                          searching: false
                        })}
                      >
                        <MPText>
                          { city.nome }
                        </MPText>
                      </TouchableOpacity>
                    )) }
                  </View>
                }
              </View>
            }
            { error !== null &&
            <MPText style={styles.errorText}>
              { error }
            </MPText>
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
  },
  errorText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#e13223',
    fontFamily: 'Montserrat-Regular',
    marginHorizontal: 20
  },
  citiesItem: {
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(177, 177, 177, 0.8)',
    borderTopWidth: 0,
  },
  randomText: {
    marginVertical: 15,
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold'
  }
});

const mapStateToProps = ({generalReducer}) => {
  return {...generalReducer};
};

const EditProfileLocation = connect(mapStateToProps)(EditProfileLocationComponent);
export {EditProfileLocation};
