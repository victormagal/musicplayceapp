import {FETCHED_PROFILE} from './profileAction';

const profileReducer = (state, action) => {
    state = state || {
        profile: {
            name: '',
            lastName: '',
            username: '',
            email: '',
            phone: ''
        }
    };

    switch (action.type){
        case FETCHED_PROFILE:
            return {
                ...state,
                profile: {...action.payload}
            };
    }

    return state;
};

export default profileReducer;
