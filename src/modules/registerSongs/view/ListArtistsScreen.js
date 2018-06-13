import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList, ScrollView} from 'react-native';
import { MPArtistHorizontal, MPHeader, MPFooter, MPTextField, MPText } from '../../../components';
import { connect } from 'react-redux';
import images from '../../../assets/img';

class ListArtistsScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: "Almir Sater"};

    this.artistList = {
        data: [
            {
                id: '00',
                backgroundColor: '#a78759',
                title: 'Paula Fernandes',
                imagePath: images.paulaFernandes60
            },
            {
                id: '01',
                backgroundColor: '#ff6347',
                title: 'Almir Sater',
                imagePath: images.almirSater60,
                selected: true,
            },
            {
                id: '02',
                backgroundColor: '#ffff33',
                title: 'Sérgio Reis',
                imagePath: images.sergioReis60,
            },
            {
                id: '03',
                backgroundColor: '#90ee90',
                title: 'Munhoz & Mariano',
                imagePath: images.munhozMariano60,
            },
            {
                id: '04',
                backgroundColor: '#add8e6',
                title: 'Samuel Rosa',
                imagePath: images.samuelRosa60,
            },
            {
                id: '05',
                backgroundColor: '#a9a9a9',
                title: 'David Burn',
                imagePath: images.davidBurn60,
            },
            {
                id: '06',
                backgroundColor: '#ff69b4',
                title: 'Bjork',
                imagePath: images.bjork60,
            },
            {
                id: '07',
                backgroundColor: '#ffdf00',
                title: 'Daft Punk',
                imagePath: images.paulaFernandes60,
            },
            {
                id: '08',
                backgroundColor: '#228b22',
                title: 'Gabriel o Pensador',
                imagePath: images.samuelRosa60,
            },
            {
                id: '09',
                backgroundColor: '#d3d3d3',
                title: 'Stone Roses',
                imagePath: images.almirSater60,
            },
            {
                id: '10',
                backgroundColor: '#f00',
                title: 'Kraftwerk',
                imagePath: images.sergioReis60,
            },
        ]
    }
  }

  goToScreen = (route) => {
    this.props.navigation.navigate(route);
  };

  handleBackClick = () => {

    this.props.navigation.pop();
  };

  renderItem = ({item}) => (
    <MPArtistHorizontal 
        imagePath={item.imagePath}
        artist={item.title} 
        selected={item.selected}
        onPress={ this.goToScreen.bind(this,'AddArtistScreen') } />
  );
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Co-autores"} />
        <ScrollView style={styles.scroll}>
          <View style={{marginBottom: 30}}>
            <MPText style={styles.textTop}>Essa música tem outros autores?</MPText>
            <MPTextField label={'Pesquise pelo nome:'} value={'Almir Sater'}/>
          </View>
            <FlatList data = {this.artistList.data}
                    keyExtractor={(item,index) => item.id} 
                    renderItem={this.renderItem} />
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
      flex: 2,
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    marginHorizontal: 40,
    fontFamily: 'montSerrat',
  }
});

const mapStateToProps = () => {
    return {};
  };

const ListArtistsScreen = connect(mapStateToProps)(ListArtistsScreenContainer);
export {ListArtistsScreen};
