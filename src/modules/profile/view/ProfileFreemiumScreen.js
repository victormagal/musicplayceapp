import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from './ProfileComponent';
import {fetchProfile} from '../../../state/action';
import images from '../../../assets/img';

class ProfileFreemiumScreenContainer extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            profile: {
                name: 'Bruno',
                lastName: 'Caliman',
                username: 'brunocaliman_oficial',
                visiting: false,
                languages: ['Espanhol', 'Inglês', 'Português'],
                agencies: '',
                location: 'Itamaraju/BA',
                description: 'Cantor, compositor e filósofo de ponto de ônibus. Compositor de Hits. Ganhou em 2015 o prêmio Som Livre de autor do ano. Os sonhos moram em casas com mais janelas do que paredes.',
                visiting: false,
                hasPhoto: true,
                isFollowing: false,
                indicationCount: 43,
                followerCount: 1.3,
                song: {
                    songName: 'Nome da Música',
                    isDraft: true,
                },
                sites: [
                    {
                        id: '00',
                        title: 'Spotify',
                    },
                    {
                        id: '01',
                        title: 'YouTube',
                    },
                ],
                mySongsFolder: '',
                savedSongsFolder: [
                    {
                        folderName: 'Inspirações ROCK',
                    },
                    {
                        folderName: 'Inspiração samba',
                    }
                ]
            }
        };
      }

    componentDidMount(){
        let {dispatch} = this.props;
        dispatch(fetchProfile());
    }

    render() {
        return (
            <ProfileComponent profile={this.state.profile} />
        );
    }
}

const mapStateToProps = ({profileReducer}) => {
    return {...profileReducer};
};

const ProfileFreemiumScreen = connect(mapStateToProps)(ProfileFreemiumScreenContainer);
export {ProfileFreemiumScreen};
