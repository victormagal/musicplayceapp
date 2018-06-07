import React from 'react';
import { 
	ScrollView, 
	StyleSheet, 
	View 
} from 'react-native';
import { 
	MPHeader, 
	MPTitleFormContainer, 
	MPTextField,
	MPLoading, 
	MPFooter
} from '../../../../components';

class EditSettingsScreenComponent extends React.Component {
	
	state = {
		formLoaded: false,
		form: {}
	};
	
	constructor(props) {
		super(props);
		
		if (props.profile.name) {
			this.state.form = {...props.profile};
			this.state.formLoaded = true;
		}
	}
	
	componentWillReceiveProps(props) {
		if (!this.state.formLoaded && props.profile.name) {
			let state = {...this.state};
			state.form = {...props.profile};
			state.formLoaded = true;
			this.setState(state);
		}
	}

	handleUpdateIdentificacao = (page) => {
    this.props.onSave(page);
	};

	render() {
		let { onBack } = this.props;
		return (
		  <View style={styles.parent}>
				<MPHeader back={true} onBack={onBack} title={"Mantenha seus dados cadastrais atualizados"}/>
				<ScrollView style={styles.scroll}>
					<MPTitleFormContainer title={"Identificação"} textButton={"ALTERAR"} onPress={this.handleUpdateIdentificacao.bind(this, 'profile')} />
					<MPTextField label={"Usuário"} value={this.state.form.username}/>
					<MPTextField label={"Nome"} value={this.state.form.name}/>
					<MPTextField label={"Sobrenome"} value={this.state.form.lastName}/>
					<View style={styles.separator}/>
					<MPTitleFormContainer title={"Endereço de e-mail"} textButton={"ALTERAR"} onPress={this.handleUpdateIdentificacao.bind(this, 'email')} />
					<MPTextField label={"E-mail"} value={this.state.form.email}/>
					<View style={styles.separator}/>
					<MPTitleFormContainer title={"Telefone celular"} textButton={"ALTERAR"} onPress={this.handleUpdateIdentificacao.bind(this, 'phone')} />
					<MPTextField label={"Nº de telefone"} value={this.state.form.phone}/>
				</ScrollView>
				<MPFooter />
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
	separator: {
		borderBottomWidth: 1,
		borderBottomColor: '#D8D8D8',
		marginHorizontal: 40,
		marginVertical: 30
	}
});

export { EditSettingsScreenComponent };