import * as ActionTypes from './actionTypes';
import { getRequest, getRequestWithoutToken, postRequest, patchRequest } from '../../services/backendService';
import { openNotification } from '../../utils/notification';

export const fetchDepartments = () => {
    return (dispatch) => {
        return getRequestWithoutToken('/department')
            .then(response => {
                if (response.statusCode === 200) {
                    // console.log(response);
                    dispatch(fetchDepartmentsSuccess(response.data))
                } else {
                    return Promise.reject({
                        statusCode: response.statusCode,
                        message: response.message,
                        error: response.error
                    });
                }

            })
            .catch(error => console.log(error));
    }
}

export const fetchUsers = () => {
    return (dispatch) => {
        return getRequest('/user')
            .then(response => {
                if (response.statusCode === 200) {
                    // console.log(response);
                    dispatch(fetchUsersSuccess(response.data))
                } else {
                    return Promise.reject({
                        statusCode: response.statusCode,
                        message: response.message,
                        error: response.error
                    });
                }

            })
            .catch(error => console.log(error));
    }
}

export const postForm = (createdBy, assignedTo, assignedDepartment, message) => {
    return (dispatch) => {
        dispatch(postFormStart())
        const formData = { createdBy, assignedTo, assignedDepartment, message }
        return postRequest('/form', formData)
            .then(response => {
                if (response.statusCode === 201 || response.statusCode === 200) {
                    // console.log('postForm', response);
                    dispatch(postFormSuccess());
                    openNotification('success', 'Request Sent', '', 3);
                } else {
                    return Promise.reject({
                        statusCode: response.statusCode,
                        message: response.message,
                        error: response.error
                    });
                }

            })
            .catch(error => {
                dispatch(postFormFail(error));
                openNotification('error', 'Request Failed', error.message, 5);
            });
    }
}

export const postFormStart = () => ({
    type: ActionTypes.FORM_REQUEST_START
})
export const postFormSuccess = () => ({
    type: ActionTypes.FORM_REQUEST_SUCCESS
})
export const postFormFail = (error) => ({
    type: ActionTypes.FORM_REQUEST_FAIL,
    payload: error
})

export const updateStatusForm = (formId, status) => {
    return (dispatch) => {
        dispatch(updateStatusFormStart())
        const formData = { 
            status : status,
            createdAt: Date.now
        }
        return patchRequest('/form/' + formId, formData)
            .then(response => {
                if (response.statusCode === 201 || response.statusCode === 200) {
                    dispatch(fetchUserAssignedForm());
                    dispatch(fetchDepartmentForm());
                    dispatch(updateStatusFormSuccess());
                    openNotification('success', 'REQUEST ' + status , '', 3);
                } else {
                    return Promise.reject({
                        statusCode: response.statusCode,
                        message: response.message,
                        error: response.error
                    });
                }

            })
            .catch(error => {
                dispatch(updateStatusFormFail(error));
                openNotification('error','FAILED' ,error.message,3);
            });
    }
}

export const updateStatusFormStart = () => ({
    type: ActionTypes.UPDATE_FORM_REQUEST_START
})
export const updateStatusFormSuccess = () => ({
    type: ActionTypes.UPDATE_FORM_REQUEST_SUCCESS
})
export const updateStatusFormFail = (error) => ({
    type: ActionTypes.UPDATE_FORM_REQUEST_FAIL,
    payload: error
})

export const fetchUserRequestedForm = () => {
    return (dispatch) => {
        dispatch(depLoadingStart());
        return getRequest('/form/requested')
            .then(response => {
                if (response.statusCode === 200) {
                    // console.log('fetchRequestedForm', response);
                    dispatch(fetchUserRequestedFormSuccess(response.data));
                    dispatch(depLoadingStop());
                } else {
                    return Promise.reject({
                        statusCode: response.statusCode,
                        message: response.message,
                        error: response.error
                    });
                }

            })
            .catch(error => {
                dispatch(depLoadingStop());
                console.log(error);
            });
    }
}

export const fetchUserAssignedForm = () => {
    return (dispatch) => {
        dispatch(depLoadingStart());
        return getRequest('/form/assigned')
            .then(response => {
                if (response.statusCode === 200) {
                    // console.log('fetchAssignedForm', response);
                    dispatch(fetchUserAssignedFormSuccess(response.data))
                    dispatch(depLoadingStop());
                } else {
                    return Promise.reject({
                        statusCode: response.statusCode,
                        message: response.message,
                        error: response.error
                    });
                }

            })
            .catch(error => {
                dispatch(depLoadingStop());
                console.log(error);
            });
    }
}

export const fetchDepartmentForm = () => {
    return (dispatch) => {
        dispatch(depLoadingStart());
        return getRequest('/form')
            .then(response => {
                if (response.statusCode === 200) {
                    // console.log('fetchDepartmentFormSuccess', response);
                    dispatch(fetchDepartmentFormSuccess(response.data));
                    dispatch(depLoadingStop());
                } else {
                    return Promise.reject({
                        statusCode: response.statusCode,
                        message: response.message,
                        error: response.error
                    });
                }

            })
            .catch(error => {
                dispatch(depLoadingStop());
                console.log(error);
            });
    }
}

export const fetchDepartmentFormSuccess = (forms) => ({
    type: ActionTypes.FETCH_FORMS_DEPARTMENT,
    payload: forms
})

export const fetchUserAssignedFormSuccess = (forms) => ({
    type: ActionTypes.FETCH_FORMS_USER_ASSIGNED,
    payload: forms
})

export const fetchUserRequestedFormSuccess = (forms) => ({
    type: ActionTypes.FETCH_FORMS_USER_REQUESTED,
    payload: forms
})

export const fetchDepartmentsSuccess = (departments) => ({
    type: ActionTypes.FETCH_DEPARTMENTS,
    payload: departments
})

export const fetchUsersSuccess = (users) => ({
    type: ActionTypes.FETCH_ALL_USERS,
    payload: users
})

export const resetError = () => ({
    type: ActionTypes.RESET_ERROR
})

export const resetDepartmentState = () => ({
    type: ActionTypes.RESET_DEPARTMENT
})

export const depLoadingStart = () => ({
    type: ActionTypes.DEPARTMENT_LOADING_START
})

export const depLoadingStop = () => ({
    type: ActionTypes.DEPARTMENT_LOADING_STOP
})