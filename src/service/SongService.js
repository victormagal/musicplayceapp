import {Platform} from "react-native";
import axios from 'axios';
import {API, transformResponseData, getIncludes} from './api';
import {FolderService} from "./FolderService";

const API_SONG = `${API}/songs`;

class SongService {

  static transformSongRequest(song) {
    song = {...song};
    song.title = song.name;

    let relationships = {};

    if (song.coAuthors) {
      relationships['coAuthors'] = {
        data: song.coAuthors.map(a => {
          return {id: a.id, type: "coAuthors"};
        })
      };
    }

    if (song.tags) {
      relationships['tags'] = {
        data: song.tags.map(a => {
          return {id: a.id, type: "tags"};
        })
      };
    }

    if (song.folder) {
      relationships['folder'] = {
        data: song.folder
      };
    }

    delete song.coAuthors;
    delete song.folder;
    delete song.tags;

    return {song, relationships};
  }

  static create(songParam) {
    let {song, relationships} = SongService.transformSongRequest(songParam);

    let data = {
      data: {
        type: "songs",
        attributes: song,
        relationships
      }
    };

    return axios.post(API_SONG, data)
      .then(response => {
        let {data} = response.data;
        let {id, attributes} = data;
        return {id, ...attributes};
      });
  }

  static update(songParam) {
    let {song, relationships} = SongService.transformSongRequest(songParam);
    let data = {
      data: {
        type: "songs",
        song_id: song.id,
        attributes: song,
        relationships
      }
    };

    return axios.put(`${API_SONG}/${song.id}`, data)
      .then(response => response.data);
  }

  static delete(id) {
    return axios.delete(`${API_SONG}/${id}`).then(response => response.data);
  }

  static publish(id) {
    return axios.post(`${API_SONG}/${id}/publish`).then(response => response.data);
  }

  static unpublish(id) {
    return axios.post(`${API_SONG}/${id}/unpublish`).then(response => response.data);
  }

  static indicateSong(songId, userId) {
    let params = {
      artist_id: userId
    };
    return axios.post(`${API_SONG}/${songId}/indications`, params).then(response => response.data);
  }

  static commentSong(songId, comment) {
    let params = {
      data: {
        type: "comments",
        attributes: {
          text: comment
        }
      }
    };
    return axios.post(`${API_SONG}/${songId}/comments`, params).then(response => response.data)
  }

  static likeComment(commentId) {
    return axios.post(`${API_SONG}/${commentId}/like`).then(response => response.data);
  }

  static favoriteSong(songId, folderID) {
    let params = {
      data: {
        type: "folders",
        attributes: {
          id: folderID,
        }
      }
    };
    return axios.post(`${API_SONG}/${songId}/favorite`, params)
      .then(response => response.data);
  }

  static unfavoriteSong(songId) {
    return axios.post(`${API_SONG}/${songId}/unfavorite`).then(response => response.data);
  }

  static getSong(song) {
    return axios.get(`${API_SONG}/${song.id}?include=coAuthors,tags,comments`).then(({data}) => {

      let relations = getIncludes(data);
      let {id, attributes} = data.data;
      return {id, ...attributes, ...relations};
    });
  }

  static songsByUserWithoutFolders(user) {
    return axios.get(`${API}/song-artist/${user.id}`)
      .then(response => {
        let {data, meta} = response.data;
        data = transformResponseData(data);
        return {data, pagination: meta.pagination};
      });
  }

  static mySongs(id, page, me) {
    let folder = {id: -1, name: 'Outras', songs: {}};

    if (!page || page <= 1) {
      let defaultPromise = me ? SongService.mySongsWithoutFolder(page) : SongService.userSongsWithoutFolder(id);
      return defaultPromise.then(response => {
        return SongService._userSongsFolders(id, page).then(folders => {
          if (response.data.length > 0) {
            folder.songs = response;
            folders.data.unshift(folder);
          }
          return folders;
        });
      });
    }

    return SongService._userSongsFolders(id, page);
  }

