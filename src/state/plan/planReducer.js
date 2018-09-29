import {
  PLANS_START_LOADING,
  PLANS_FINISHED_LOADING,
  FETCHED_PLANS_SUCCESS,
  UPDATE_LOCAL_CARD,
  CARD_ADD_SUCCESS,
  CARD_REMOVE_SUCCESS
} from './planAction';

const plansReducer = (state, action) => {
  state = state || {
      loading: false,
      plans: [],
      card: null,
      cards: [
        // {
        //   number: '1111 2222 3333 3535',
        //   dueDate: '17/12',
        //   cvv: '353',
        //   cpf: '111.111.111-01',
        //   isFavorite: true,
        // }
      ]
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
        plans: action.payload,
      };

    case UPDATE_LOCAL_CARD:
      state = {...state, card: action.payload};
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
