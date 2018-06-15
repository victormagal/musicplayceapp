import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from './ProfileComponent';
import {fetchProfile} from '../../../state/action';

class ProfileScreenContainer extends React.Component {

    componentDidMount(){
        let {dispatch} = this.props;
        dispatch(fetchProfile());
    }

    render() {
        return (
            <ProfileComponent profile={this.props.profile} {...this.props} />
        )
    }
}

const mapStateToProps = ({profileReducer}) => {
    return {...profileReducer};
};

const ProfileScreen = connect(mapStateToProps)(ProfileScreenContainer);
export {ProfileScreen};
