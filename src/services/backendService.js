const REACT_APP_BASE_APP_URL = "https://swt-department.herokuapp.com";

export const getRequest = async (url) => {
    const token = localStorage.getItem('swt_token');
    const response = await fetch(REACT_APP_BASE_APP_URL + url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    return response.json();
}

export const postRequest = async (url, data) => {
    const token = localStorage.getItem('swt_token');
    const response = await fetch(REACT_APP_BASE_APP_URL + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export const patchRequest = async (url, data) => {
    const token = localStorage.getItem('swt_token');
    const response = await fetch(REACT_APP_BASE_APP_URL + url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export const postRequestWithoutToken = async (url, data) => {
    const response = await fetch(REACT_APP_BASE_APP_URL + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export const getRequestWithoutToken = async (url) => {
    const response = await fetch(REACT_APP_BASE_APP_URL + url);
    return response.json();
}

