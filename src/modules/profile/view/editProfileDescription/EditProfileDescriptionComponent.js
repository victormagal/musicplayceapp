import React from 'react';
import { 
	ScrollView, 
	StyleSheet, 
	View 
} from 'react-native';
import { 
	MPHeader, 
	MPText,
	MPTitleFormContainer, 
	MPTextField,
	MPLoading, 
	MPFooter
} from '../../../../components';

class EditProfileDescriptionComponent extends React.Component {
	
	state = {
		
	};
	
	constructor(props) {
		super(props);
	}

	handleUpdateIdentificacao = (page) => {
    this.props.onSave(page);
	};

	render() {
		let { onBack } = this.props;
		return (
		  <View style={styles.parent}>
				<MPHeader back={true} onBack={onBack} title={"Fale de você e do seu trabalho"}/>
				<ScrollView style={styles.scroll}>
					<View style={styles.container}>
						<MPText style={ styles.titleText}t>O que te inspira? Quais suas referências e estilos ? Aproveite para vender seu peixe, esse espaço é seu.</MPText>
						<MPTextField label={"Envie sua mensagem"} style={styles.textFieldContainer} multiline={true} value={""} />
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
        fontFamily: 'probaProRegular',
		color: '#686868',
		marginHorizontal: 50,
	},
	textFieldContainer: {
		marginHorizontal: 50,
	}
});

export { EditProfileDescriptionComponent };