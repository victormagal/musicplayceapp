import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from './ProfileComponent';
import {fetchProfile} from '../../../state/action';
import images from '../../../assets/img';

class ComposerProfileScreenContainer extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            profile: {
                name: 'Rick',
                lastName: 'Joe',
                username: 'rickjoe',
                visiting: true,
                isVerified: false,
                languages: ['Espanhol', 'Inglês', 'Português'],
                agencies: '',
                location: 'São Paulo/SP',
                description: 'Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vita.',
                isFollowing: false,
                indicationCount: 43,
                followerCount: 17.3,
                song: '',
                vip: true,
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
                mySongsFolder: [
                    {
                        folderName: 'Acústico em Trancoso',
                    },
                    {
                        folderName: 'Falando de amor',
                    }
                ],
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
        let newProps = {...this.props};
        newProps.profile = this.state.profile;
        return (
            <ProfileComponent {...newProps} />
        );
    }
}

const mapStateToProps = ({profileReducer}) => {
    return {...profileReducer};
};

const ComposerProfileScreen = connect(mapStateToProps)(ComposerProfileScreenContainer);
export {ComposerProfileScreen};
