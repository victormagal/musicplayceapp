import {createAction} from 'redux-actions';
import {PlansService} from '../../service'

export const PLANS_START_LOADING = 'PLANS_START_LOADING';
export const FETCHED_PLANS_SUCCESS = 'FETCHED_PLANS_SUCCESS';
export const PLANS_FINISHED_LOADING = 'PLANS_FINISHED_LOADING';
export const UPDATE_LOCAL_CARD = 'UPDATE_LOCAL_CARD';
export const CARD_ADD_SUCCESS = 'CARD_ADD_SUCCESS';
export const CARD_REMOVE_SUCCESS = 'CARD_REMOVE_SUCCESS';

export const plansStartLoading = createAction(PLANS_START_LOADING);
export const plansFinishedLoading = createAction(PLANS_FINISHED_LOADING);
export const fetchedPlansSucess = createAction(FETCHED_PLANS_SUCCESS, (data) => data);
export const updateLocalCard = createAction(UPDATE_LOCAL_CARD, data => data);
export const cardAddSuccess = createAction(CARD_ADD_SUCCESS);
export const cardRemoveSuccess = createAction(CARD_REMOVE_SUCCESS);


export const getPlans = () => {
  return (dispatch) => {
    dispatch(plansStartLoading());

    return PlansService.getPlans()
        .then(response => dispatch(fetchedPlansSucess(response)))
        .catch(e => {
          dispatch(plansFinishedLoading());
        }
    );
  };
};

export const addCard = (card) => {
  return async (dispatch) => {
    dispatch(plansStartLoading());

    try{
      const response = await PlansService.addCard(card);
      //TODO: call list again?
      dispatch(cardAddSuccess(response));
    }catch(e){
      dispatch(plansFinishedLoading(e));
    }
  };
};

export const removeCard = (card) => {
  return async (dispatch) => {
    dispatch(plansStartLoading());

    try{
      const response = await PlansService.removeCard(card);
      //TODO: call list again?
      dispatch(cardRemoveSuccess(response));
    }catch(e){
      dispatch(plansFinishedLoading(e));
    }
  };
};



