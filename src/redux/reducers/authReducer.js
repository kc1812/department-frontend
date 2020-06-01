import * as ActionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/common';

const initialState = {
    token: null,
    loading: false,
    errorLogin: null,
    userId: null,
    departmentId: null,
    showRegisterForm: false,
    errorRegister: null
}

const authStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.payload.userId,
        departmentId: action.payload.departmentId,
        token: action.payload.token,
        loading: false,
        error: null,
        showRegisterForm: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.payload.message
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        departmentId: null,
        showRegisterForm: false,
        loading: false,
    });
}

const toggleLogin = (state, action) => {
    return updateObject(state, {
        showRegisterForm: !state.showRegisterForm,
        errorRegister: null,
        error: null
    });
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_START:
            return authStart(state, action)
        case ActionTypes.AUTH_FAIL:
            return authFail(state, action)
        case ActionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case ActionTypes.AUTH_LOGOUT:
            return authLogout(state, action)
        case ActionTypes.SWITCH_LOGIN:
            return toggleLogin(state, action)
        case ActionTypes.REGISTER_START:
            return regStart(state, action)
        case ActionTypes.REGISTER_FAIL:
            return regError(state, action)
        case ActionTypes.REGISTER_SUCCESS:
            return regSuccess(state, action)
        case ActionTypes.RESET_AUTH:
            return resetState(state, action)
        default:
            return state;
    }

}

const regStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        errorRegister: null
    });
}

const regSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        showRegisterForm: false,
        errorRegister: null
    });
}

const regError = (state, action) => {
    return updateObject(state, {
        loading: false,
        errorRegister: action.payload.message
    });
}

const resetState = (state, action) => {
    return updateObject(state, {
        token: null,
        loading: false,
        errorLogin: null,
        userId: null,
        departmentId: null,
        showRegisterForm: false,
        errorRegister: null
    });
}

export default authReducer;