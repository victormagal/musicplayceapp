import React from 'react';
import {StyleSheet, ScrollView, View, FlatList} from 'react-native';
import {MPGradientButton, MPHeader, MPUser, MPText} from '../../../components';
import {connect} from 'react-redux';
import images from '../../../assets/img';

class ConfirmationScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Pesquise pelo nome"
    };

    this.artistList = {
      data: [
        {
          id: '00',
          title: 'David Burn',
          imagePath: images.daftPunk100
        },
        {
          id: '01',
          title: 'Bjork',
          imagePath: images.bjork100
        },
        {
          id: '02',
          title: 'Daft Punk',
          imagePath: images.daftPunk100
        },
      ]
    }
  }

  handleClose = () => {
    this.props.navigation.navigate('ProfileScreen', { backFromPublishedOrDraft: true });
  };

  renderItem = ({item}) => (
    <MPUser
      artist={item.title}
      imagePath={item.imagePath}
      onPress={() => console.log()}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={false} inverse={true}/>
        <ScrollView style={styles.scroll}>
          <View>
            <MPText style={styles.titleText}>
              Pronto! Tudo certo.
            </MPText>
            <MPText style={styles.subTitleText}>
              Que tal indicar sua música pra uma banda que você goste?
            </MPText>
            <FlatList
              data={this.artistList.data}
              keyExtractor={(item) => item.id}
              renderItem={this.renderItem}
              numColumns={3}
              columnWrapperStyle={{flexWrap: 'wrap', justifyContent: 'center'}}
            />
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
                style={ styles.confirmationButtonBottom }
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
    marginHorizontal: 40,
    fontFamily: 'Montserrat-Regular'
  },
  confirmationButtonsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'stretch',
    marginTop: 30,
    marginStart: 40,
    marginEnd: 40
  },
  confirmationButtonTop: {
    marginBottom: 20
  },
  confirmationButtonBottom: {
    marginStart: 73,
    marginEnd: 73
  }
});

const mapStateToProps = () => {
  return {};
};

const ConfirmationScreen = connect(mapStateToProps)(ConfirmationScreenContainer);
export {ConfirmationScreen};
