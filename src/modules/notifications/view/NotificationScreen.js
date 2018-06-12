import React from 'react';
import {
  FlatList,
  StyleSheet, 
  View
} from 'react-native';
import {
  MPFeedNotification, 
  MPFooter, 
  MPHeader,
  MPNotificationList, 
  MPTabBar, 
  MPText 
} from '../../../components';
import { connect } from 'react-redux';


class NotificationScreenContainer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    }

  }

  list = {
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

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  renderItem = ({item}) => (
    <MPFeedNotification notificationType={item.type} artistName={item.artistName} composerName={item.composerName} songName={item.songName} timeText={item.timeText}/>
  )

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={""}/>
        <MPTabBar firstTabTitle={'ALERTAS'} secondTabTitle={"MENSAGENS"}>
          <View style={styles.firstSliderContainer}>
            <FlatList
              data={this.list.data}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return (
                  <MPNotificationList item={item} {...this.props} />
                )
              }}
            />
          </View>
        </MPTabBar>
        <MPFooter />
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
