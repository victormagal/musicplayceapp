import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from './ProfileComponent';
import {fetchProfile} from '../../../state/action';
import images from '../../../assets/img';

class ArtistProfileScreenContainer extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            profile: {
                name: 'Ivete',
                lastName: 'Sangalo',
                username: 'ivetesangalo',
                visiting: true,
                isVerified: true,
                languages: '',
                agencies: ['SOM LIVRE'],
                location: 'Juazeiro/BA',
                description: 'Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vita.',
                isFollowing: false,
                indicationCount: 43,
                followerCount: 17.3,
                song: '',
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

const ArtistProfileScreen = connect(mapStateToProps)(ArtistProfileScreenContainer);
export {ArtistProfileScreen};
