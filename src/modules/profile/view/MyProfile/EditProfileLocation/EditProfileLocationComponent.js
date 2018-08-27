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


class EditProfileLocationComponent extends React.Component {
  refSaveButton = null;

  constructor(props) {
    super(props);
    this.refSaveButton = React.createRef();
    this.state = {
      city: props.location.city || '',
      state: props.location.state || '',
      cityTextValue: '',
      selectedState: null,
      error: null,
      searching: false,
      isCurrentLocation: false
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchStateBrazil());
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedState, isCurrentLocation } = this.state;

    if (prevState.selectedState === null && !this.props.loading && prevProps.location.state !== null) {
      const selectedState = this.props.states.filter(s => s.sigla === this.state.state)[0].id;
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

  requestPermissionLocation = () => {
    Permissions.check('location').then(response => {
      if (response === 'authorized') {
        this.requestLocation();
      } else {
        Permissions.request('location').then(locationResponse => {
          if (locationResponse === 'authorized'){
            this.requestLocation();
          } else {
            this.setState({ error: 'Sem acesso a localização.' });
          }
        });
      }
    });
  };

  requestLocation = () => {
    const {states} = this.props;
    this.props.dispatch(generalStartLoading());
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = position.coords;

        GeneralService.getAddressFromCoordinates(coords.latitude, coords.longitude).then(response => {
          let result = response.data.results;
          if (result.length > 0) {
            result = result[0];
            const statePosition = result.address_components.length - 3;
            const cityPosition = result.address_components.length - 4;

            const city = result.address_components[cityPosition].short_name;
            const state = result.address_components[statePosition].short_name;
            const selectedState = states.filter(s => s.sigla === state)[0].id;
            this.setState({city, state, selectedState, isCurrentLocation: true});
          } else {
            this.setState({ error: response.data.error_message });
          }
          this.props.dispatch(generalFinishLoading());
        }).catch(e => {
          console.log(e);
          this.props.dispatch(generalFinishLoading());
        });
      },
      (e) => {
        console.log(e);
        this.setState({error: 'Não foi possível usar a localização atual. Verifique se o GPS está habilitado.'});
        this.props.dispatch(generalFinishLoading());
      },
      {enableHighAccuracy: true, timeout: 60000}
    );
  };

  handleCurrentPosition = () => {
    this.requestPermissionLocation();
  };

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
    const {selectedState, cityTextValue} = this.state;
    let error = null;

    if (selectedState === null) {
      error = 'O estado não pode ficar em branco.';
    } else if (cityTextValue === '') {
      error = 'A cidade não pode ficar em branco.';
    } else {
      this.props.onSave({...this.state});
    }
    this.setState({error});
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
    const {onBack, cities, states} = this.props;
    const {selectedState, cityTextValue, error, searching} = this.state;

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
            <TouchableOpacity style={styles.currentPosition} onPress={() => this.handleCurrentPosition()}>
              <MPLocationPinIcon/>
              <MPText style={styles.currentPositionText}>
                Usar minha localização atual
              </MPText>
            </TouchableOpacity>
            <MPText style={styles.randomText}>
              ou
            </MPText>
            { states &&
              <View style={{ marginHorizontal: 20 }}>
                <MPSelect
                  label={'Selecione o estado'}
                  customValue={selectedState ? states.filter(state => state.id === selectedState)[0].sigla : null}
                  value={selectedState ? selectedState.id : null}
                  options={states.map(state => state.sigla)}
                  style={styles.containerSelect}
                  onChangeOption={(selectedState) => this.setState({
                    selectedState: states[selectedState].id,
                    state: states[selectedState].sigla
                  })}
                />
                {selectedState &&
                  <MPTextField
                    label='Digite o nome da cidade'
                    value={cityTextValue}
                    onChangeText={this.handleCitySearchChange}
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
  currentPosition: {
    padding: 20,
    backgroundColor: '#CCC',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  citiesItem: {
    paddingHorizontal: 8,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(177, 177, 177, 0.8)',
    borderTopWidth: 0,
  },
  currentPositionText: {
    fontSize: 16,
    color: '#686868',
    marginLeft: 10,
    flex: 1,
    fontFamily: 'Montserrat-Regular'
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
