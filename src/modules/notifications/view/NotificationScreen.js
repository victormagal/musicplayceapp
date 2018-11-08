import React from 'react';
import { connect } from 'react-redux';
import {
  FlatList, StyleSheet, View
} from 'react-native';
import Swiper from 'react-native-swiper';
import {
  MPHeader, MPNotificationList, MPMessageList, MPTabBar, MPLoading
} from '../../../components';
import { getNotifications } from '../../../state/action';


class NotificationScreenContainer extends React.Component {

  swiperRef = null;

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      refresh: false,
      notifications: []
    };
    this.swiperRef = React.createRef();
  }

  handleEndlessNotifications = () => {
    let {meta} = this.props.userNotifications
    let current_page = meta.pagination.current_page;
    if(this.state.notifications.length > 0 &&
        current_page < meta.pagination.total_pages){
      this.props.dispatch(getNotifications(current_page + 1));
    }
  }

  handleChangeTab = (index) => {
    this.swiperRef.current.scrollBy(index === 1 ? 1 : -1, true);
    this.setState({tabIndex: index});
  };

  handleChangeTabSwipe = (index) => {
    this.setState({tabIndex: index});
  };
  
  listMessages = {
    data: [
      {
        id: '00',
        avatar: true,
        rota: 'chatScreen',
        title: 'Ivete Sangalo te indicou para Chitãozinho e Xororó teste de tamanho de texto com utilizacao de ellipsize',
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
        title: '678 pessoas indicaram Camaro Amarelo de Fulano Compositor 1234567890 1234567890 1234567890',
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
    if(nextProps.userNotifications &&  nextProps.userNotifications.data.length !== this.state.notifications.length){
      let notificationList = nextProps.userNotifications.data.map((notification, index)=>{
        obj = {id: index, type: notification.attributes.type, data: JSON.parse(notification.attributes.data), time: notification.attributes.time};
        return obj;
      });
      this.setState({notifications: notificationList});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MPHeader />
        <MPTabBar titles={['ALERTAS']}
                  onTabChange={this.handleChangeTab}
                  index={this.state.tabIndex}/>
        {/* <MPTabBar titles={['ALERTAS', 'MENSAGENS']}
                  onTabChange={this.handleChangeTab}
                  index={this.state.tabIndex}/> */}
        <Swiper
          ref={this.swiperRef}
          showsPagination={false}
          loop={false}
          onIndexChanged={this.handleChangeTabSwipe}>
          <View style={styles.firstSliderContainer}>
            <FlatList
              data={this.state.notifications}
              keyExtractor={item => item.id}
              refreshing={this.props.refreshNotifications}
              onEndReachedThreshold={0.3}
              onEndReached={this.handleEndlessNotifications}
              onRefresh={() => {
                this.props.dispatch(getNotifications(0, true));
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
        <MPLoading visible={this.props.loading} />
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
