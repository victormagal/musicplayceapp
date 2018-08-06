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
} from '../../../../../components/index';

class EditFolderComponent extends React.Component {
	
	state = {
		
	};
	
	constructor(props) {
		super(props);
	}

	handleUpdateIdentificacao = (page) => {
    this.props.onSave(page);
	};

	render() {
		let { onBack, profile } = this.props;
		return (
		  <View style={styles.parent}>
				<MPHeader back={true} onBack={onBack} title={"Definir o nome da pasta"}/>
				<ScrollView style={styles.scroll}>
					<View style={styles.container}>
						<MPTextField label={"Nome da pasta"} style={styles.textFieldContainer} multiline={true} value={"Inspirações rock"} />
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
	textFieldContainer: {
		marginHorizontal: 50,
	}
});

export { EditFolderComponent };
