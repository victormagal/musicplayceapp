import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList, ScrollView} from 'react-native';
import {MPGradientButton, MPHeader, MPText, MPIconButton, MPLoading} from '../../../components';
import {updateSongRegisterData, fetchTags} from '../../../state/action';
import {connect} from 'react-redux';


class StylesScreenContainer extends React.Component {

  state = {
    tags: []
  };

  componentDidMount(){
    this.props.dispatch(fetchTags());
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.tags && nextProps.tags && nextProps.tags.length !== this.state.tags.length){
      this.setState({tags: nextProps.tags});
    }
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  handleToggleItem = (index) => {
    let newState = {...this.state};
    newState.tags[index].selected = !newState.tags[index].selected;
    this.setState(newState);
  };

  handleSaveClick = () => {
    let selecteds = this.state.tags.filter(item => item.selected);

    if(selecteds.length > 0) {
      let song = {...this.props.song};
      song.tags = selecteds;
      this.props.dispatch(updateSongRegisterData(song));
      this.handleBackClick();
    }

    //TODO: show msg to choose at least one
  };

  renderHeaderMenuSave() {
    return [
      <MPIconButton title="Salvar" titleStyle={styles.headerMenuText} onPress={this.handleSaveClick}/>
    ];
  }

  renderItem = (item, index) => {
    return (<MPGradientButton key={index} style={styles.button} textSize={16} title={item.name} selected={!!item.selected} onPress={this.handleToggleItem.bind(this, index)}/>);
  };

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title="Estilos e categorias" icons={this.renderHeaderMenuSave()}/>
        <ScrollView style={styles.scroll}>
          <View>
            <MPText style={styles.textTop}>
              Melhore a encontrabilidade do seu trabalho. Do que ela fala? Quais estilos combinam com sua musica?
            </MPText>

            <View style={styles.buttonContainer}>
              {this.state.tags.map((item, index) => this.renderItem(item, index))}
            </View>
         </View>
        </ScrollView>

        <MPLoading visible={this.props.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'center'
  },
  scroll: {
    paddingTop: 30,
    flex: 2
  },
  textTop: {
    fontSize: 16,
    textAlign: 'center',
    color: '#686868',
    height: 60,
    marginBottom: 21,
    marginHorizontal: 40,
    fontFamily: 'ProbaPro-Regular'
  },
  button: {
    marginEnd: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  headerMenuText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#fff'
  }
});

const mapStateToProps = ({songsReducer, tagReducer}) => {
  return {...tagReducer, song: songsReducer.song};
};

const StylesScreen = connect(mapStateToProps)(StylesScreenContainer);
export {StylesScreen};
