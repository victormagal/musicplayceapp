import React from 'react';
import { 
	ScrollView,
	StyleSheet,
	TouchableHighlight,
	View
} from 'react-native';
import { 
	MPHeader,
	MPItemList,
	MPTextField,
	MPToggleList,
	MPFooter,
	MPText,
	MPLoading
} from '../../../../components';
import { MPArrowRightIcon } from '../../../../assets/svg';

class HelpConfigurationScreenComponent extends React.Component {
	
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
        <MPHeader back={true} onBack={onBack} title={"Pesquise sua dúvida ou consulte na lista abaixo"} />
        <ScrollView style={styles.scroll}>
          <MPTextField label={"Pesquisar"} />
					<View style={styles.borda}>
						<MPToggleList title="Como faço para me cadastrar?">
							<MPText style={styles.text}>O sistema é bem simples e intuitivo.</MPText>
							<TouchableHighlight onPress={() => { return false; }} underlayColor="transparent">
								<MPText style={styles.link}>Clique para fazer o preenchimento do cadastro desde o começo</MPText>
							</TouchableHighlight>
						</MPToggleList>
						<MPToggleList title="Como encontrar outros usuários?">
							<MPText style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nullam.</MPText>
						</MPToggleList>
						<MPToggleList title="Existe algum custo de intermediação?">
							<MPText style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor eleifend consectetur. Duis eu dui mauris. Maecenas elementum nullam.</MPText>
						</MPToggleList>
						<MPToggleList title="Posso subir quantos trabalhos?">
							<MPText style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor eleifend consectetur. Duis eu dui mauris. Maecenas elementum nullam.</MPText>
						</MPToggleList>
						<MPToggleList title="Posso interagir com qualquer usuário?">
							<MPText style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor eleifend consectetur. Duis eu dui mauris. Maecenas elementum nullam.</MPText>
						</MPToggleList>
						<MPToggleList title="Como faço para me cadastrar?">
							<MPText style={styles.text}>O sistema é bem simples e intuitivo.</MPText>
							<TouchableHighlight onPress={() => { return false; }} underlayColor="transparent">
								<MPText style={styles.link}>Clique para fazer o preenchimento do cadastro desde o começo</MPText>
							</TouchableHighlight>
						</MPToggleList>
						<MPToggleList title="Como encontrar outros usuários?">
							<MPText style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nullam.</MPText>
						</MPToggleList>
						<MPToggleList title="Existe algum custo de intermediação?">
							<MPText style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor eleifend consectetur. Duis eu dui mauris. Maecenas elementum nullam.</MPText>
						</MPToggleList>
						<MPToggleList title="Posso subir quantos trabalhos?">
							<MPText style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor eleifend consectetur. Duis eu dui mauris. Maecenas elementum nullam.</MPText>
						</MPToggleList>
						<MPToggleList title="Posso interagir com qualquer usuário?">
							<MPText style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tempor eleifend consectetur. Duis eu dui mauris. Maecenas elementum nullam.</MPText>
						</MPToggleList>
						<TouchableHighlight underlayColor="transparent" onPress={this.handleUpdateIdentificacao.bind(this, 'help')}>
							<View style={styles.item}>
								<MPText style={styles.textItem}>Não encontrei minha dúvida</MPText>
								<MPArrowRightIcon />
							</View>
						</TouchableHighlight>
					</View>
					<MPLoading visible={this.props.loading} />
        </ScrollView>
        <MPFooter />
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
	borda: {
		borderTopWidth: 1,
		borderTopColor: '#DFDFDF',
		marginTop: 30
	},
	scroll: {
		flex: 2
	},
	lista: {
		marginTop: 30,
		marginBottom: 15
	},
	text: {
		fontSize: 16,
		fontFamily: 'montSerrat',
		color: '#686868'
	},
	link: {
		fontSize: 16,
		fontFamily: 'montSerrat',
		color: '#5994DB',
		textDecorationLine: 'underline'
	},
	item: {
		backgroundColor: '#FFFFFF',
		paddingVertical: 15,
		marginHorizontal: 20,
		marginBottom: 20,
		flexDirection: 'row',
		display: 'flex',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
		borderRadius: 4,
		shadowColor: '#000000',
		shadowOpacity: 0.15,
		shadowRadius: 2,
		shadowOffset: {
			width: 1,
			height: 1
		}
	},
	textItem: {
		color: 'black',
		fontFamily: 'montSerrat',
		fontSize: 16
	}
});

export { HelpConfigurationScreenComponent };