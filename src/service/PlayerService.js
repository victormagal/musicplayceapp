import moment from 'moment';
import {NativeModules} from 'react-native';
const { RNMusicPlayer } = NativeModules;
import MusicControl from 'react-native-music-control';

MusicControl.enableControl('play', true);
MusicControl.enableControl('pause', true);
MusicControl.enableControl('stop', false);

class PlayerService{

  static play(song){
    const duration = moment(song.duration || '0:00', 'm:ss').diff(moment().startOf('day'), 'seconds');

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
    if(RNMusicPlayer.stop){
      RNMusicPlayer.stop();
    }else{
      RNMusicPlayer.pause();
    }
    PlayerService.stopNotification();
  }

  static stopNotification(){
    MusicControl.stopControl();
  }

  static pauseNotification(){
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PAUSED
    });
  }
}

export { PlayerService }
