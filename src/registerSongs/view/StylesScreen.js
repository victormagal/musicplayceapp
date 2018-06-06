import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList, ScrollView} from 'react-native';
import {MPGradientButton, MPHeader, MPFooter, MPText} from '../../components';
import {connect} from 'react-redux';

class StylesScreenContainer extends React.Component {
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
  };

  constructor(props){
    super(props);

    let source = this.buttonList.data;
    let max = 8;
    let result = [];
    let count = 0;

    do{

      if(count % 2 === 0){
        result.push(source.splice(0, max));
      }else{
        result.push(source.splice(0, 1));
      }

      count++;
    }while(source.length > 0);

    this.buttonList.data = result;
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };

  renderItem = (item, index) => {
    return (<MPGradientButton key={index} style={styles.button} textSize={16} title={item.title} selected={item.selected} onPress={() => {}}/>);
  };

  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Estilos e categorias"}/>
        <ScrollView style={styles.scroll}>
          <View>
            <MPText style={styles.textTop}>Melhore a encontrabilidade do seu trabalho. Do que ela fala? Quais estilos
              combinam com sua musica?</MPText>

            {this.buttonList.data.map((list, firstIndex) =>
              <View key={firstIndex} style={styles.buttonContainer}>
                {list.map((item, secondIndex) => this.renderItem(item, secondIndex))}
              </View>
            )}
         </View>
        </ScrollView>
        <MPFooter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    marginHorizontal: 40,
    fontFamily: 'montSerrat'
  },
  button: {
    marginEnd: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
});

const mapStateToProps = () => {
  return {};
};

const StylesScreen = connect(mapStateToProps)(StylesScreenContainer);
export {StylesScreen};
