export {
    auth,
    authLogout,
    checkAuthOnLoad,
    register,
    toggleLogin,
    resetAuthState,
    logoutAndClear
} from './authAction';

export {
    fetchDepartments,
    fetchUsers,
    postForm,
    fetchUserRequestedForm,
    fetchUserAssignedForm,
    fetchDepartmentForm,
    updateStatusForm,
    resetError,
    resetDepartmentState
} from './departmentAction';