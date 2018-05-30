import {FETCHED_PROFILE, PROFILE_START_LOADING, PROFILE_FINISH_LOADING} from './profileAction';

const profileReducer = (state, action) => {
  state = state || {
      loading: false,
      profile: {
        name: '',
        lastName: '',
        username: '',
        email: '',
        phone: ''
      }
    };

  switch (action.type) {
    case FETCHED_PROFILE:
      return {
        ...state,
        profile: {...action.payload}
      };
    case PROFILE_START_LOADING:
      return {
        ...state,
        loading: true
      };
    case PROFILE_FINISH_LOADING:
      return {
        ...state,
        loading: false
      };
  }

  return state;
};

export default profileReducer;
