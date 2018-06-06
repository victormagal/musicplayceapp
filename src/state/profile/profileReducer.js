import {FETCHED_PROFILE, PROFILE_START_LOADING, PROFILE_FINISH_LOADING, SAVE_PROFILE_SUCCESS} from './profileAction';

const profileReducer = (state, action) => {
  state = state || {
      saveProfileSuccess: null,
      loading: false,
      profile: {
        name: '',
        lastName: '',
        username: '',
        email: '',
        phone: ''
      }
    };

  state.saveProfileSuccess = null;

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

    case SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        saveProfileSuccess: true
      }
  }

  return state;
};

export default profileReducer;
