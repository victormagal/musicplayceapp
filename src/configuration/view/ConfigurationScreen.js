import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { MPHeader, MPItemList, MPFooter } from '../../components';
import { MPEditConfigIcon, MPNotificationConfigIcon, MPInviteConfigIcon, MPHelpConfigIcon, MPPasswordConfigIcon, MPFeedbackConfigIcon, MPTermsConfigIcon, MPArrowRightIcon } from '../../assets/svg';
import { connect } from 'react-redux';

class ConfigurationScreenComponent extends React.Component {
	
	list = {
		data: [
			{
				id: '00',
				rota: 'editConfiguration',
				title: 'Editar dados cadastrais',
				icon: MPEditConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '01',
				rota: 'notificationConfiguration',
				title: 'Personalizar notificações',
				icon: MPNotificationConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '02',
				rota: 'inviteConfiguration',
				title: 'Convide seus amigos',
				icon: MPInviteConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '03',
				rota: 'helpConfiguration',
				title: 'Peça ajuda',
				icon: MPHelpConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '04',
				rota: 'changePasswordConfiguration',
				title: 'Troque sua senha',
				icon: MPPasswordConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '05',
				rota: 'feedbackConfiguration',
				title: 'Enviar feedback',
				icon: MPFeedbackConfigIcon,
				iconNext: MPArrowRightIcon
			},
			{
				id: '06',
				rota: 'termsConfiguration',
				title: 'Termos e condições',
				icon: MPTermsConfigIcon,
				iconNext: MPArrowRightIcon
			}
		]
	};

	handleBackClick = () => {
		this.props.navigation.pop();
	};
	
	render() {
		return (
			<View style={styles.parent}>
				<MPHeader title={"Configure o MusicPlayce do seu jeitinho"} back={true} onBack={this.handleBackClick}/>
				<ScrollView style={styles.scroll}>
					<FlatList
						data={this.list.data}
						keyExtractor={item => item.id}
						renderItem={({ item }) => {
							return (
								<MPItemList item={item} {...this.props} />
							)
						}}
					/>
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
	}
});

const mapStateToProps = () => {
	return {};
};

const ConfigurationScreen = connect(mapStateToProps)(ConfigurationScreenComponent);
export { ConfigurationScreen };
