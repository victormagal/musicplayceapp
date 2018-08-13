import React from 'react';
import { 
  ScrollView, 
  StyleSheet,
  View 
} from 'react-native';
import { 
  MPHeader,
  MPSwitch,
  MPText
} from '../../../components';
import { connect } from 'react-redux';
import { getNotificationsSettings, patchNotificationSettings } from '../../../state/user/userAction';
import {MPLoading} from "../../../components/general";

class NotificationSettingsScreenContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(getNotificationsSettings());
  }

  componentWillReceiveProps(nextProps){
    if (this.props.isUserNotificationsSaved !== nextProps.isUserNotificationsSaved && nextProps.isUserNotificationsSaved) {
      this.props.dispatch(getNotificationsSettings());
    }
  }

  handleBack = () => {
    this.props.navigation.pop();
  };

  onChangeSwitch = ({ name, value }) => {
    if (value) {
      this.props.dispatch(patchNotificationSettings({[name]: 1}));
    } else {
      this.props.dispatch(patchNotificationSettings({[name]: 0}));
    }
  }

  render() {
    const { notificationSettings } = this.props;

    if (notificationSettings === null) {
      return (
        <View style={styles.parent}>
          <MPLoading visible={this.props.loading}/>
        </View>
      )
    }

    return (
      <View style={styles.parent}>
        <MPHeader
          back={true}
          onBack={this.handleBack}
          title={"Preferências de notificação"}
        />
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.boxText}>
              <MPText style={styles.title}>
                Novos interessados
              </MPText>
              <MPText style={styles.paragraph}>
                Fique sabendo quando entrarem em contato com você
              </MPText>
            </View>
            <MPSwitch
              name={'interested_email'}
              value={!!notificationSettings.interested_email}
              label={"E-mail"}
              onChangeSwitch={this.onChangeSwitch}
            />
            <MPSwitch
              name={'interested_push'}
              value={!!notificationSettings.interested_push}
              label={"Celular / tablet"}
              onChangeSwitch={this.onChangeSwitch}
            />
            <View style={styles.separator} />
            <View style={styles.boxText}>
              <MPText style={styles.title}>
                Indicaram sua música
              </MPText>
              <MPText style={styles.paragraph}>
                Fique sabendo quando indicarem suas composições
              </MPText>
            </View>
            <MPSwitch
              name={'indication_your_song_email'}
              value={!!notificationSettings.indication_your_song_email}
              label={"E-mail"}
              onChangeSwitch={this.onChangeSwitch}
            />
            <MPSwitch
              name={'indication_your_song_push'}
              value={!!notificationSettings.indication_your_song_push}
              label={"Celular / tablet"}
              onChangeSwitch={this.onChangeSwitch}
            />
            <View style={styles.separator} />
            <View style={styles.boxText}>
              <MPText style={styles.title}>
                Indicaram para você
              </MPText>
              <MPText style={styles.paragraph}>
                Fique sabendo quando indicarem músicas para você
              </MPText>
            </View>
            <MPSwitch
              name={'indication_email'}
              value={!!notificationSettings.indication_email}
              label={"E-mail"}
              onChangeSwitch={this.onChangeSwitch}
            />
            <MPSwitch
              name={'indication_push'}
              value={!!notificationSettings.indication_push}
              label={"Celular / tablet"}
              onChangeSwitch={this.onChangeSwitch}
            />
            <View style={styles.separator} />
            <View style={styles.boxText}>
              <MPText style={styles.title}>
                Promoções e dicas
              </MPText>
              <MPText style={styles.paragraph}>
                Receba promoções e dicas para turbinar o seu perfil
              </MPText>
            </View>
            <MPSwitch
              name={'promotion_email'}
              value={!!notificationSettings.promotion_email}
              label={"E-mail"}
              onChangeSwitch={this.onChangeSwitch}
            />
            <MPSwitch
              name={'promotion_push'}
              value={!!notificationSettings.promotion_push}
              label={"Celular / tablet"}
              onChangeSwitch={this.onChangeSwitch}
            />
            <View style={styles.separator} />
            <View style={styles.boxText}>
              <MPText style={styles.title}>
                Ajuda
              </MPText>
              <MPText style={styles.paragraph}>
                Quando entrar em contato com a gente, como prefere receber nossas respostas e avisos importantes?
              </MPText>
            </View>
            <MPSwitch
              name={'support_email'}
              value={!!notificationSettings.support_email}
              label={"E-mail"}
              onChangeSwitch={this.onChangeSwitch}
            />
            <MPSwitch
              name={'support_push'}
              value={!!notificationSettings.support_push}
              label={"Celular / tablet"}
              onChangeSwitch={this.onChangeSwitch}
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
