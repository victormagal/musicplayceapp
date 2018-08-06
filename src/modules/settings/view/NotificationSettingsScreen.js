import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View 
} from 'react-native';
import { 
  MPHeader, 
  MPSelect, 
  MPSwitch, 
  MPFooter,
  MPText
} from '../../../components';
import { connect } from 'react-redux';
import { getNotificationsSettings, patchNotificationSettings } from '../../../state/user/userAction';

class NotificationSettingsScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      notificationSettings: {},
    }
  }

  componentWillMount(){
    this.props.dispatch(getNotificationsSettings());
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.notificationSettings){
      this.setState({notificationSettings: nextProps.notificationSettings});
    }
  }

  handleBack = () => {
    this.props.navigation.pop();
  };

  onChangeSwitch = ({name, value}) => {
    if(value){
      this.props.dispatch(patchNotificationSettings({[name]: 1}));
    }else{
      this.props.dispatch(patchNotificationSettings({[name]: 0}));
    }
  }

  render() {
    let {
      interested_email,
      interested_push,
      interested_sms,
      interested_unit_frequency,
      indication_your_song_email,
      indication_your_song_push,
      indication_your_song_sms,
      indication_your_song_unit_frequency,
      indication_email,
      indication_push,
      indication_sms,
      indication_unit_frequency,
      promotion_email,
      promotion_push,
      promotion_sms,
      promotion_unit_frequency,
      support_email,
      support_push,
      support_sms,
      support_unit_frequency,
    } = this.state.notificationSettings;
    console.log(this.state.notificationSettings);
    return (
      <View style={styles.parent}>
        <MPHeader back={true} onBack={this.handleBack} title={"Preferências de notificação"} />
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.boxText}>
              <MPText style={styles.title}>Novos interessados</MPText>
              <MPText style={styles.paragraph}>Fique sabendo quando entrarem em contato com você</MPText>
            </View>
            <MPSwitch name={'interested_email'} value={!!interested_email} label={"E-mail"} onChangeSwitch={this.onChangeSwitch} />
            <MPSwitch name={'interested_push'} value={!!interested_push} label={"Celular / tablet"} />
            <MPSwitch name={'interested_sms'} value={!!interested_sms} label={"SMS"} />
            <View style={styles.separator} />
            <View style={styles.boxText}>
              <MPText style={styles.title}>Indicaram sua música</MPText>
              <MPText style={styles.paragraph}>Fique sabendo quando indicarem suas composições</MPText>
            </View>
            {/* <MPSelect /> */}
            <MPSwitch name={'indication_your_song_email'} value={!!indication_your_song_email}  label={"E-mail"} />
            <MPSwitch name={'indication_your_song_push'} value={!!indication_your_song_push} label={"Celular / tablet"} />
            <MPSwitch name={'indication_your_song_sms'} value={!!indication_your_song_sms} label={"SMS"} />
            <View style={styles.separator} />
            <View style={styles.boxText}>
              <MPText style={styles.title}>Indicaram para você</MPText>
              <MPText style={styles.paragraph}>Fique sabendo quando indicarem músicas para você</MPText>
            </View>
            {/* <MPSelect /> */}
            <MPSwitch name={'indication_email'} value={!!indication_email} label={"E-mail"} />
            <MPSwitch name={'indication_push'} value={!!indication_push} label={"Celular / tablet"} />
            <MPSwitch name={'indication_sms'} value={!!indication_sms} label={"SMS"} />
            <View style={styles.separator} />
            <View style={styles.boxText}>
              <MPText style={styles.title}>Promoções e dicas</MPText>
              <MPText style={styles.paragraph}>Receba promoções e dicas para turbinar o seu perfil</MPText>
            </View>
            <MPSwitch name={'promotion_email'} value={!!promotion_email} label={"E-mail"} />
            <MPSwitch name={'promotion_push'} value={!!promotion_push} label={"Celular / tablet"} />
            <MPSwitch name={'promotion_sms'} value={!!promotion_sms} label={"SMS"} />
            <View style={styles.separator} />
            <View style={styles.boxText}>
              <MPText style={styles.title}>Ajuda</MPText>
              <MPText style={styles.paragraph}>Quando entrar em contato com a gente, como prefere receber nossas respostas e avisos importantes?</MPText>
            </View>
            <MPSwitch name={'support_email'} value={!!support_email} label={"E-mail"} />
            <MPSwitch name={'support_push'} value={!!support_push} label={"Celular / tablet"} />
            <MPSwitch name={'support_sms'} value={!!support_sms} label={"SMS"} />
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
  boxText: {
    marginHorizontal: 40
  },
  title: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    marginBottom: 5
  },
  paragraph: {
    fontSize: 16,
    color: '#686868',
    fontFamily: 'Montserrat-Regular'
  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(104, 104, 104, 0.8)',
    marginHorizontal: 40,
    marginVertical: 30
  }
});

const mapStateToProps = ({ fontReducer, userReducer }) => {
  return { ...fontReducer, ...userReducer };
};

const NotificationSettingsScreen = connect(mapStateToProps)(NotificationSettingsScreenContainer);
export { NotificationSettingsScreen };
