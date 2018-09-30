import {
  PLANS_START_LOADING,
  PLANS_FINISHED_LOADING,
  FETCHED_PLANS_SUCCESS,
  UPDATE_LOCAL_CARD,
  CARD_ADD_SUCCESS,
  CARD_REMOVE_SUCCESS,
  UPDATE_LOCAL_PLAN
} from './planAction';

const plansReducer = (state, action) => {
  state = state || {
      loading: false,
      plans: [],
      plan: null,
      card: null,
      cards: []
    };

  switch (action.type) {
    case PLANS_START_LOADING:
      return {
        ...state,
        loading: true
      };

    case PLANS_FINISHED_LOADING:
      return {
        ...state,
        loading: false
      };

    case FETCHED_PLANS_SUCCESS:
      return {
        ...state,
        loading: false,
        plans: action.payload
      };

    case UPDATE_LOCAL_CARD:
      state = {...state, card: action.payload};
      break;

    case UPDATE_LOCAL_PLAN:
      state = {...state, plan: action.payload};
      break;

    case CARD_ADD_SUCCESS:
      let newState = {...state, loading: false};
      newState.cards = newState.cards.slice();
      newState.cards.push(action.payload);
      return {...newState};

    case CARD_REMOVE_SUCCESS:
      return {...state, loading: false};
  }

  return state;
};
export default plansReducer;
