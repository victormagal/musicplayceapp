import React from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { MPHeader } from '../../components';
import { ItemList } from '../../components/configuration/ItemList';
import { MPFooter } from '../../components';

class ConfigurationScreenComponent extends React.Component {
	
	list = {
		data: [
			{
				id: '00',
				rota: 'editConfiguration',
				name: 'Editar dados cadastrais',
				width: '20',
				height: '20',
				viewBox: '0 0 32 32',
				paths: [
					{
						fill: 'none',
						stroke: '#E13223',
						strokeWidth: '1.6',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M31.2 13.171l-11.387-12.371h-16.445c-1.397 0-2.568 1.309-2.568 2.965v24.47c0 1.656 1.171 2.965 2.568 2.965h25.264c1.397 0 2.568-1.309 2.568-2.965v-15.064z'
					},
					{
						fill: 'none',
						stroke: '#E13223',
						strokeWidth: '1.6',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M12.52 23.2l18.339-18.56-3.696-3.52-18.363 18.352v3.728h3.72z'
					}
				]
			},
			{
				id: '01',
				rota: 'notificationConfiguration',
				name: 'Personalizar notificações',
				width: '18',
				height: '22',
				viewBox: '0 0 26 32',
				paths: [
					{
						fill: 'none',
						stroke: '#E13223',
						strokeWidth: '1.4545',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M23.818 12.844v-0.017c0.167-7.219-4.413-12.099-10.727-12.099-6.249 0-10.727 4.825-10.727 12.116v7.67c0 0.785-0.255 1.321-0.86 2.161l-0.096 0.132c-0.518 0.716-0.681 1.055-0.681 1.543 0 0.611 0.49 1.104 1.095 1.104h22.537c0 0 0 0 0 0 0.605 0 1.095-0.49 1.095-1.095 0-0.003 0-0.005-0-0.008v0c0-0.378-0.151-0.7-0.598-1.34l-0.089-0.127c-0.687-0.979-0.95-1.527-0.95-2.371v-7.671zM10.176 28.364l0.007 0.029c0.349 1.303 1.519 2.247 2.909 2.247 1.387 0 2.554-0.939 2.901-2.216l0.005-0.021 0.010-0.039h-5.833z'
					}
				]
			},
			{
				id: '02',
				rota: 'inviteConfiguration',
				name: 'Convide seus amigos',
				width: '23',
				height: '20',
				viewBox: '0 0 37 32',
				paths: [
					{
						fill: 'none',
						stroke: '#E13223',
						strokeWidth: '1.6',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M13.6 0.8c-3.626 0-6.179 2.384-6.179 6.088 0 3.926 2.79 7.072 6.179 7.072 3.392 0 6.181-3.146 6.181-7.072 0-3.704-2.554-6.088-6.181-6.088zM26.392 27.539l-0.006-0.397c-0.006-0.409-0.013-0.739-0.022-1.069l0.003 0.125-0.008-0.219c-0.563-4.722-5.083-7.040-12.56-7.040l-0.091 0.003-0.123 0.003-0.091-0.003h-0.005l-0.088-0.002c-7.478 0-11.998 2.317-12.56 7.040-0.005 0.037-0.014 0.456-0.027 1.16l-0.006 0.402c3.594 2.416 7.882 3.659 12.794 3.658 4.826 0 9.187-1.27 12.792-3.661z'
					},
					{
						fill: '#E13223',
						stroke: 'none',
						strokeWidth: '0',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M29.6 6.4c0.442 0 0.8 0.358 0.8 0.8v12.8c0 0.442-0.358 0.8-0.8 0.8s-0.8-0.358-0.8-0.8v-12.8c0-0.442 0.358-0.8 0.8-0.8z'
					},
					{
						fill: '#E13223',
						stroke: 'none',
						strokeWidth: '0',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M23.2 12.8h12.8c0.442 0 0.8 0.358 0.8 0.8s-0.358 0.8-0.8 0.8h-12.8c-0.442 0-0.8-0.358-0.8-0.8s0.358-0.8 0.8-0.8z'
					}
				]
			},
			{
				id: '03',
				rota: 'editConfiguration',
				name: 'Peça ajuda',
				width: '9',
				height: '19',
				viewBox: '0 0 18 32',
				paths: [
					{
						fill: 'none',
						stroke: '#E13223',
						strokeWidth: '1.6',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M1.6 7.68c0.966-4.051 3.491-6.080 7.574-6.080s6.336 2.027 6.76 6.080c0.36 3.744-0.746 6.362-3.314 7.85-2.57 1.488-3.843 3.925-3.821 7.312v2.758'
					},
					{
						fill: '#E13223',
						stroke: 'none',
						strokeWidth: '0',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M11.2 30.4c0 0.884-0.716 1.6-1.6 1.6s-1.6-0.716-1.6-1.6c0-0.884 0.716-1.6 1.6-1.6s1.6 0.716 1.6 1.6z'
					}
				]
			},
			{
				id: '04',
				rota: 'changePasswordConfiguration',
				name: 'Troque sua senha',
				width: '18',
				height: '22',
				viewBox: '0 0 27 32',
				paths: [
					{
						fill: 'none',
						stroke: '#E13223',
						strokeWidth: '1.5238',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M26.621 31.238c0.027 0 0.046-0.017 0.046-0.034v-16.695c0-0.015-0.018-0.034-0.046-0.034h-25.813c-0.027 0-0.046 0.017-0.046 0.034v16.695c0 0.015 0.018 0.034 0.046 0.034h25.813zM23.619 11.429v-1.181c0-5.132-4.425-9.31-9.905-9.31s-9.905 4.178-9.905 9.31v1.181h19.81z'
					}
				]
			},
			{
				id: '05',
				rota: 'editConfiguration',
				name: 'Alterar plano',
				width: '22',
				height: '20',
				viewBox: '0 0 32 32',
				paths: [
					{
						fill: '#E13223',
						stroke: 'none',
						strokeWidth: '0',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M2.483 8l6.031 6.031c0.284 0.284 0.284 0.745 0 1.029s-0.745 0.284-1.029 0l-7.060-7.060 7.060-7.060c0.284-0.284 0.745-0.284 1.029 0s0.284 0.744 0 1.029l-6.031 6.031z'
					},
					{
						fill: '#E13223',
						stroke: 'none',
						strokeWidth: '0',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M8.639 17.969c-0.284-0.284-0.284-0.744 0-1.029s0.745-0.284 1.029 0l7.060 7.060-7.060 7.060c-0.284 0.284-0.745 0.284-1.029 0s-0.284-0.744 0-1.029l6.031-6.031-6.031-6.031z'
					},
					{
						fill: '#D8D8D8',
						stroke: 'none',
						strokeWidth: '0',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M2.182 7.273h29.091c0.402 0 0.727 0.326 0.727 0.727s-0.326 0.727-0.727 0.727h-29.091c-0.402 0-0.727-0.326-0.727-0.727s0.326-0.727 0.727-0.727z'
					},
					{
						fill: 'none',
						stroke: '#E13223',
						strokeWidth: '1.4545',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M2.909 8h27.636c0.402 0 0.727 0.326 0.727 0.727s-0.326 0.727-0.727 0.727h-27.636c-0.402 0-0.727-0.326-0.727-0.727s0.326-0.727 0.727-0.727z'
					},
					{
						fill: '#D8D8D8',
						stroke: 'none',
						strokeWidth: '0',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M0.727 23.273h14.545c0.402 0 0.727 0.326 0.727 0.727s-0.326 0.727-0.727 0.727h-14.545c-0.402 0-0.727-0.326-0.727-0.727s0.326-0.727 0.727-0.727z'
					},
					{
						fill: 'none',
						stroke: '#E13223',
						strokeWidth: '1.4545',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M1.455 24h13.091c0.402 0 0.727 0.326 0.727 0.727s-0.326 0.727-0.727 0.727h-13.091c-0.402 0-0.727-0.326-0.727-0.727s0.326-0.727 0.727-0.727z'
					},
					{
						fill: 'none',
						stroke: '#E13223',
						strokeWidth: '1.4545',
						strokeLinecap: 'round',
						strokeLinejoin: 'miter',
						d: 'M20.364 24.045c0.32 2.394 2.050 3.591 5.191 3.591s4.8-0.985 4.976-2.955c0.143-1.574-0.751-2.732-2.683-3.474-2.898-1.113-6.332-1.526-7.121-3.945s1.681-4.171 4.829-4.171c2.789 0 4.944 1.61 4.976 3.16'
					},
					{
						fill: '#E13223',
						stroke: 'none',
						strokeWidth: '0',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M25.455 10.182c0.402 0 0.727 0.326 0.727 0.727v18.909c0 0.402-0.326 0.727-0.727 0.727s-0.727-0.326-0.727-0.727v-18.909c0-0.402 0.326-0.727 0.727-0.727z'
					}
				]
			},
			{
				id: '06',
				rota: 'editConfiguration',
				name: 'Alterar forma de pagamento',
				width: '10',
				height: '22',
				viewBox: '0 0 17 32',
				paths: [
					{
						fill: 'none',
						stroke: '#E13223',
						strokeWidth: '1.4545',
						strokeLinecap: 'round',
						strokeLinejoin: 'miter',
						d: 'M1.455 21.891c0.457 3.83 2.928 5.745 7.415 5.745s6.857-1.575 7.108-4.727c0.205-2.519-1.072-4.372-3.833-5.559-4.141-1.782-9.047-2.441-10.173-6.313-1.129-3.869 2.4-6.673 6.897-6.673 3.985 0 7.063 2.577 7.108 5.056'
					},
					{
						fill: '#E13223',
						stroke: 'none',
						strokeWidth: '0',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M9.455 0c0.402 0 0.727 0.326 0.727 0.727v30.545c0 0.402-0.326 0.727-0.727 0.727s-0.727-0.326-0.727-0.727v-30.545c0-0.402 0.326-0.727 0.727-0.727z'
					}
				]
			},
			{
				id: '07',
				rota: 'feedbackConfiguration',
				name: 'Enviar feedback',
				width: '24',
				height: '22',
				viewBox: '0 0 35 32',
				paths: [
					{
						fill: 'none',
						stroke: '#E13223',
						strokeWidth: '1.4545',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M29.508 0.727h-24.108c-1.241 0-2.429 0.495-3.306 1.375-0.845 0.848-1.367 2.019-1.367 3.311 0 0.002 0 0.005 0 0.007v-0 14.259c0 0.004 0 0.008 0 0.012 0 1.291 0.522 2.461 1.366 3.309l-0-0c0.877 0.88 2.065 1.375 3.308 1.375h2.599v5.465c0 1.615 0.593 1.875 1.775 0.78l6.733-6.244h13.011c1.291-0.003 2.458-0.529 3.302-1.379l0-0c0.841-0.848 1.361-2.016 1.361-3.305 0-0.004 0-0.008 0-0.012v0.001-14.262c0-0.002 0-0.004 0-0.006 0-1.292-0.522-2.462-1.367-3.31l0 0c-0.845-0.848-2.014-1.373-3.306-1.373-0 0-0 0-0 0h0z'
					},
					{
						fill: '#E13223',
						stroke: 'none',
						strokeWidth: '0',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M11.636 11.636c0 0.803-0.651 1.455-1.455 1.455s-1.455-0.651-1.455-1.455c0-0.803 0.651-1.455 1.455-1.455s1.455 0.651 1.455 1.455z'
					},
					{
						fill: '#E13223',
						stroke: 'none',
						strokeWidth: '0',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M18.909 11.636c0 0.803-0.651 1.455-1.455 1.455s-1.455-0.651-1.455-1.455c0-0.803 0.651-1.455 1.455-1.455s1.455 0.651 1.455 1.455z'
					},
					{
						fill: '#E13223',
						stroke: 'none',
						strokeWidth: '0',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M26.182 11.636c0 0.803-0.651 1.455-1.455 1.455s-1.455-0.651-1.455-1.455c0-0.803 0.651-1.455 1.455-1.455s1.455 0.651 1.455 1.455z'
					}
				]
			},
			{
				id: '08',
				rota: 'editConfiguration',
				name: 'Termos e condições',
				width: '16',
				height: '26',
				viewBox: '0 0 23 32',
				paths: [
					{
						fill: 'none',
						stroke: '#E13223',
						strokeWidth: '1.1429',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M11.434 20.249l-0.013 0.001-0.043 0.006c0.001 0-0.017 0.003-0.035 0.005l-0.017 0.002-1.483 1.032-0.333-0.425-0.838-1.070-1.848 0.553-0.181-0.517-0.441-1.272-1.92-0.037-0.010-0.55-0.026-1.363-1.794-0.621 0.158-0.526 0.4-1.314-1.503-1.17 0.311-0.446 0.787-1.123-1.111-1.586 0.458-0.329 1.109-0.794-0.555-1.842 1.794-0.619v-1.968l0.56-0.011 1.369-0.024 0.623-1.789 1.847 0.553 1.171-1.496 1.573 1.094 1.577-1.097 0.331 0.432 0.862 1.12 1.848-0.553 0.179 0.517 0.441 1.272 1.92 0.037 0.011 0.55 0.026 1.4 1.767 0.611-0.158 0.526-0.4 1.314 1.503 1.17-0.311 0.446-0.787 1.123 1.098 1.568-1.499 1.168 0.554 1.843-0.518 0.179-1.277 0.44-0.037 1.913-0.551 0.011-1.368 0.025-0.623 1.789-1.848-0.553-1.17 1.495-1.581-1.099z'
					},
					{
						fill: 'none',
						stroke: '#E13223',
						strokeWidth: '1.1429',
						strokeLinecap: 'butt',
						strokeLinejoin: 'miter',
						d: 'M11.429 6.286c2.85 0 5.143 2.293 5.143 5.143-0.006 2.838-2.305 5.136-5.142 5.143h-0.001c-2.838-0.006-5.136-2.305-5.143-5.142v-0.001c0.006-2.838 2.305-5.136 5.142-5.143h0.001zM7.429 25.714v5.411l4.069-1.783 3.931 1.773v-5.401h-8z'
					}
				]
			}
		]
	};

    handleBackClick = () => {
		this.props.navigation.pop();
	};
	
	render() {
		return (
			<View style={styles.parent}>
				<MPHeader style={styles.header} title={"Configure o MusicPlayce do seu jeitinho"} back={true} onBack={this.handleBackClick}/>
				<ScrollView style={styles.scroll}>
					<FlatList
						data={this.list.data}
						keyExtractor={item => item.id}
						renderItem={({ item }) => {
							return (
								<ItemList item={item} {...this.props} />
							)
						}}
					/>
				</ScrollView>
				<MPFooter style={styles.footer} />
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
	header: {
		flex: 1
	},
	scroll: {
		flex: 2
	},
	footer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-end'
	}
});

const mapStateToProps = () => {
	return {};
};

const ConfigurationScreen = connect(mapStateToProps)(ConfigurationScreenComponent);
export { ConfigurationScreen };