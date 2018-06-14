import React from 'react';
import {connect} from 'react-redux';
import {ProfileComponent} from './ProfileComponent';
import {fetchProfile} from '../../../state/action';

class ReportProfileScreenContainer extends React.Component {

    componentDidMount(){
        let {dispatch} = this.props;
        dispatch(fetchProfile());
    }

    render() {
        return (
            <ProfileComponent profile={this.props.profile}/>
        );
    }
}

const mapStateToProps = ({profileReducer}) => {
    return {...profileReducer};
};

const ReportProfileScreen = connect(mapStateToProps)(ReportProfileScreenContainer);
export {ReportProfileScreen};
