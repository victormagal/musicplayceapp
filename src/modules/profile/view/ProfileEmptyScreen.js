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
                visiting: false,
                agencies: '',
                phone: '',
                location: '',
                description: '',
                hasPhoto: false,
                isFollowing: false,
                indicationCount: '',
                followerCount: '',
                mySongsFolder: '',
                savedSongsFolder: '',
                sites: '',
                song: '',
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
            <ProfileComponent {...newProps}/>
        );
    }
}

const mapStateToProps = ({profileReducer}) => {
    return {...profileReducer};
};

const ProfileEmptyScreen = connect(mapStateToProps)(ProfileEmptyScreenContainer);
export {ProfileEmptyScreen};
