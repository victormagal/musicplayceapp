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
import {connect} from "react-redux";
import withFixedBottom from "../../../../connectors/withFixedBottom";
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

  onChangeValue = ({ field, value }) => {
	  let { form } = this.state;
	  form[field] = value;
	  this.setState({ form });
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
						<MPTitleFormContainer title={"Identificação"}
                                  textButton={"ALTERAR"}
                                  disabledButton={isProfileDisabled}
                                  onPress={() => this.handleUpdateIdentificacao('profile')} />
						<MPTextField label={"Usuário"}
                         value={form.username}
                         onChangeText={(value) => this.onChangeValue({ field: 'username', value })} />
						<MPTextField label={"Nome"}
                         value={form.name}
                         onChangeText={(value) => this.onChangeValue({ field: 'name', value })} />
						<MPTextField label={"Sobrenome"}
                         value={form.last_name}
                         onChangeText={(value) => this.onChangeValue({ field: 'last_name', value })} />
						<View style={styles.separator}/>
						<MPTitleFormContainer title={"Endereço de e-mail"}
                                  textButton={"ALTERAR"}
                                  disabledButton={form.email === ''}
                                  onPress={() => this.handleUpdateIdentificacao('email')} />
						<MPTextField label={"E-mail"}
                         value={form.email}
                         onChangeText={(value) => this.onChangeValue({ field: 'email', value })} />
						<View style={styles.separator}/>
						<MPTitleFormContainer title={"Telefone celular"}
                                  textButton={"ALTERAR"}
                                  disabledButton={form.cell_phone === ''}
                                  onPress={() => this.handleUpdateIdentificacao('cell_phone')} />
						<MPTextField label={"Nº de telefone"}
                         value={form.cell_phone || ''}
                         onChangeText={(value) => this.onChangeValue({ field: 'cell_phone', value })} />
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
