import React from 'react';
import {StyleSheet, View, ScrollView } from 'react-native';
import { MPUserHorizontal, MPInvitation, MPHeader, MPFooter, MPTextField, MPText } from '../../../components';
import { connect } from 'react-redux';

class AddUserByEmailScreenContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
        text: "Roberto Carlos",
        emailText: "robertocarlos@gmail.com",
        item: {
            selected: true,
            backgroundColor: '#f05',
            title: 'Almir Sater'
        }
    };
  }

  handleBackClick = () => {
    this.props.navigation.pop();
  };
  
  render() {
    return (
      <View style={styles.container}>
        <MPHeader
          back={true}
          onBack={this.handleBackClick}
          title={"Co-autores"}
        />
        <ScrollView style={styles.scroll}>
          <MPUserHorizontal
            artist={"Almir Sater"}
            selected={true}
            onPress={() => console.log()}
          />
          <MPInvitation
            artistName={"Roberto Carlos"}
            artistEmail={"robertocarlos@gmail.com"}
            selected={true}
            onPress={() => console.log()}
          />
            <View>
              <MPText style={styles.textTop}>
                Essa música tem outros autores?
              </MPText>
              <MPTextField label={'Pesquise pelo nome:'} value={'Roberto Carlos'} />
              <View style={{marginHorizontal: 40}}>
                  <MPText style={ styles.textInputSubTextHeader}>
                    Não encontrou o co-autor?
                  </MPText>
                  <MPText style={ styles.textInputSubTextSuggestion}>
                    Convide-o para se juntar ao MusicPlayce.
                  </MPText>
              </View>
              <MPTextField label={'E-mail'} value={'robertocarlos@gmail.com'} />
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
    flex: 2,
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    height: 20,
    marginHorizontal: 40,
    fontFamily: 'Montserrat-Regular'
  },
  textInputSubTextHeader: {
    color: '#686868',
    fontSize: 12,
    fontFamily: 'Montserrat-BoldItalic'
  },
  textInputSubTextSuggestion: {
    fontWeight: 'normal',
    fontSize: 12,
    color: '#686868',
    fontFamily: 'Montserrat-Italic'
  },
});

const mapStateToProps = () => {
  return {  };
};

const AddUserByEmailScreen = connect(mapStateToProps)(AddUserByEmailScreenContainer);
export {AddUserByEmailScreen};
