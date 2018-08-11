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
  fetchCityBrazil, fetchStateBrazil, generalStartLoading, generalFinishLoading
} from "../../../../../state/action";
import {MPLocationPinIcon} from "../../../../../assets/svg/index";


class EditProfileLocationComponent extends React.Component {
  refSaveButton = null;

  constructor(props) {
    super(props);
    this.refSaveButton = React.createRef();
    this.state = {
      city: props.location.city || '',
      state: props.location.state || '',
      selectedCity: null,
      selectedState: null,
      error: null,
      isCurrentLocation: false
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchStateBrazil());
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedState, isCurrentLocation } = this.state;

    if (prevProps.states === null && !this.props.loading && this.props.location.state !== null) {
      const selectedState = this.props.states.filter(s => s.sigla === this.state.state)[0].id;
      this.setState({ selectedState, isCurrentLocation: true });
    }

    if (selectedState !== prevState.selectedState) {
      if (prevState.selectedState !== null) {
        this.setState({ selectedCity: null });
      }
      this.props.dispatch(fetchCityBrazil(selectedState));
    }

    if (prevProps.cities !== this.props.cities && isCurrentLocation) {
      const selectedCity = this.props.cities.filter(c => c.nome === this.state.city)[0].id;
      this.setState({ selectedCity, isCurrentLocation: false });
    }
  }

  requestPermissionLocation = () => {
    Permissions.check('location').then(response => {
      if(response === 'authorized'){
        this.requestLocation();
      }else{
        Permissions.request('location').then(locationResponse => {
          if(locationResponse === 'allow'){
            this.requestLocation();
          }else{
            this.setState({error: 'Sem acesso a localização.'});
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
        console.log(coords);
        GeneralService.getAddressFromCoordinates(coords.latitude, coords.longitude).then(response => {
          console.log(response);
          const result = response.data.results[0];
          const statePosition = result.address_components.length - 3;
          const cityPosition = result.address_components.length - 4;

          const city = result.address_components[cityPosition].short_name;
          const state = result.address_components[statePosition].short_name;
          const selectedState = states.filter(s => s.sigla === state)[0].id;
          this.setState({city, state, selectedState, isCurrentLocation: true});
          this.props.dispatch(generalFinishLoading());
        }).catch(e => {
          console.log(e);
          console.log(e.response);
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

  handleSave = () => {
    const {selectedState, selectedCity} = this.state;
    let error = null;

    if (selectedState === null) {
      error = 'O estado não pode ficar em branco.';
    } else if (selectedCity === null) {
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
    const {selectedState, selectedCity, error} = this.state;

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
            {/*<TouchableOpacity style={styles.currentPosition} onPress={() => this.handleCurrentPosition()}>*/}
              {/*<MPLocationPinIcon/>*/}
              {/*<MPText style={styles.currentPositionText}>*/}
                {/*Usar minha localização atual*/}
              {/*</MPText>*/}
            {/*</TouchableOpacity>*/}
            {/*<MPText style={styles.randomText}>*/}
              {/*ou*/}
            {/*</MPText>*/}
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
                { (selectedState && cities) &&
                  <MPSelect
                    label={'Selecione a cidade'}
                    value={selectedCity ? selectedCity.id : null}
                    customValue={selectedCity ? cities.filter(city => city.id === selectedCity)[0].nome : null}
                    options={cities.map(city => city.nome)}
                    style={styles.containerSelect}
                    onChangeOption={(selectedCity) => this.setState({
                      selectedCity: cities[selectedCity].id,
                      city: cities[selectedCity].nome
                    })}
                  />
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
    fontFamily: 'Montserrat-Regular'
  },
  currentPosition: {
    padding: 20,
    backgroundColor: '#CCC',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
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
