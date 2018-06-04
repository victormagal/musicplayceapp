import React from 'react';
import {StyleSheet, ScrollView, Text, View, TextInput, Image, FlatList} from 'react-native';
import { MPGradientButton, MPHeader, MPFooter } from '../../components';
import { connect } from 'react-redux';
import { MPArtist } from '../../components/';

class ConfirmationScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: "Pesquise pelo nome"};

    this.artistList = {
        data: [
            {
                id: '00',
                title: 'David Burn',
                backgroundColor: '#6f0'
            },
            {
                id: '01',
                title: 'Bjork',
                backgroundColor: '#f60'
            },
            {
                id: '02',
                title: 'Daft Punk',
                backgroundColor: '#06f'
            },
        ]
    }
  }

  renderItem = ({item}) => (
    <MPArtist artist={item.title} backgroundColor={item.backgroundColor} onPress={() => {}} />
  )
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={false} onBack={this.handleBackClick} title={""} />
        {
          this.props.fontLoaded ? (
            <ScrollView style={styles.scroll}>
              <Text style={styles.titleText}>Pronto! Tudo certo.</Text>
              <Text style={styles.subTitleText}>Que tal indicar sua música pra uma banda que você goste?</Text>
              <View style={{height: 152}}>
                  <FlatList data = {this.artistList.data}
                      keyExtractor={(item,index) => item.id} 
                      renderItem={this.renderItem}
                      numColumns={3}
                      columnWrapperStyle={{flexWrap: 'wrap', justifyContent: 'center'}}/>
              </View>
              <View style={ styles.confirmationButtonsContainer }>
                  <MPGradientButton textSize={16} title={"Convidar para o MusicPlayce"} onPress={() => {}} style={ styles.confirmationButtonTop } textSize={16} />
                  <MPGradientButton textSize={16} title={"Fechar"} onPress={() => {}} style={ styles.confirmationButtonBottom } textSize={16} />
              </View>
              </ScrollView>
          ) : null
        }
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

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const ConfirmationScreen = connect(mapStateToProps)(ConfirmationScreenContainer);
export {ConfirmationScreen};