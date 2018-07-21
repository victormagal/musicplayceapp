import React from 'react';
import { 
	ScrollView,
	StyleSheet,
	TouchableHighlight,
	View
} from 'react-native';
import { 
	MPHeader,
	MPTextField,
	MPToggleList,
	MPText,
	MPLoading
} from '../../../../components';
import { MPArrowRightIcon } from '../../../../assets/svg';

class HelpSettingsScreenComponent extends React.Component {
	
	state = {
		formLoaded: false,
		form: {}
	};
	
	constructor(props) {
		super(props);
		if (props.profile && props.profile.name) {
			this.state.form = {...props.profile};
			this.state.formLoaded = true;
		}
	}
	
	componentWillReceiveProps(props) {
		if (!this.state.formLoaded && props.profile && props.profile.name) {
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
		const { onBack, faqs } = this.props;
		return (
			<View style={styles.parent}>
        <MPHeader back={true} onBack={onBack} title={"Pesquise sua dúvida ou consulte na lista abaixo"} />
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
						<MPTextField label={"Pesquisar"} />
						<View style={styles.borda}>
              { !!faqs && faqs.map(faq => (
                <MPToggleList key={faq.id} title={faq.attributes.question}>
                  <MPText style={styles.text}>{faq.attributes.answer}</MPText>
                </MPToggleList>
              ))}
							<TouchableHighlight underlayColor="transparent" onPress={this.handleUpdateIdentificacao.bind(this, 'help')}>
								<View style={styles.item}>
									<MPText style={styles.textItem}>Não encontrei minha dúvida</MPText>
									<MPArrowRightIcon />
								</View>
							</TouchableHighlight>
						</View>
						<MPLoading visible={this.props.loading} />
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
	borda: {
		borderTopWidth: 1,
		borderTopColor: '#DFDFDF',
		marginTop: 30
	},
	scroll: {
		flex: 2
	},
	container: {
		marginBottom: 30
	},
	lista: {
		marginTop: 30,
		marginBottom: 15
	},
	text: {
		fontSize: 16,
		fontFamily: 'Montserrat-Regular',
		color: '#686868'
	},
	link: {
		fontSize: 16,
		fontFamily: 'Montserrat-Regular',
		color: '#5994DB',
		textDecorationLine: 'underline'
	},
	item: {
		backgroundColor: '#FFFFFF',
		paddingVertical: 15,
		marginHorizontal: 20,
		marginTop: 30,
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
		fontFamily: 'Montserrat-Regular',
		fontSize: 16
	}
});

export { HelpSettingsScreenComponent };
