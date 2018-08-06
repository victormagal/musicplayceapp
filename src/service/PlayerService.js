import {NativeModules} from 'react-native';
const { RNMusicPlayer } = NativeModules;


class PlayerService{

  static play(song){
    RNMusicPlayer.play({
      title: (song && song.name) ||  "Music 1",
      mediaURL: (song && song.path) || "https://d27stng4hz4vj7.cloudfront.net/music.mp3",
      duration: 111,
      artworkURL: "http://digitalspyuk.cdnds.net/16/05/768x768/gallery-1454685374-coldplay-mylo-xyloto-alternate-album-cover-1-by-rrpjdisc-d7oe37h.jpg"
    });
  }

  static pause(){
    RNMusicPlayer.pause();
  }

  static resume(){
    RNMusicPlayer.resume();
  }

  static seekTo(duration){
    RNMusicPlayer.seek(duration);
  }
}

export { PlayerService }
