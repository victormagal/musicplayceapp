import React from 'react';
import { 
	ScrollView, 
	StyleSheet, 
	View 
} from 'react-native';
import { 
	MPHeader, 
	MPGradientButton, 
	MPTextField,
	MPLoading, 
	MPFooter
} from '../../../../components';

class ChangePasswordConfigurationScreenComponent extends React.Component {
	
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
				<MPHeader back={true} onBack={onBack} title={"Troque sua senha de acesso"} />
				<ScrollView style={styles.scroll}>
					<MPTextField label={"Senha atual"} value={"Senha atual"} />
					<MPTextField label={"Nova senha"} value={"Nova senha"} />
					<MPTextField label={"Confirme a nova senha"} value={"Confirme a nova senha"} />
					<MPGradientButton style={styles.button} textSize={16} title="Salvar" onPress={this.handleUpdateIdentificacao.bind(this, 'password')} />
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
	button: {
		marginHorizontal: 100,
		marginTop: 20
	}
});

export { ChangePasswordConfigurationScreenComponent };