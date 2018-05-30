import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { MPHeader, TitleSectionForm, MPTextField } from '../../../components';

class EditConfigurationScreenComponent extends React.Component {
	
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
	
	render() {
		let {onBack} = this.props;
		
		return (
			<View style={styles.parent}>
			<MPHeader style={styles.header} back={true} onBack={onBack}
			title={"Mantenha seus dados cadastrais atualizados."}/>
			<ScrollView style={styles.scroll}>
			<TitleSectionForm title={"Identificação"} textButton={"ALTERAR"}/>
			<MPTextField label={"Usuário"} value={this.state.form.username}/>
			<MPTextField label={"Nome"} value={this.state.form.name}/>
			<MPTextField label={"Sobrenome"} value={this.state.form.lastName}/>
			<View style={styles.separator}/>
			<TitleSectionForm title={"Endereço de e-mail"} textButton={"ALTERAR"}/>
			<MPTextField label={"E-mail"} value={this.state.form.email}/>
			<View style={styles.separator}/>
			<TitleSectionForm title={"Telefone celular"} textButton={"ALTERAR"}/>
			<MPTextField label={"Nº de telefone"} value={this.state.form.phone}/>
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
	header: {
		flex: 1
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

export {EditConfigurationScreenComponent};