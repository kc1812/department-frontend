import * as ActionTypes from './actionTypes';
import * as Actions from './index';
import { postRequestWithoutToken, postRequest } from '../../services/backendService';
import { openNotification } from '../../utils/notification';


export const auth = (email, password) => {
    return (dispatch) => {
        const user = {
            emailId: email,
            password: password
        }
        dispatch(authStart());
        return postRequestWithoutToken('/auth', user)
            .then(user => {

                if (user.statusCode === 200) {
                    // console.log(56556,user);
                    let expirationDate = new Date(new Date().getTime() + user.data.expiresIn * 1000);
                    localStorage.setItem('swt_token', user.data.token);
                    localStorage.setItem('swt_expirationDate', expirationDate);
                    localStorage.setItem('swt_userId', user.data.id);
                    localStorage.setItem('swt_departmentId', user.data.department);
                    dispatch(authSuccess(user.data.token, user.data.id, user.data.department));
                    dispatch(checkAuthTimeut(user.data.expiresIn));
                    dispatch(Actions.fetchUsers());
                } else {
                    return Promise.reject({
                        statusCode: user.statusCode,
                        message: user.message,
                        error: user.error
                    });
                }

            })
            .catch(error => {
                // console.log(232323232,error);
                openNotification('error', 'Login Failed', error.message, 5);
                dispatch(authFail(error))
            });
    }
}

export const authStart = () => ({
    type: ActionTypes.AUTH_START
})

export const authSuccess = (token, userId, departmentId) => ({
    type: ActionTypes.AUTH_SUCCESS,
    payload: { token, userId, departmentId }
})

export const authFail = (error) => ({
    type: ActionTypes.AUTH_FAIL,
    payload: error
})

export const authLogout = () => {
    localStorage.removeItem('swt_token');
    localStorage.removeItem('swt_expirationDate');
    localStorage.removeItem('swt_userId');
    localStorage.removeItem('swt_departmentId');
    return {
        type: ActionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeut = (expiryTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(authLogout());
            dispatch(resetAuthState());
            dispatch(Actions.resetDepartmentState());
        }, expiryTime * 1000);
    }
}

export const checkAuthOnLoad = () => {
    return (dispatch) => {
        dispatch(authStart());
        const token = localStorage.getItem('swt_token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('swt_expirationDate'));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('swt_userId');
                const departmentId = localStorage.getItem('swt_departmentId');
                dispatch(authSuccess(token, userId, departmentId));
                dispatch(checkAuthTimeut((expirationDate.getTime() - new Date().getTime()) / 1000));
                setTimeout(() => dispatch(Actions.fetchUsers()), 0)
            } else {
                dispatch(authLogout());
            }
        }
    }
}

export const register = (department, firstName, lastName, emailId, password) => {
    return (dispatch) => {
        const registerData = {
            department, firstName, lastName, emailId, password
        }
        dispatch(registerStart());
        return postRequest('/user', registerData)
            .then(response => {

                if (response.statusCode === 200 || response.statusCode === 201) {
                    // console.log(56556,response);
                    dispatch(registerSuccess());
                    openNotification('success', 'Register Successful', '', 3)
                } else {
                    return Promise.reject({
                        statusCode: response.statusCode,
                        message: response.message,
                        error: response.error
                    });
                }

            })
            .catch(error => {
                // console.log(232323232,error);
                openNotification('error', 'Register Failed', error.message, 5)
                dispatch(registerFail(error))
            });
    }
}

export const registerStart = () => ({
    type: ActionTypes.REGISTER_START
})

export const registerSuccess = (token, userId, departmentId) => ({
    type: ActionTypes.REGISTER_SUCCESS
})

export const registerFail = (error) => ({
    type: ActionTypes.REGISTER_FAIL,
    payload: error
})

export const toggleLogin = () => ({
    type: ActionTypes.SWITCH_LOGIN
})

export const resetAuthState = () => ({
    type: ActionTypes.RESET_AUTH
})

export const logoutAndClear = () => {
    return (dispatch) => {
        dispatch(authLogout());
        dispatch(resetAuthState());
        dispatch(Actions.resetDepartmentState());
    }
}