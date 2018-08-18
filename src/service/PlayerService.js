import moment from 'moment';
import {NativeModules, Platform} from 'react-native';
const { RNMusicPlayer } = NativeModules;
import MusicControl from 'react-native-music-control';

MusicControl.enableControl('play', true);
MusicControl.enableControl('pause', true);
MusicControl.enableControl('stop', false);

class PlayerService{

  static play(song){
    const duration = parseInt(moment.duration(song.duration).asSeconds())
 
    RNMusicPlayer.play({
      id: song.id || String(Math.random()),
      title: (song && song.name) ||  "Music 1",
      mediaURL: (song && song.path) || "https://d27stng4hz4vj7.cloudfront.net/music.mp3",
      duration: duration,
      artworkURL: (song && song.picture_url) || "https://d32h710hkauch.cloudfront.net/e0hZGyU0HCFFr9N0wmS0EaC21.png"
    });

    MusicControl.updatePlayback({
      state: MusicControl.STATE_PLAYING
    });

    MusicControl.setNowPlaying({
      title: (song && song.name) ||  "Music 1",
      artwork: (song && song.picture_url) || "https://d32h710hkauch.cloudfront.net/e0hZGyU0HCFFr9N0wmS0EaC21.png",
      artist: (song && song.artist && song.artist.name) ||  "Artista 1",
      duration: duration,
      description: '',
      color: 0xFFFFFF,
    });
  }

  static pause(){
    RNMusicPlayer.pause();
    PlayerService.pauseNotification();
  }

  static resume(){
    RNMusicPlayer.resume();
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PLAYING
    });
  }

  static seekTo(duration){
    RNMusicPlayer.seek(duration);
  }

  static stop(){
    if(Platform.OS === 'ios'){
      RNMusicPlayer.pause();
    }else{
      RNMusicPlayer.stop();
    }
    PlayerService.stopNotification();
  }

  static stopNotification(){
    MusicControl.stopControl();
  }

  static pauseNotification(){
    if(Platform.OS === 'ios'){
      // when pausing set the elapsedTime so notification bar 
      // would represent corrent state
      RNMusicPlayer.getCurrentState((state) => {
        MusicControl.updatePlayback({
          state: MusicControl.STATE_PAUSED,
          elapsedTime: Math.floor(state['progress'])
        });
      });
    } else {
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
      });
    }
  }
}

export { PlayerService }
