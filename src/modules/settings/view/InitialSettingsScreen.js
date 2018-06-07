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
	MPArrowRightIcon 
} from '../../../assets/svg';
import { connect } from 'react-redux';

class InitialSettingsScreenContainer extends React.Component {
	
	list = {
		data: [
			{
				id: '00',
				rota: 'editSettings',
				title: 'Editar dados cadastrais',
				icon: MPEditConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '01',
				rota: 'notificationsSettings',
				title: 'Personalizar notificações',
				icon: MPNotificationConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '02',
				rota: 'inviteSettings',
				title: 'Convide seus amigos',
				icon: MPInviteConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '03',
				rota: 'helpSettings',
				title: 'Peça ajuda',
				icon: MPHelpConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '04',
				rota: 'passwordSettings',
				title: 'Troque sua senha',
				icon: MPPasswordConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '05',
				rota: 'feedbackSettings',
				title: 'Enviar feedback',
				icon: MPFeedbackConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '06',
				rota: 'termsSettings',
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
				<MPHeader title={"Configure o MusicPlayce do seu jeitinho"} back={true} onBack={this.handleBack}/>
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
				<MPFooter />
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