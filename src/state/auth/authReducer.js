import {
  AUTH_START_LOADING, AUTH_LOGIN_ERROR, AUTH_LOGIN_SUCCESS, AUTH_RECOVER_PASSWORD_ERROR,
  AUTH_RECOVER_PASSWORD_SUCCESS
} from './authAction';

const authReducer = (state, action) => {
  state = state || {
      loginError: false,
      loginSuccess: false,
      recoverPasswordError: false,
      recoverPasswordSuccess: false,
      loading: false
  };

  switch (action.type) {
    case AUTH_START_LOADING:
      return {
        ...state,
        loading: true
      };

    case AUTH_LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        loginError: true
      };

    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginSuccess: true
      };

    case AUTH_RECOVER_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        recoverPasswordSuccess: true
      };

    case AUTH_RECOVER_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        recoverPasswordError: true
      };
  }

  return state;
};

export default authReducer;
