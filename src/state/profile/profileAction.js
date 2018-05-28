import {createAction} from 'redux-actions';


export const FETCH_PROFILE = 'FETCH_PROFILE';
export const fetchProfile = () => {
    return (dispatch, getState) => {
        if(shouldFetchProfile(getState())) {
            return Promise.resolve().then(() => {
                dispatch(fetchedProfile({
                    name: 'Jhonatas Martins',
                    lastName: 'Santos',
                    username: 'jhonatasmartins',
                    email: 'jhonatasmartins@hotmail.com',
                    phone: '61999999999'
                }));
            });
        }

        return Promise.resolve();
    };
};

export const FETCHED_PROFILE = 'FETCHED_PROFILE';
export const fetchedProfile = createAction(FETCHED_PROFILE, (data) => {
    return {...data};
});

const shouldFetchProfile = (state) => {
  return !state.profileReducer.profile.name;
};