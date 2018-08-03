import {
    PLANS_START_LOADING,
    PLANS_FINISHED_LOADING,
    FETCHED_PLANS_SUCCESS  
  } from './planAction';
  
  const plansReducer = (state, action) => {
    state = state || {
      loading: false,
      plans: [],
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
        }
    }
    return state;
  };
  export default plansReducer;
  