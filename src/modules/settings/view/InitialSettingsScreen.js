import React from 'react';
import {
  FlatList, ScrollView, StyleSheet, View, Share
} from 'react-native';
import {
  MPHeader, MPItemList, MPFloatingNotification
} from '../../../components';
import {
  MPEditConfigIcon,
  MPNotificationConfigIcon,
  MPHelpConfigIcon,
  MPPasswordConfigIcon,
  MPFeedbackConfigIcon,
  MPTermsConfigIcon,
  MPArrowRightIcon,
  MPChangePlanIcon,
  MPPaymentTypesIcon,
  MPInviteConfigIcon,
} from '../../../assets/svg';
import {connect} from 'react-redux';

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
      	onChooseOption: () => Share.share({
          title: 'Musicplayce',
          message: 'Gostaria de te convidar a participar do Musicplayce...',
          dialogTitle: 'Convidar amigos',
        }),
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
        title: 'Minha assinatura',
        icon: MPPaymentTypesIcon,
        iconNext: MPArrowRightIcon
      },
      {
        id: '06',
        onChooseOption: () => this.props.navigation.navigate('feedbackSettings'),
        title: 'Enviar feedback',
        icon: MPFeedbackConfigIcon,
        iconNext: MPArrowRightIcon
      },
      {
        id: '07',
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
        <MPHeader
          back={true}
          onBack={this.handleBack}
          title="Configure o MusicPlayce do seu jeitinho"
        />
        <View style={styles.container}>
          <FlatList
            data={this.list.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <MPItemList item={item} {...this.props} />}
          />
        </View>

        <MPFloatingNotification visible={this.props.feedbackSaveSuccess}
                                text="Obrigado, recebemos seu feedback, em breve entraremos em contato"
                                icon={<MPFeedbackConfigIcon />}/>
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
  container: {
    flex: 2,
    marginTop: 30,
    marginBottom: 10
  }
});

const mapStateToProps = ({feedbackReducer}) => {
  return {...feedbackReducer};
};

const InitialSettingsScreen = connect(mapStateToProps)(InitialSettingsScreenContainer);
export {InitialSettingsScreen};
