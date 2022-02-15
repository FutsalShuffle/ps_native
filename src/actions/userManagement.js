import { VERIFY_USER, LOGIN_USER, REGISTER_USER, LOGOUT_USER } from './types';
import AjaxProvider from '../providers/AjaxProvider';
import AjaxProviderLogged from '../providers/AjaxProviderLogged';

export const loginUser = (payload) => {
    return async dispatch => {
        let user = await AjaxProvider('/login?email=' + payload.email + '&password=' + payload.password);
        console.log('login: ', user);
        dispatch(dispatchLoginUser(user));
    }
}

export const registerUser = (payload) => {
    return async dispatch => {
        let user = await AjaxProvider('/register?email=' + payload.email + '&password=' + payload.password + '&firstname=' + payload.firstname + '&lastname=' + payload.lastname);
        dispatch(dispatchRegisterUser(user));
        console.log('register: ', user);
    }
}
export const verifyUser = () => {
    return async dispatch => {
        let user = await AjaxProviderLogged('/verify');
        dispatch(dispatchVerifyUser(user));
        console.log('verify: ', user);
    }
}

export const dispatchLoginUser = (payload) => ({
    type: LOGIN_USER,
    payload: payload
});

export const dispatchRegisterUser = (payload) => (
    {
        type: REGISTER_USER,
        payload: payload
    }
);
export const dispatchVerifyUser = (payload) => (
    {
        type: VERIFY_USER,
        payload: payload
    }
);
export const logoutUser = () => (
    {
        type: LOGOUT_USER,
    }
);