  static mySongsFavorites(page){
    return FolderService.getFavoriteSongsFolders(page, 30).then(response => {
      let data = response.data.filter(f => f.song_count > 0);
      return Promise.all(SongService._mapFolders(data)).then(songs => {
        data = data.map((folder, index) => {
          folder.editable = true;
          folder.songs = songs[index];
          return folder;
        });

        return {...response, data};
      });
    });
  }

  static songsByFolder(folder, page) {
    let params = {
      'page[size]': 10
    };

    if (page) {
      params['page[number]'] = page;
    }

    return axios.get(`${API_SONG}/folder/${folder}`, {params}).then((response) => {
      let {data, meta} = response.data;
      data = transformResponseData(data);
      return {data, pagination: meta.pagination};
    });
  }

  static mySongsWithoutFolder(page) {
    let params = {
      'page[size]': 10
    };

    if (page) {
      params['page[number]'] = page;
    }

    return axios.get(`${API_SONG}/folder-less/me`, {params}).then((response) => {
      let {data, meta} = response.data;
      data = transformResponseData(data);
      return {data, pagination: meta.pagination};
    });
  }

  static userSongsWithoutFolder(id, page) {
    let params = {
      'page[size]': 10
    };

    if (page) {
      params['page[number]'] = page;
    }

    return axios.get(`${API_SONG}/folder-less/${id}`, {params}).then((response) => {
      let {data, meta} = response.data;
      data = transformResponseData(data);
      return {data, pagination: meta.pagination};
    });
  }

  static sendSongFile(file, song) {
    let formData = new FormData();

    if (!file) {
      return Promise.resolve();
    }

    formData.append('audio', {
      uri: file.uri,
      name: file.fileName,
      type: Platform.OS === 'android' ? file.type : ''
    });

    return axios.post(`${ API_SONG }/${ song.id }/audio`, formData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      let {data} = response.data;
      let {id, attributes} = data;
      return {id, ...attributes};
    });
  }

  static createSong(song, publish) {
    let {songFile, imageFile} = song;
    delete song.songFile;
    delete song.imageFile;

    return SongService.create(song).then(response => {
      return SongService.uploadImage(response.id, imageFile).then(() => {
        return SongService.sendSongFile(songFile, response).then(() => {
          if (publish) {
            return SongService.publish(response.id).then(_ => response);
          }
          return response;
        });
      });
    });
  }

  static updateSong(song) {
    let {songFile, imageFile} = song;
    delete song.songFile;
    delete song.imageFile;

    return SongService.uploadImage(song.id, imageFile).then((response) => {
      response = response || song;
      return SongService.sendSongFile(songFile, response).then((fileResponse) => {
        if (fileResponse) {
          song.path = fileResponse.path;
        }
        return SongService.update(response).then(() => {
          return SongService.publish(song.id);
        });
      });
    });
  }

  static rateSong(song, rating) {
    let params = {
      data: {
        type: 'ratings',
        attributes: {
          rating: rating + 1
        }
      }
    };

    return axios.post(`${API_SONG}/${song.id}/rating`, params).then(response => {
      console.log(response);
      // return response;
    });
  }

  static uploadImage(songId, file) {
    let formData = new FormData();

    if (!file) {
      return Promise.resolve();
    }

    formData.append('picture', {
      uri: file.uri,
      name: file.fileName,
      type: file.type || `image/${ file.fileName.split('.')[1] }`
    });

    return axios.post(`${ API_SONG }/${ songId }/picture`, formData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      const {data} = response.data;
      const {id, attributes} = data;
      return {id, ...attributes};
    });
  }

  static _mapFolders(data) {
    return data.map(folder => SongService.songsByFolder(folder.id));
  }

  static _userSongsFolders(id, page) {
    return FolderService.getUserSongsFolders(id, page, 30).then(response => {
      let data = response.data.filter(f => f.song_count > 0);

      return Promise.all(SongService._mapFolders(data)).then(songs => {
        data = data.map((folder, index) => {
          folder.editable = true;
          folder.songs = songs[index];
          return folder;
        });

        return {...response, data};
      });
    });
  }
}

export {SongService};
