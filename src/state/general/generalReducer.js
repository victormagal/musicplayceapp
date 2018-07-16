import {LOAD_FONT, UPDATE_NETWORK} from './generalAction';

const generalReducer = (state, action) => {
  state = state || {
      fontLoaded: false,
      isConnected: false
    };

  switch (action.type) {

    case LOAD_FONT:
    case UPDATE_NETWORK:
      return {...state, ...action.payload};

  }

  return state;
};

export default generalReducer;
