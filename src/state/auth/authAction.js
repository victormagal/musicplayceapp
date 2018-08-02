import {createAction} from 'redux-actions';
import {AuthService} from '../../service';


export const AUTH_START_LOADING = 'AUTH_START_LOADING';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
export const AUTH_RECOVER_PASSWORD_SUCCESS = 'AUTH_RECOVER_PASSWORD_SUCCESS';
export const AUTH_RECOVER_PASSWORD_ERROR = 'AUTH_RECOVER_PASSWORD_ERROR';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const authStartLoading = createAction(AUTH_START_LOADING, () => null);
export const authLogout = createAction(AUTH_LOGOUT, () => null);

export const loginSuccess = createAction(AUTH_LOGIN_SUCCESS, (data) => {
  return {...data};
});
export const loginError = createAction(AUTH_LOGIN_ERROR);

export const recoverPasswordSuccess = createAction(AUTH_RECOVER_PASSWORD_SUCCESS);
export const recoverPasswordError = createAction(AUTH_RECOVER_PASSWORD_ERROR);

export const login = (user) => {
  return (dispatch) => {
    dispatch(authStartLoading());
    return AuthService.login(user).then(response => {
      dispatch(loginSuccess(response));
      return response;
    }).catch(e => {
      console.log('loginError', e.response);
      dispatch(loginError());
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(authLogout());
    AuthService.logout();
  };
};

export const recoverPassword = (user) => {
  return (dispatch) => {
    dispatch(authStartLoading());
    return AuthService.recoverPassword(user).then(response => {
      dispatch(recoverPasswordSuccess(response));
      return response;
    }).catch(e => {
      console.log(e.response);
      dispatch(recoverPasswordError());
    });

  }
};
