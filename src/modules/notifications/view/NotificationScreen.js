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
      refresh: false,
    }
  }

  handleChangeTab = (index) => {
    this.setState({tabIndex: index});
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
    if(nextProps.userNotifications.data){
      let notificationList = nextProps.userNotifications.data.map((notification, index)=>{
        obj = {id: index, type: notification.attributes.type, data: JSON.parse(notification.attributes.data), time: notification.attributes.time};
        return obj;
      });
      console.log(notificationList);
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
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.setState({refresh: true});
                console.log('atualizando');
                setTimeout(() => {
                  this.setState({refresh: false});
                  console.log('atualizado');
                }, 3000);
              }}
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

const mapStateToProps = ({userReducer}) => {
  return {...userReducer};
};

const NotificationScreen = connect(mapStateToProps)(NotificationScreenContainer);
export { NotificationScreen };
