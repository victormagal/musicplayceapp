import React from 'react';
import { connect } from 'react-redux';
import {
  FlatList, StyleSheet, View
} from 'react-native';
import Swiper from 'react-native-swiper';
import {
  MPHeader, MPNotificationList, MPMessageList, MPTabBar
} from '../../../components';
import { getNotifications } from '../../../state/action';


class NotificationScreenContainer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    }
  }

  handleChangeTab = (index) => {
    this.setState({tabIndex: index});
  };

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

  componentDidMount(){
    this.props.dispatch(getNotifications());
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.notifications.data){
      console.log(nextProps.notifications.data);
      let notificationList = nextProps.notifications.data.map((notification, index)=>{
        obj = {id: index, type: notification.attributes.type, data: JSON.parse(notification.attributes.data), time: notification.attributes.time};
        return obj;
      })
      this.setState({notifications: notificationList});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MPHeader />
        <MPTabBar titles={['ALERTAS', 'MENSAGENS']}
                  onTabChange={this.handleChangeTab} index={this.state.tabIndex}/>
        <Swiper
          showsPagination={false}
          loop={false}
          index={this.state.tabIndex}
          onIndexChanged={this.handleChangeTab}>
          <View style={styles.firstSliderContainer}>
            <FlatList
              data={this.state.notifications}
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
        </Swiper>
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

const mapStateToProps = ({artistReducer}) => {
  return {...artistReducer};
};

const NotificationScreen = connect(mapStateToProps)(NotificationScreenContainer);
export { NotificationScreen };
