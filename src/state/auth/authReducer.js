import {
  AUTH_START_LOADING, AUTH_LOGIN_ERROR, AUTH_LOGIN_SUCCESS, AUTH_RECOVER_PASSWORD_ERROR,
  AUTH_RECOVER_PASSWORD_SUCCESS, AUTH_SET_STORAGE_USER
} from './authAction';

const authReducer = (state, action) => {
  state = state || {
      loginError: false,
      loginSuccess: false,
      recoverPasswordError: false,
      recoverPasswordSuccess: false,
      loading: false,
      loggedUser: null
    };

  state.loginSuccess = false;

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

    case AUTH_SET_STORAGE_USER:
      return {
        ...state,
        loggedUser: action.payload
      };

    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginSuccess: true,
        loggedUser: action.payload
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
