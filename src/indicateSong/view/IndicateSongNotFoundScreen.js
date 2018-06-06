import React from 'react';
import {StyleSheet, ScrollView, Text, View, TextInput, FlatList} from 'react-native';
import { Icon } from 'react-native-elements'
import { TextField } from 'react-native-material-textfield';
import { MPHeader, MPTextField, MPFooter, MPArtist, MPGradientButton } from '../../components'
import { connect } from 'react-redux';

class IndicateSongNotFoundScreenContainer extends React.Component {
  constructor(props){
    super(props);

    this.artistList = {
        data: [
            {
                id: '00',
                title: 'Bruno Caliman',
                backgroundColor: '#6f0'
            },
            {
                id: '01',
                title: 'Paula Fernandes',
                backgroundColor: '#f60'
            },
            {
                id: '02',
                title: 'Almir Sater',
                backgroundColor: '#06f'
            },

            {
                id: '03',
                title: 'Sergio Reis',
                backgroundColor: '#c30'
            },

            {
                id: '04',
                title: 'Munhoz & Mariano',
                backgroundColor: '#03c'
            },

            {
                id: '05',
                title: 'Samuel Rosa',
                backgroundColor: '#0c3'
            },
            {
              id: '06',
              title: 'David Burn',
              backgroundColor: '#6f0'
            },
            {
                id: '07',
                title: 'Bjork',
                backgroundColor: '#f60'
            },
            {
                id: '08',
                title: 'Daft Punk',
                backgroundColor: '#06f'
            },

          {
              id: '02',
              title: 'Sergio Reis',
              backgroundColor: '#c30'
          },
        ]
    }
}
  handleBackClick = () => {
    this.props.navigation.pop();
  };

  goToScreen = (route) => {
    this.props.navigation.navigate(route);
  }

  renderItem = ({item}) => (
    <MPArtist artist={item.title} backgroundColor={item.backgroundColor} onPress={() => {}} style={{marginBottom: 10,}} />
  )
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={""} />
        <ScrollView>
        {
          this.props.fontLoaded ? (
            <View>
              <MPTextField label={'Encontre um artista'} value={'Madonna'} style={{marginHorizontal: 20}}/>
              <Text style={ styles.textFieldSubText}><Text style={ styles.textFieldSubTextEmph}>"Madonna"</Text> ainda não está no MusicPlayce.</Text>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>Quando <Text style={styles.infoTextEmph}>Madonna</Text> fizer o cadastro, vamos mostrar sua indicação!</Text>
                <MPGradientButton title={'Indicar'} textSize={16} style={{marginHorizontal: 113, marginTop: 10}} />
              </View>
              <View>
                  <Text style={ styles.listTitle}>Artistas e bandas em alta</Text>
                  <FlatList data = {this.artistList.data}
                      keyExtractor={(item,index) => item.id} 
                      renderItem={this.renderItem}
                      numColumns={3}
                      columnWrapperStyle={{marginTop: 10, marginHorizontal : 20, flexWrap: 'wrap', }}/>
              </View>
            </View>
          ) : null
        }
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
  textFieldSubText: {
    fontSize: 12,
    color: '#686868',
    fontFamily: 'montSerratItalic',
    marginHorizontal: 20,
  },
  textFieldSubTextEmph: {
    fontFamily: 'montSerratBold',
    color: '#000'
  },
  infoTextContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  infoText: {
    fontSize: 20, 
    fontFamily: 'montSerrat',
    color: '#000',
    textAlign: 'center',
  },
  infoTextEmph: {
    fontFamily: 'montSerratBold'
  },
  listTitle: {
    fontSize: 16,
    fontFamily: 'montSerratMedium',
    color: '#000',
    marginHorizontal: 20,
    marginTop: 30
  }

});

const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const IndicateSongNotFoundScreen = connect(mapStateToProps)(IndicateSongNotFoundScreenContainer);
export {IndicateSongNotFoundScreen};