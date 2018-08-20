import React from 'react';
import {
  View, StyleSheet, ScrollView
} from 'react-native';
import {
  MPHeader, MPIconButton, MPLoading, MPInput, MPText
} from '../../../../components';


class PlayerCommentSongComponent extends React.Component {
  renderHeaderMenu() {
    return [
      <MPIconButton key={1} title="Enviar" titleStyle={styles.headerMenuText} onPress={this.props.onSave}/>
    ];
  }

  render() {
    return (
      <View style={styles.container}>
        <MPHeader title="Deixe seu comentário" back={true} onBack={this.props.onBack} icons={this.renderHeaderMenu()}/>
        <ScrollView style={{flex: 2, marginHorizontal: 20,}}>
            <MPText style={styles.textTop}>Deixe aqui seu comentário:</MPText>
            <MPInput label="Comentário" value={this.props.commentText} multiline={true} onChangeText={this.props.onChangeText} />
        </ScrollView>
        <MPLoading visible={this.props.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc'
  },
  textTop: {
    fontSize: 16,
    color: '#686868',
    height: 20,
    marginTop: 20,
    fontFamily: 'Montserrat-Regular'
  },
});


export {PlayerCommentSongComponent};
