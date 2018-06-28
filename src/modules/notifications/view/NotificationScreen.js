import React from 'react';
import {
  FlatList,
  StyleSheet, 
  View
} from 'react-native';
import {
  MPFooter, 
  MPHeader,
  MPNotificationList, 
  MPMessageList,
  MPTabBar
} from '../../../components';
import { connect } from 'react-redux';


class NotificationScreenContainer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    }

  }

  listNotifications = {
    data: [
      {
        id: '00',
        avatar: true,
        title: 'Ivete Sangalo te indicou para Chitãozinho e Xororó',
        time: '1m'
      },
      {
        id: '01',
        title: '90 pessoas te indicaram para Chitãozinho e Xororó',
        time: '15m'
      },
      {
        id: '02',
        avatar: true,
        title: 'Fulano de tal começou a te seguir',
        time: '59m'
      },
      {
        id: '03',
        title: '678 pessoas indicaram Camaro Amarelo de Fulano Compositor',
        time: '2h'
      },
      {
        id: '04',
        avatar: true,
        title: 'Madonna entrou para o MusicPlayce',
        time: '1d'
      },
      {
        id: '05',
        title: 'Fulano de Tal começou a te seguir',
        time: '31/12/2017'
      },
      {
        id: '06',
        avatar: true,
        title: 'Fulano de Tal começou a te seguir',
        time: '31/12/2017'
      },
      {
        id: '07',
        title: 'Fulano de Tal começou a te seguir',
        time: '31/12/2017'
      },
      {
        id: '08',
        avatar: true,
        title: 'Fulano de Tal começou a te seguir',
        time: '31/12/2017'
      },
      {
        id: '09',
        title: 'Fulano de Tal começou a te seguir',
        time: '31/12/2017'
      },
      {
        id: '10',
        avatar: true,
        title: 'Fulano de Tal começou a te seguir',
        time: '31/12/2017'
      },
      {
        id: '11',
        title: 'Fulano de Tal começou a te seguir',
        time: '31/12/2017'
      },
      {
        id: '12',
        avatar: true,
        title: 'Fulano de Tal começou a te seguir',
        time: '31/12/2017'
      }
    ]
  };

  listMessages = {
    data: [
      {
        id: '00',
        avatar: true,
        rota: 'chatScreen',
        title: 'Ivete Sangalo te indicou para Chitãozinho e Xororó',
        name: 'Fernanda Almeida',
        time: '1m'
      },
      {
        id: '01',
        rota: 'chatScreen',
        title: '90 pessoas te indicaram para Chitãozinho e Xororó',
        name: 'Marcelo Marra',
        time: '15m'
      },
      {
        id: '02',
        avatar: true,
        rota: 'chatScreen',
        title: 'Fulano de tal começou a te seguir',
        name: 'Victor Arruda',
        time: '59m'
      },
      {
        id: '03',
        rota: 'chatScreen',
        title: '678 pessoas indicaram Camaro Amarelo de Fulano Compositor',
        name: 'Ítalo Queiroz',
        time: '2h'
      },
      {
        id: '04',
        avatar: true,
        rota: 'chatScreen',
        title: 'Madonna entrou para o MusicPlayce',
        name: 'Taíta',
        time: '1d'
      },
      {
        id: '05',
        rota: 'chatScreen',
        title: 'Fulano de Tal começou a te seguir',
        name: 'Paulo Vitor',
        time: '31/12/2017'
      },
      {
        id: '06',
        avatar: true,
        rota: 'chatScreen',
        title: 'Fulano de Tal começou a te seguir',
        name: 'Jhonatas Martins',
        time: '31/12/2017'
      },
      {
        id: '07',
        rota: 'chatScreen',
        title: 'Fulano de Tal começou a te seguir',
        name: 'Helton Jose',
        time: '31/12/2017'
      }
    ]
  };

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={""}/>
        <MPTabBar firstTabTitle={'ALERTAS'} secondTabTitle={"MENSAGENS"}>
          <View style={styles.firstSliderContainer}>
            <FlatList
              data={this.listNotifications.data}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return (
                  <MPNotificationList item={item} {...this.props} />
                )
              }}
            />
          </View>
          <View style={styles.secondSliderContainer}>
            <FlatList
              data={this.listMessages.data}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return (
                  <MPMessageList item={item} {...this.props} />
                )
              }}
            />
          </View>
        </MPTabBar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  firstSliderContainer: {
    flex:1,
    backgroundColor: '#FCFCFC',
  },
  secondSliderContainer: {
    flex:1,
    backgroundColor: '#FCFCFC' 
  },
});

const mapStateToProps = ({fontReducer}) => {
  return {...fontReducer};
};

const NotificationScreen = connect(mapStateToProps)(NotificationScreenContainer);
export { NotificationScreen };
