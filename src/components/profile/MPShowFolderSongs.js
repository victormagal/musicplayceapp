import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {MPSongRating, MPText, MPUpgradeButton} from '../../components'
import {MPGradientBorderButton} from './MPGradientBorderButton';


class MPShowFolderSongs extends Component {

  handleIndicateSong = (song) => {
    this.props.navigation.navigate('IndicateSongFullScreen', {song});
  };

  renderSongs = ({item}) => {
    let {me, hideSettings} = this.props;

    if(item.type && item.type === 'draft'){
      return (
        <MPUpgradeButton />
      );
    }

    return (
      <MPSongRating song={item}  indicateSong={true} isAdded={true}
                    hideSettings={hideSettings}
                    me={me} onExclude={this.props.onRemoveClick}
                    onUnpublish={this.props.onUnpublishClick}
                    onIndicateClick={this.handleIndicateSong.bind(this, item)}
                    onEditClick={this.props.onEditClick}
                    onPlayClick={this.props.onPlayClick}/>
    );
  };

  render() {
    let {folderName, edit, onEditFolder, songs, songDraft} = this.props;
    let folderSongs = [].concat(songs);

    if(songDraft){
     // folderSongs.push({type: 'draft', id: Math.random()});
    }

    return (
      <View style={ styles.parent }>
        <View style={ styles.topBarContainer }>
          <MPText style={ styles.topBarText}>{ folderName }</MPText>
          {edit && (
            <View style={ styles.topBarButton}>
              <MPGradientBorderButton onPress={onEditFolder}/>
            </View>
          )}
        </View>
        <View style={ styles.sliderContainer}>
          <FlatList
            data={folderSongs}
            keyExtractor={(item) => item.id}
            renderItem={this.renderSongs}
            horizontal={true}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#FCFCFC',
    paddingVertical: 30,
    paddingHorizontal: 20,
    height: 290,
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  topBarContainer: {
    flexDirection: 'row',
  },
  topBarText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#000',
    alignSelf: 'center',
  },
  topBarButton: {
    flex: 1,
    width: 64,
    alignSelf: 'flex-end'
  },
  sliderContainer: {
    paddingTop: 10,
    flex: 1,
  }
});

export {MPShowFolderSongs};
