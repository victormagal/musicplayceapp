import {NativeModules} from 'react-native';
const { RNMusicPlayer } = NativeModules;
import MusicControl from 'react-native-music-control';

MusicControl.enableControl('play', true);
MusicControl.enableControl('pause', true);
MusicControl.enableControl('stop', false);

class PlayerService{

  static play(song){
    console.log(song);
    RNMusicPlayer.play({
      id: song.id || String(Math.random()),
      title: (song && song.name) ||  "Music 1",
      mediaURL: (song && song.path) || "https://d27stng4hz4vj7.cloudfront.net/music.mp3",
      duration: 111,
      artworkURL: "http://digitalspyuk.cdnds.net/16/05/768x768/gallery-1454685374-coldplay-mylo-xyloto-alternate-album-cover-1-by-rrpjdisc-d7oe37h.jpg"
    });

    MusicControl.updatePlayback({
      state: MusicControl.STATE_PLAYING
    });

    MusicControl.setNowPlaying({
      title: (song && song.name) ||  "Music 1",
      artwork: "http://digitalspyuk.cdnds.net/16/05/768x768/gallery-1454685374-coldplay-mylo-xyloto-alternate-album-cover-1-by-rrpjdisc-d7oe37h.jpg",
      artist: 'Michael Jackson',
      album: 'Thriller',
      genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
      duration: 294,
      description: '',
      color: 0xFFFFFF,
    });
  }

  static pause(){
    RNMusicPlayer.pause();
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PAUSED
    });
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
    RNMusicPlayer.stop();
    MusicControl.stopControl();
  }
}

export { PlayerService }
