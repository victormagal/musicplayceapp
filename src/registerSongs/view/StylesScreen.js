import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList, ScrollView} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { MPGradientButton } from '../../components';

class StylesScreen extends React.Component {
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
        <MPGradientButton title={item.title} selected={item.selected} textSize={16} onPress={() => {}} />
    </View>
  );
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTop}>Melhore a encontrabilidade do seu trabalho. Do que ela fala? Quais estilos combinam com sua musica?</Text>
        <ScrollView>
            <FlatList data = {this.buttonList.data}
            keyExtractor={(item,index) => item.id} 
            renderItem={this.renderItem}
            numColumns={3}
            columnWrapperStyle={{flexWrap: 'wrap', justifyContent: 'center'}}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'column',
    alignItems: 'center'
  },
  textTop: {
    fontSize: 16,
    textAlign: 'center',
    color: '#686868',
    height: 60,
    marginBottom: 21,
    marginStart: 40,
    marginEnd: 40
  },
  buttonContainer: {
      marginEnd: 10,
      marginBottom: 10,
  }
});

export {StylesScreen};