import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import {
  MPHeader, MPText, MPInput, MPForm, MPFormButton, MPIconButton
} from '../../../../components';

class EditProfileDescriptionComponent extends React.Component {

  state = {
    description: ''
  };

  refSaveButton = null;

  constructor(props){
    super(props);
    this.refSaveButton = React.createRef();
  }

  handleTriggerSave = () => {
    this.refSaveButton.current.props.onPress();
  };

  handleSave = () => {
    this.props.onSave({...this.state});
  };

  handleChange = ({value}) => {
    this.setState({description: value});
  };

  renderHeaderMenuSave() {
    return [
      <MPIconButton key={1} title="Salvar" titleStyle={styles.headerMenuText} onPress={this.handleTriggerSave}/>
    ];
  }

  render() {
    let {onBack} = this.props;
    return (
      <View style={styles.parent}>
        <MPHeader back={true} onBack={onBack} title={"Fale de você e do seu trabalho"} icons={this.renderHeaderMenuSave()}/>
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>

            <MPText style={ styles.titleText}>O que te inspira? Quais suas referências e estilos ? Aproveite para vender seu peixe, esse espaço é seu.</MPText>
            <MPForm>
              <MPInput label="Envie sua mensagem" validators={['required']} style={styles.textFieldContainer} multiline={true}
                       value={this.state.description} onChangeText={this.handleChange}/>

              <View>
                <MPFormButton>
                  <MPIconButton ref={this.refSaveButton} onPress={this.handleSave} />
                </MPFormButton>
              </View>
            </MPForm>
          </View>
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

export {EditProfileDescriptionComponent};
