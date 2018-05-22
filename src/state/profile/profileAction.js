import {createAction} from 'redux-actions';


export const FETCH_PROFILE = 'FETCH_PROFILE';
export const fetchProfile = () => {
    return (dispatch) => {
        return Promise.resolve().then(() => {
           dispatch(fetchedProfile({
               name: 'Jhonatas Martins',
               username: 'jhonatasmartins'
           }));
        });
    };
};

export const FETCHED_PROFILE = 'FETCHED_PROFILE';
export const fetchedProfile = createAction(FETCHED_PROFILE, (data) => {
    return {...data};
});