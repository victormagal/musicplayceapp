import React from 'react';
import { Picker, ScrollView, StyleSheet, TouchableWithoutFeedback, Text, View } from 'react-native';
import { MPHeader, MPSelect, MPTextField, MPSwitch } from '../../components';
import { connect } from 'react-redux';

class NotificationConfigurationScreenComponent extends React.Component {

  render() {
    return (
      <View style={styles.parent}>
        <MPHeader style={styles.header} back={true} onBack={this.handleBackClick} title={"Preferências de notificação."} />
        <ScrollView style={styles.scroll}>
          {
            this.props.fontLoaded ? (
              <View style={styles.boxText}>
                <Text style={styles.title}>Novos interessados</Text>
                <Text style={styles.paragraph}>Fique sabendo quando entrarem em contato com você</Text>
              </View>
            ) : null
          }
          <MPSwitch label={"E-mail"} />
          <MPSwitch label={"Celular / tablet"} />
          <MPSwitch label={"SMS"} />
          <View style={styles.separator} />
          {
            this.props.fontLoaded ? (
              <View style={styles.boxText}>
                <Text style={styles.title}>Indicaram sua música</Text>
                <Text style={styles.paragraph}>Fique sabendo quando indicarem suas composições</Text>
              </View>
            ) : null
          }
          <MPSelect />
          <MPSwitch label={"E-mail"} />
          <MPSwitch label={"Celular / tablet"} />
          <MPSwitch label={"SMS"} />
          <View style={styles.separator} />
          {
            this.props.fontLoaded ? (
              <View style={styles.boxText}>
                <Text style={styles.title}>Indicaram para você</Text>
                <Text style={styles.paragraph}>Fique sabendo quando indicarem músicas para você</Text>
              </View>
            ) : null
          }
          <MPSelect />
          <MPSwitch label={"E-mail"} />
          <MPSwitch label={"Celular / tablet"} />
          <MPSwitch label={"SMS"} />
          <View style={styles.separator} />
          {
            this.props.fontLoaded ? (
              <View style={styles.boxText}>
                <Text style={styles.title}>Promoções e dicas</Text>
                <Text style={styles.paragraph}>Receba promoções e dicas para turbinar o seu perfil</Text>
              </View>
            ) : null
          }
          <MPSwitch label={"E-mail"} />
          <MPSwitch label={"Celular / tablet"} />
          <MPSwitch label={"SMS"} />
          <View style={styles.separator} />
          {
            this.props.fontLoaded ? (
              <View style={styles.boxText}>
                <Text style={styles.title}>Ajuda</Text>
                <Text style={styles.paragraph}>Quando entrar em contato com a gente, como prefere receber nossas respostas e avisos importantes?</Text>
              </View>
            ) : null
          }
          <MPSwitch label={"E-mail"} />
          <MPSwitch label={"Celular / tablet"} />
          <MPSwitch label={"SMS"} />
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
  header: {
    flex: 1
  },
  scroll: {
    flex: 2
  },
  boxText: {
    marginHorizontal: 40
  },
  title: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'montSerratMedium',
    marginBottom: 5
  },
  paragraph: {
    fontSize: 16,
    color: '#686868',
    fontFamily: 'montSerrat'
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    marginHorizontal: 40,
    marginVertical: 30
  }
});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const NotificationConfigurationScreen = connect(mapStateToProps)(NotificationConfigurationScreenComponent);
export { NotificationConfigurationScreen };