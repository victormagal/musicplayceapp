import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from './ProfileComponent';
import {fetchProfile} from '../../../state/action';
import images from '../../../assets/img';

class ProfileEmptyScreenContainer extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            profile: {
                name: 'Bruno',
                lastName: 'Caliman',
                username: 'brunocaliman_oficial',
                email: '',
                sites: '',
                languages: '',
                // languages: ['Espanhol', 'Inglês', 'Português'],
                // agencies: ['SOM LIVRE'],
                agencies: '',
                phone: '',
                location: '',
                description: '',
                visiting: false,
                hasPhoto: true,
                isFollowing: false,
                // isVerified: true,
                sites: '',
                // isArtist: true,
                // vip: true,
                // sites: [
                //     {
                //         id: '00',
                //         title: 'Spotify',
                //     },
                //     {
                //         id: '01',
                //         title: 'YouTube',
                //     },
                //     {
                //         id: '02',
                //         title: 'Deezer',
                //     },
                // ]
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

const ProfileEmptyScreen = connect(mapStateToProps)(ProfileEmptyScreenContainer);
export {ProfileEmptyScreen};
