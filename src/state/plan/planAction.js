import {createAction} from 'redux-actions';
import {PlansService} from '../../service'

export const PLANS_START_LOADING = 'PLANS_START_LOADING';
export const FETCHED_PLANS_SUCCESS = 'FETCHED_PLANS_SUCCESS';
export const PLANS_FINISHED_LOADING = 'PLANS_FINISHED_LOADING';

export const plansStartLoading = createAction(PLANS_START_LOADING);
export const plansFinishedLoading = createAction(PLANS_FINISHED_LOADING);
export const fetchedPlansSucess = createAction(FETCHED_PLANS_SUCCESS, (data) => data);

export const getPlans = () => {
  return (dispatch) => {
    dispatch(plansStartLoading());

    return PlansService.getPlans()
        .then(response => { dispatch(fetchedPlansSucess(response)) })
        .catch(e => {
            dispatch(playerFetchArtistsSongsError(e));
        }
    );
  };
};



