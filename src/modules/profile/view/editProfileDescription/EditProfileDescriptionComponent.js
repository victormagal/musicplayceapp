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

class EditProfileDescriptionComponent extends React.Component {
	
	state = {
		
	};
	
	constructor(props) {
		super(props);
	}
	
	// componentWillReceiveProps(props) {
	// 	if (!this.state.formLoaded && props.profile.name) {
	// 		let state = {...this.state};
	// 		state.form = {...props.profile};
	// 		state.formLoaded = true;
	// 		this.setState(state);
	// 	}
	// }

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
    }
});

export { EditProfileDescriptionComponent };