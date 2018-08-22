import React from 'react';
import {StyleSheet, ScrollView, View, FlatList} from 'react-native';
import {MPGradientButton, MPHeader, MPUser, MPText} from '../../../components';
import {fetchFeeds} from '../../../state/action';
import {connect} from 'react-redux';


class ConfirmationScreenContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchFeeds(''));
  }

  handleClose = () => {
    this.props.navigation.navigate('MyProfileScreen', { backFromPublishedOrDraft: true });
  };

  renderItem = ({item}) => {
    return <MPUser user={item}/>;
  };

  render() {
    const { feed } = this.props;
    return (
      <View style={styles.container}>
        <MPHeader back={false} inverse={true}/>
        <ScrollView style={styles.scroll}>
          <View style={{ marginHorizontal: 30 }}>
            <MPText style={styles.titleText}>
              Pronto! Tudo certo.
            </MPText>
            <MPText style={styles.subTitleText}>
              Que tal indicar sua música pra uma banda que você goste?
            </MPText>
            {
              feed && feed.artists.length > 0 && (
                <FlatList
                  data={feed.artists.slice(0,3)}
                  keyExtractor={(item) => item.id}
                  renderItem={this.renderItem}
                  numColumns={3}
                  columnWrapperStyle={{flexWrap: 'wrap', justifyContent: 'center'}}
                />
              )
            }
            <View style={ styles.confirmationButtonsContainer }>
              <MPGradientButton
                textSize={16}
                title={"Convidar para o MusicPlayce"}
                onPress={() => console.log()}
                style={ styles.confirmationButtonTop }
              />
              <MPGradientButton
                textSize={16}
                title={"Fechar"}
                onPress={this.handleClose}
                style={{ width: '45%' }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FCFCFC',
    justifyContent: 'flex-end'
  },
  scroll: {
    flex: 2
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#000',
    marginBottom: 10,
    marginTop: 70,
    fontFamily: 'Montserrat-Bold'
  },
  subTitleText: {
    fontSize: 16,
    textAlign: 'center',
    alignContent: 'center',
    color: '#000',
    marginBottom: 20,
    fontFamily: 'Montserrat-Regular'
  },
  confirmationButtonsContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'stretch',
    marginTop: 30
  },
  confirmationButtonTop: {
    width: '100%',
    marginBottom: 20
  }
});

const mapStateToProps = ({feedsReducer}) => {
  return {...feedsReducer};
};

const ConfirmationScreen = connect(mapStateToProps)(ConfirmationScreenContainer);
export {ConfirmationScreen};
