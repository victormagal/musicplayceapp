import React from 'react';
import { 
	FlatList, 
	ScrollView, 
	StyleSheet, 
	View 
} from 'react-native';
import { 
	MPHeader, 
	MPItemList, 
	MPFooter 
} from '../../../components';
import { 
	MPEditConfigIcon, 
	MPNotificationConfigIcon, 
	MPInviteConfigIcon, 
	MPHelpConfigIcon, 
	MPPasswordConfigIcon, 
	MPFeedbackConfigIcon, 
	MPTermsConfigIcon, 
	MPArrowRightIcon, 
	MPChangePlanIcon,
	MPPaymentTypesIcon,
} from '../../../assets/svg';
import { connect } from 'react-redux';

class InitialSettingsScreenContainer extends React.Component {
	
	list = {
		data: [
			{
				id: '00',
				onChooseOption: () => this.props.navigation.navigate('editSettings'),
				title: 'Editar dados cadastrais',
				icon: MPEditConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '01',
				onChooseOption: () => this.props.navigation.navigate('notificationsSettings'),
				title: 'Personalizar notificações',
				icon: MPNotificationConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '02',
				onChooseOption: () => this.props.navigation.navigate('inviteSettings'),
				title: 'Convide seus amigos',
				icon: MPInviteConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '03',
				onChooseOption: () => this.props.navigation.navigate('helpSettings'),
				title: 'Peça ajuda',
				icon: MPHelpConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '04',
				onChooseOption: () => this.props.navigation.navigate('passwordSettings'),
				title: 'Troque sua senha',
				icon: MPPasswordConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '05',
				onChooseOption: () => this.props.navigation.navigate('addChangePlanSettings'),
				title: 'Alterar plano',
				icon: MPChangePlanIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '06',
				onChooseOption: () => this.props.navigation.navigate('paymentTypesSettings'),
				title: 'Alterar forma de pagamento',
				icon: MPPaymentTypesIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '07',
				onChooseOption: () => this.props.navigation.navigate('feedbackSettings'),
				title: 'Enviar feedback',
				icon: MPFeedbackConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '08',
				onChooseOption: () => this.props.navigation.navigate('termsSettings'),
				title: 'Termos e condições',
				icon: MPTermsConfigIcon,
				iconNext: MPArrowRightIcon
			}
		]
	};

  handleBack = () => {
    this.props.navigation.pop();
  };
	
	render() {
		return (
			<View style={styles.parent}>
				<MPHeader back={true} onBack={this.handleBack} title="Configure o MusicPlayce do seu jeitinho"/>
				<ScrollView style={styles.scroll}>
					<View style={styles.container}>
						<FlatList
							data={this.list.data}
							keyExtractor={item => item.id}
							renderItem={({ item }) => {
								return (
									<MPItemList item={item} {...this.props} />
								)
							}}
						/>
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
		backgroundColor: '#FCFCFC'
	},
	scroll: {
		flex: 2
	},
	container: {
		marginTop: 30,
		marginBottom: 10
	}
});

const mapStateToProps = () => {
	return {};
};

const InitialSettingsScreen = connect(mapStateToProps)(InitialSettingsScreenContainer);
export { InitialSettingsScreen };
