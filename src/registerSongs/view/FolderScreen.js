import React from 'react';
import {StyleSheet, Text, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements'
import { MPGradientButton, MPFolder, MPHeader } from '../../components';
import { TextField } from 'react-native-material-textfield';
import { connect } from 'react-redux';

class FolderScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
        text: "Falando de amor",
        item: [
            {
                selected: true,
                title: 'Músicas pop',
                subTitle: '2 músicas'
            },
            {
                selected: false,
                title: 'Músicas de outrora',
                subTitle: '2 músicas'
            }
        ]
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader back={true} onBack={this.handleBackClick} title={"Escolha a pasta"} />
        <ScrollView style={ styles.scroll }>
          <MPFolder folderName={ this.state.item[0].title}
              musicAmount={ this.state.item[0].subTitle }
              selected={true}
              onPress={() => {}} />
          <MPFolder folderName={ this.state.item[1].title}
              musicAmount={ this.state.item[1].subTitle }
              onPress={() => {}} />
          { 
            this.props.fontLoaded ? (
              <View style={ styles.textFieldWithButtonContainer}>
                  <TextField label="Nome da nova pasta"
                  value="Falando de amor"
                  labelFontSize={16} 
                  lineWidth={0}
                  containerStyle={{flex: 1}}
                  labelTextStyle={{ fontFamily: 'montSerrat' }}
                  titleTextStyle={{ fontFamily: 'montSerrat' }}/>
                  <MPGradientButton title='Criar' onPress={() => {}} style={{alignSelf: 'flex-end', paddingBottom: 16}} />
              </View>
            ) : null
          }
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
    flex: 2,
    paddingStart: 40,
    paddingEnd: 40,
    paddingTop: 30
  },
  textFieldWithButtonContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: "#b1b1b1",
      padding: 0
  }
});
const mapStateToProps = ({ fontReducer }) => {
  return { ...fontReducer };
};

const FolderScreen = connect(mapStateToProps)(FolderScreenContainer);
export {FolderScreen};