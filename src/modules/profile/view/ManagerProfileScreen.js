import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from './ProfileComponent';
import {fetchProfile} from '../../../state/action';
import images from '../../../assets/img';

class ManagerProfileScreenContainer extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            profile: {
                name: 'Peter',
                lastName: 'Jenner',
                username: 'peterjenner',
                visiting: true,
                languages: '',
                agencies: ['SOM LIVRE'],
                location: 'São Paulo/SP',
                description: 'Cras qui nulla commodo, aliquam lectus sed, blandit augue. cras ullamcomper bibendum bibendum.',
                hasPhoto: true,
                isFollowing: true,
                indicationCount: 43,
                followerCount: 1.3,
                song: '',
                isManager: true,
                sites: '',
                vip: true,
                mySongsFolder: [
                    {
                        folderName: 'Músicas ROCK',
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

const ManagerProfileScreen = connect(mapStateToProps)(ManagerProfileScreenContainer);
export {ManagerProfileScreen};
