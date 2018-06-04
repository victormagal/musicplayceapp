import {createAction} from 'redux-actions';


export const FETCHED_PROFILE = 'FETCHED_PROFILE';
export const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS';
export const PROFILE_START_LOADING = 'PROFILE_START_LOADING';
export const PROFILE_FINISH_LOADING = 'PROFILE_FINISH_LOADING';

export const profileStartLoading = createAction(PROFILE_START_LOADING, () => null);
export const profileFinishLoading = createAction(PROFILE_FINISH_LOADING, () => null);

export const fetchedProfile = createAction(FETCHED_PROFILE, (data) => {
  return {...data};
});

export const saveProfileSucessfully = createAction(SAVE_PROFILE_SUCCESS,  (data) => {
  return {...data};
});

export const fetchProfile = () => {
    return (dispatch, getState) => {
        dispatch(profileStartLoading());
        if(shouldFetchProfile(getState())) {
            return Promise.resolve().then(() => {
                dispatch(fetchedProfile({
                    name: 'Jhonatas Martins',
                    lastName: 'Santos',
                    username: 'jhonatasmartins',
                    email: 'jhonatasmartins@hotmail.com',
                    phone: '61999999999'
                }));
                dispatch(profileFinishLoading());
            });
        }

        return Promise.resolve();
    };
};

export const saveProfile = (profile) => {
  return (dispatch, getState) => {
    dispatch(profileStartLoading());
    return Promise.resolve().then(() => {
        setTimeout(() => {
          dispatch(saveProfileSucessfully());
          dispatch(profileFinishLoading());
        }, 3000);
    });
  };
};

const shouldFetchProfile = (state) => {
  return !state.profileReducer.profile.name;
};
