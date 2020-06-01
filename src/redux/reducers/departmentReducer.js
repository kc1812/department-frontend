import * as ActionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/common';

const initialState = {
    departments: [],
    users: [],
    currentDepartmentForms: [],
    currentUsersAssignedForms: [],
    currentUsersRequestedForms: [],
    error: null,
    loading: false,
    updateError: null
}

const departmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.RESET_ERROR:
            return resetError(state, action);
        case ActionTypes.FETCH_DEPARTMENTS:
            return fetchDepartments(state, action);
        case ActionTypes.FETCH_ALL_USERS:
            return fetchUsers(state, action);
        case ActionTypes.FETCH_FORMS_USER_REQUESTED:
            return fetchUserRequestedFormSuccess(state, action);
        case ActionTypes.FETCH_FORMS_USER_ASSIGNED:
            return fetchUserAssignedFormSuccess(state, action);
        case ActionTypes.FETCH_FORMS_DEPARTMENT:
            return fetchDepartmentFormSuccess(state, action);
        case ActionTypes.FORM_REQUEST_START:
            return postFormStart(state, action);
        case ActionTypes.FORM_REQUEST_SUCCESS:
            return postFormSuccess(state, action);
        case ActionTypes.FORM_REQUEST_FAIL:
            return postFormFail(state, action);

        case ActionTypes.UPDATE_FORM_REQUEST_START:
            return updateFormStart(state, action);
        case ActionTypes.UPDATE_FORM_REQUEST_SUCCESS:
            return updateFormSuccess(state, action);
        case ActionTypes.UPDATE_FORM_REQUEST_FAIL:
            return updateFormFail(state, action);
        case ActionTypes.RESET_DEPARTMENT:
            return resetState(state, action);

        case ActionTypes.DEPARTMENT_LOADING_START:
            return depLoadingStart(state, action);
        case ActionTypes.DEPARTMENT_LOADING_STOP:
            return depLoadingStop(state, action);
        default:
            return state;
    }
}

const resetError = (state, action) => {
    return updateObject(state, {
        error: null,
    });
}

const fetchDepartments = (state, action) => {
    return updateObject(state, {
        departments: action.payload
    });
}

const fetchUsers = (state, action) => {
    return updateObject(state, {
        users: action.payload
    });
}

const fetchUserRequestedFormSuccess = (state, action) => {
    return updateObject(state, {
        currentUsersRequestedForms: action.payload
    });
}

const fetchUserAssignedFormSuccess = (state, action) => {
    return updateObject(state, {
        currentUsersAssignedForms: action.payload
    });
}

const fetchDepartmentFormSuccess = (state, action) => {
    // console.log('action', action);
    return updateObject(state, {
        currentDepartmentForms: action.payload
    });
}

const postFormStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    });
}

const postFormSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null
    });
}

const postFormFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.payload.message
    });
}

const updateFormStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        updateError: null
    });
}

const updateFormSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        updateError: null
    });
}

const updateFormFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        updateError: action.payload.message
    });
}

const resetState = (state, action) => {
    return updateObject(state, {
        users: [],
        currentDepartmentForms: [],
        currentUsersAssignedForms: [],
        currentUsersRequestedForms: [],
        error: null,
        loading: false,
        updateError: null
    });
}

const depLoadingStart = (state, action) => {
    return updateObject(state, {
        loading: true,
    });
}

const depLoadingStop = (state, action) => {
    return updateObject(state, {
        loading: false,
    });
}


export default departmentReducer;