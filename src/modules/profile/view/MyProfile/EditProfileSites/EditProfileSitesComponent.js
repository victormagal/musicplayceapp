import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import {
  MPHeader,
  MPText,
  MPForm,
  MPFormButton,
  MPIconButton,
  MPTextField,
  MPGradientButton
} from '../../../../../components/index';

class EditProfileSitesComponent extends React.Component {
  refSaveButton = null;

  constructor(props){
    super(props);
    this.refSaveButton = React.createRef();
    this.state = {
      social_networks: props.social || [],
      urlText: '',
      nameText: '',
      error: null
    };
  }

  itsAKnowSocialMedia = (urlText) => {
    let socialName = '';
    const { social_networks, nameText } = this.state;
    const socialMedias = ['Youtube', 'Spotify', 'Facebook', 'Instagram', 'Twitter'];

    socialMedias.map(media => {
      if (urlText.includes(media.toLowerCase())) {
        socialName = media;
      }
    });

    const socialFiltered = social_networks.filter(social => (
      social.name.toLowerCase() === socialName.toLowerCase()
    ));
    return socialFiltered.length > 0
      ? `${ socialName } [${ socialFiltered.length + 1 }]`
      : socialName === '' ? nameText : socialName;
  };

  handleTriggerSave = () => {
    this.refSaveButton.current.props.onPress();
  };

  handleSave = () => {
    this.props.onSave({ social_networks: this.state.social_networks });
  };

  handleAddSocialMedia = () => {
    const { social_networks, urlText, nameText } = this.state;
    const existsName = social_networks.filter(social => social.name.toLowerCase() === nameText.toLowerCase()).length > 0;
    const existsUrl = social_networks.filter(social => social.url.toLowerCase() === urlText.toLowerCase()).length > 0;
    const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

    let error = null;
    if (existsUrl) {
      error = 'Esta URL já existe na sua lista.';
    } else if (existsName) {
      error = 'Este nome de rede social já existe. Por favor tente outro.';
    } else if (urlText === '') {
      error = 'A URL não pode ficar em branco.';
    } else if (nameText === '') {
      error = 'O nome não pode ficar em branco.';
    } else if (!regexp.test(urlText)) {
      error = 'Por favor insira uma URL válida.';
    } else {
      error = null;
      social_networks.push({ name: nameText, url: urlText });
      this.setState({ social_networks, urlText: '', nameText: '' });
    }
    this.setState({ error });
  }

  handleChange = ({ field, value }) => {
    this.setState({ [field]: value });

    if (field === 'urlText') {
      const { social_networks } = this.state;
      const name = this.itsAKnowSocialMedia(value);
      const existsName = social_networks.filter(social => social.name.toLowerCase() === name.toLowerCase()).length > 0;
      this.setState({ nameText: existsName ? '' : name });
    }
  };

  handleDelete = (socialMedia) => {
    const { social_networks } = this.state;
    const filtered = social_networks.filter(social => social.name !== socialMedia.name);
    this.setState({ social_networks: filtered });
  };

  renderHeaderMenuSave() {
    return [
      <MPIconButton
        key={1}
        title="Salvar"
        titleStyle={styles.headerMenuText}
        onPress={this.handleTriggerSave}
      />
    ];
  }

  render() {
    const { onBack } = this.props;
    const { error } = this.state;
    return (
      <View style={styles.parent}>
        <MPHeader
          back={true}
          onBack={onBack}
          title={"Quais são as suas redes sociais?"}
          icons={this.renderHeaderMenuSave()}
        />
        <ScrollView style={styles.scroll} ref={ref => this.scrollView = ref}>
          <View style={styles.container}>
            <MPText style={ styles.titleText}>
              Incluir as suas redes sociais contribui ainda mais com o seu sucesso e marketing.
            </MPText>
            { this.renderFields() }
            { error !== null &&
              <MPText style={styles.errorText}>
                { error }
              </MPText>
            }
            { this.renderSocialMediaList() }
          </View>
        </ScrollView>
      </View>
    );
  }

  renderFields() {
    const { urlText, nameText } = this.state;
    return (
      <MPForm>
        <View style={{  marginHorizontal: 40 }}>
          <MPTextField
            label="Cole aqui a URL da sua página"
            value={urlText}
            onChangeText={(value) => this.handleChange({ field: 'urlText', value })}
          />
          <MPTextField
            label="Nome da rede social"
            value={nameText}
            onChangeText={(value) => this.handleChange({ field: 'nameText', value })}
          />
          <MPGradientButton
            title={'Adicionar esta'}
            style={styles.addButton}
            onPress={this.handleAddSocialMedia}
          />
        </View>
        <View>
          <MPFormButton>
            <MPIconButton ref={this.refSaveButton} onPress={this.handleSave} />
          </MPFormButton>
        </View>
      </MPForm>
    )
  }

  renderSocialMediaList() {
    const { social_networks } = this.state;

    if (social_networks.length > 0) {
      return (
        <View style={{ marginTop: 30, borderBottomWidth: 1, borderBottomColor: '#CCC' }}>
          { social_networks.map(social => (
            <View key={Math.random()} style={styles.socialList}>
              <View style={{ flex: 1 }}>
                <MPText numberOfLines={1}>
                  { social.name }
                </MPText>
                <MPText numberOfLines={1}>
                  { social.url }
                </MPText>
              </View>
              <TouchableOpacity onPress={() => this.handleDelete(social)}>
                <MPText style={styles.actionButtons}>
                  Excluir
                </MPText>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )
    }
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
    marginHorizontal: 40,
  },
  errorText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#e13223'
  },
  textFieldContainer: {
    flex: 1,
    marginHorizontal: 40,
  },
  headerMenuText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#fff'
  },
  addButton: {
    marginTop: 15
  },
  actionButtons:{
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#BB1A1A',
    borderColor: '#BB1A1A',
    color: '#FFF'
  },
  socialList: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderTopWidth: 1,
    borderTopColor: '#CCC'
  }
});

export {EditProfileSitesComponent};
