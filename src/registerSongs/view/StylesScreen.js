import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList, ScrollView} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { MPGradientButton, MPHeader, MPFooter } from '../../components';
import { connect } from 'react-redux';

class StylesScreenContainer extends React.Component {
  constructor(props){
    super(props);
  }

  buttonList = {
      data: [
          {
              id: '00',
              title: 'Rock',
              selected: false,
          },
          {
            id: '00',
            title: 'Samba',
            selected: false,
        },
        {
            id: '00',
            title: 'Sertanejo',
            selected: true,
        },
        {
            id: '00',
            title: 'Funk',
            selected: false,
        },
        {
            id: '00',
            title: 'Trance',
            selected: false,
        },
        {
            id: '00',
            title: 'Galope',
            selected: false,
        },
        {
            id: '00',
            title: 'Coração Partido',
            selected: false,
        },
        {
            id: '00',
            title: 'Descobertas',
            selected: false,
        },
        {
            id: '00',
            title: 'Amor',
            selected: true,
        },
        {
            id: '00',
            title: 'Chifre',
            selected: false,
        },
        {
            id: '00',
            title: 'Paquera',
            selected: false,
        },
        {
            id: '00',
            title: 'Traição',
            selected: false,
        },
        {
            id: '00',
            title: 'Balada',
            selected: true,
        },
        {
            id: '00',
            title: 'Jesus',
            selected: false,
        },
        {
            id: '00',
            title: 'Natureza',
            selected: false,
        },
        {
            id: '00',
            title: 'Crescimento pessoal',
            selected: false,
        },
        {
            id: '00',
            title: 'Outros temas',
            selected: false,
        }
      ]
  }

  renderItem = ({item}) => (
    <View style={styles.buttonContainer}>
        <MPGradientButton textSize={16} title={item.title} selected={item.selected} textSize={16} onPress={() => {}} />
    </View>
  );
  
  render() {
    return (
    <View style={styles.container}>
      <MPHeader back={true} onBack={this.handleBackClick} title={"Estilos e categorias"} />    
      <ScrollView style={styles.scroll}>
      {
          this.props.fontLoaded ? (
            <View>
                <Text style={styles.textTop}>Melhore a encontrabilidade do seu trabalho. Do que ela fala? Quais estilos combinam com sua musica?</Text>
            </View>
          ) : null
      }
        <FlatList data = {this.buttonList.data}
        keyExtractor={(item,index) => item.id} 
        renderItem={this.renderItem}
        numColumns={3}
        columnWrapperStyle={{flexWrap: 'wrap', justifyContent: 'center'}}/>
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
    justifyContent: 'center'
  },
  scroll: {
      flex: 2
  },
  textTop: {
    fontSize: 16,
    textAlign: 'center',
    color: '#686868',
    height: 60,
    marginBottom: 21,
    marginStart: 40,
    marginTop: 30,
    marginEnd: 40,
    fontFamily: 'montSerrat'
  },
  buttonContainer: {
      marginEnd: 10,
      marginBottom: 10,
  }
});

const mapStateToProps = ({ fontReducer }) => {
    return { ...fontReducer };
  };
  
const StylesScreen = connect(mapStateToProps)(StylesScreenContainer);
export {StylesScreen};