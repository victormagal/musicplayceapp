import React from 'react';
import {
  View,
	ScrollView, 
	StyleSheet,
  Keyboard,
  TouchableOpacity
} from 'react-native';
import {
  MPText,
	MPHeader,
	MPTextField,
	MPLoading
} from '../../../../components';

class PasswordSettingsScreenComponent extends React.Component {
	
	state = {
	  error: null,
		form: {
		  current_password: '',
      password: '',
      password_confirmation: ''
    }
	};

	componentWillReceiveProps(nextProps) {
	  if (nextProps.saveProfileError !== this.props.saveProfileError && nextProps.saveProfileError !== null) {
	    this.setState({ error: nextProps.saveProfileError });
    }
  }

	handleUpdateIdentificacao = () => {
	  let error = null;
	  const { form } = this.state;
	  const formData = { ...this.props.profile, ...form };

	  Keyboard.dismiss();

	  if (form.password !== form.password_confirmation) {
	    error = 'Senha e confirmação de senha devem ser iguais.';
    } else if (form.password === form.current_password) {
	    error= 'A nova senha é igual a senha atual.';
    } else {
      delete formData.password_confirmation;
      this.props.onSave(formData, 'password');
    }
	  this.setState({ error });
	};

  renderHeaderMenuRight() {
    const { form } = this.state;
    const isDisabled = form.password_confirmation === '' || form.password === '' || form.current_password === '';
    const color = isDisabled ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)';
    return [
      <TouchableOpacity
        setOpacity={1}
        key={Math.random()}
        disabled={isDisabled}
        onPress={() => this.handleUpdateIdentificacao()}
      >
        <MPText style={[styles.headerText, { color }]}>
          Enviar
        </MPText>
      </TouchableOpacity>
    ];
  }

	render() {
		const { onBack } = this.props;
		const { form, error } = this.state;
		return (
			<View style={styles.parent}>
				<MPHeader
          back={true}
          onBack={onBack}
          icons={this.renderHeaderMenuRight()}
          title={"Troque sua senha de acesso"}
        />
				<ScrollView style={styles.scroll}>
					<View style={styles.container}>
						<MPTextField
              secureTextEntry={true}
              label={"Senha atual"}
              value={form.current_password}
              onChangeText={(value) => {
                form.current_password = value;
                this.setState({ form })
              }}
            />
						<MPTextField
              secureTextEntry={true}
              label={"Nova senha"}
              value={form.password}
              onChangeText={(value) => {
                form.password = value;
                this.setState({ form })
              }}
            />
						<MPTextField
              secureTextEntry={true}
              label={"Confirme a nova senha"}
              value={form.password_confirmation}
              onChangeText={(value) => {
                form.password_confirmation = value;
                this.setState({ form })
              }}
            />
            { !!error &&
              <MPText style={styles.errorText}>
                { error }
              </MPText>
            }
					</View>
				</ScrollView>
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
		marginTop: 20,
		marginBottom: 30,
    marginHorizontal: 20
	},
  headerText: {
    fontWeight: "500",
    fontFamily: 'Montserrat-Medium',
    fontSize: 13
  },
  errorText: {
    color: 'rgba(255,0,0,1)',
    fontFamily: 'Montserrat',
    fontSize: 12,
    marginTop: 10
  }
});

export { PasswordSettingsScreenComponent };
