import React from 'react';
import {StyleSheet, ScrollView, Text, View, TextInput, Image, FlatList} from 'react-native';
import {  MPGradientButton, MPHeader, MPFooter, MPArtist, MPText } from '../../../components';
import { connect } from 'react-redux';
import images from '../../../assets/img';

class ConfirmationScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: "Pesquise pelo nome"};

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

  renderItem = ({item}) => (
    <MPArtist artist={item.title} imagePath={item.imagePath} onPress={() => {}} />
  );
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={false} onBack={this.handleBackClick} title={""} />
        <ScrollView style={styles.scroll}>
            <View>
              <MPText style={styles.titleText}>Pronto! Tudo certo.</MPText>
              <MPText style={styles.subTitleText}>Que tal indicar sua música pra uma banda que você goste?</MPText>
              <View style={{height: 152}}>
                  <FlatList data = {this.artistList.data}
                      keyExtractor={(item,index) => item.id} 
                      renderItem={this.renderItem}
                      numColumns={3}
                      columnWrapperStyle={{flexWrap: 'wrap', justifyContent: 'center'}}/>
              </View>
              <View style={ styles.confirmationButtonsContainer }>
                  <MPGradientButton textSize={16} title={"Convidar para o MusicPlayce"} onPress={() => {}} style={ styles.confirmationButtonTop } />
                  <MPGradientButton textSize={16} title={"Fechar"} onPress={() => {}} style={ styles.confirmationButtonBottom } />
              </View>
            </View>
        </ScrollView>
        <MPFooter />
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
    fontFamily: 'montSerratBold'
  },
  subTitleText: {
    fontSize: 16,
    textAlign: 'center',
    alignContent: 'center',
    color: '#000',
    marginBottom: 20,
    marginHorizontal: 40,
    fontFamily: 'montSerrat'
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
  return {  };
};

const ConfirmationScreen = connect(mapStateToProps)(ConfirmationScreenContainer);
export {ConfirmationScreen};
