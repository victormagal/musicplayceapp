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
import { getNotificationsSettings } from '../../../state/user/userAction';

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
      this.setState({notificationSettings: nextProps.notificationSettings.attributes});
    }
  }

  handleBack = () => {
    this.props.navigation.pop();
  };

  render() {
    let {
      interested_email,
      interested_push,
      interested_sms,
      interested_unit_frequency,
      indicate_your_song_email,
      indicate_your_song_push,
      indicate_your_song_sms,
      indicate_your_song_unit_frequency,
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
    console.log(interested_email);
    return (
      <View style={styles.parent}>
        <MPHeader back={true} onBack={this.handleBack} title={"Preferências de notificação"} />
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.boxText}>
              <MPText style={styles.title}>Novos interessados</MPText>
              <MPText style={styles.paragraph}>Fique sabendo quando entrarem em contato com você</MPText>
            </View>
            <MPSwitch value={interested_email ? true : false} label={"E-mail"} />
            <MPSwitch label={"Celular / tablet"} />
            <MPSwitch label={"SMS"} />
            <View style={styles.separator} />
            <View style={styles.boxText}>
              <MPText style={styles.title}>Indicaram sua música</MPText>
              <MPText style={styles.paragraph}>Fique sabendo quando indicarem suas composições</MPText>
            </View>
            {/* <MPSelect /> */}
            <MPSwitch label={"E-mail"} />
            <MPSwitch label={"Celular / tablet"} />
            <MPSwitch label={"SMS"} />
            <View style={styles.separator} />
            <View style={styles.boxText}>
              <MPText style={styles.title}>Indicaram para você</MPText>
              <MPText style={styles.paragraph}>Fique sabendo quando indicarem músicas para você</MPText>
            </View>
            {/* <MPSelect /> */}
            <MPSwitch label={"E-mail"} />
            <MPSwitch label={"Celular / tablet"} />
            <MPSwitch label={"SMS"} />
            <View style={styles.separator} />
            <View style={styles.boxText}>
              <MPText style={styles.title}>Promoções e dicas</MPText>
              <MPText style={styles.paragraph}>Receba promoções e dicas para turbinar o seu perfil</MPText>
            </View>
            <MPSwitch label={"E-mail"} />
            <MPSwitch label={"Celular / tablet"} />
            <MPSwitch label={"SMS"} />
            <View style={styles.separator} />
            <View style={styles.boxText}>
              <MPText style={styles.title}>Ajuda</MPText>
              <MPText style={styles.paragraph}>Quando entrar em contato com a gente, como prefere receber nossas respostas e avisos importantes?</MPText>
            </View>
            <MPSwitch label={"E-mail"} />
            <MPSwitch label={"Celular / tablet"} />
            <MPSwitch label={"SMS"} />
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
