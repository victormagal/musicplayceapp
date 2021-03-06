import React from 'react';
import {
	StyleSheet, 
	View 
} from 'react-native';
import { 
	MPHeader, 
	MPTitleFormContainer,
  MPInput,
	MPLoading,
} from '../../../../components';
import { KeyboardAwareScrollView } from '../../../../../node_modules/react-native-keyboard-aware-scroll-view';

class EditSettingsScreenComponent extends React.Component {
	
	state = {
		formLoaded: false,
		form: {}
	};
	
	constructor(props) {
		super(props);
		
		if (props.profile) {
			this.state.form = { ...props.profile };
		}
	}

  onChangeValue = ({ name, value }) => {
	  let { form } = this.state;
	  form[name] = value;
	  this.setState({ form });
  };

  numberFormat(text) {
    const maskPhone = text.length > 10
      ? text.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/)
      : text.replace(/\D/g, '').match(/(\d{0,2})(\d{0,4})(\d{0,4})/);

    return !maskPhone[2]
      ? maskPhone[1]
      : '(' + maskPhone[1] + ') ' + maskPhone[2] + (maskPhone[3] ? '-' + maskPhone[3] : '');
  }

	handleUpdateIdentificacao = (section) => {
    this.props.onSave(this.state.form, section);
	};

	render() {
		let { onBack } = this.props;
		const { form } = this.state;
		const isProfileDisabled = form.username === '' || form.name === '' || form.username === '';
		return (
		  <View style={styles.parent}>
				<MPHeader
          back={true}
          onBack={onBack}
          title={"Mantenha seus dados cadastrais atualizados"}
        />
				<KeyboardAwareScrollView style={styles.scroll}>
					<View style={styles.container}>
						<MPTitleFormContainer
              title={"Identificação"}
              textButton={"ALTERAR"}
              disabledButton={isProfileDisabled}
              onPress={() => this.handleUpdateIdentificacao('profile')}
            />
						<MPInput
              name="username"
              label={"Usuário"}
              value={form.username}
              onChangeText={this.onChangeValue}
            />
						<MPInput
              name="name"
              label={"Nome"}
              value={form.name}
              onChangeText={this.onChangeValue}
            />
						<MPInput
              name="last_name"
              label={"Sobrenome"}
              value={form.last_name}
              onChangeText={this.onChangeValue}
            />
						<View style={styles.separator}/>
						<MPTitleFormContainer
              title={"Endereço de e-mail"}
              textButton={"ALTERAR"}
              disabledButton={form.email === ''}
              onPress={() => this.handleUpdateIdentificacao('email')}
            />
						<MPInput
              name="email"
              label="E-mail"
              validators={['email']}
              value={form.email}
              onChangeText={this.onChangeValue}
            />
						<View style={styles.separator}/>
						<MPTitleFormContainer
              title={"Telefone celular"}
              textButton={"ALTERAR"}
              disabledButton={form.cell_phone === ''}
              onPress={() => this.handleUpdateIdentificacao('cell_phone')}
            />
						<MPInput
              name="cell_phone"
              label={"Nº de telefone"}
              value={this.numberFormat(form.cell_phone || '')}
              maxLength={15}
              onChangeText={({name,value}) => this.onChangeValue({name, value: value.replace(/[^0-9]+/g,'') })}
            />
					</View>
				</KeyboardAwareScrollView>
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
		marginVertical: 30,
    marginHorizontal: 20
	},
	separator: {
		borderBottomWidth: 1,
		borderBottomColor: '#D8D8D8',
		marginVertical: 30
	}
});

export { EditSettingsScreenComponent };
