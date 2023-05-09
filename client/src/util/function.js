import axios from 'axios'
import {toast} from 'react-toastify'

const manageHandler = axios.create({
    baseURL: 'http://localhost:5001/api/v1/manage'
})

const createSession = (token) => localStorage.setItem('auth', JSON.stringify({token, ttl: (new Date().getTime() + 3600000)}))

export const getSession = () => {
    const data = localStorage.getItem('auth')
    if (!data || data.length <= 0) {
        return null;
    }

    const parsed = JSON.parse(data);
    return (new Date().getTime() > parsed.ttl) ? null : parsed?.token
}

export const login = async (email, password) => {
    try {
        const resp = await manageHandler.post('/user/login', {
            email, password
        })
        if (resp.data?.token) {
            createSession(resp?.data?.token);
            return true;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
}

export const register = async (email, password, name) => {
    try {
        const resp = await manageHandler.post('/user', {email, password, name})
        if (resp?.data?._id) {
            return {result: true, message: "Registration Successful"}
        } else {
            return {result: false, message: "Error Occurred"}
        }
    } catch (err) {
        console.log(err);
        return {result: false, message: err?.response?.data?.message}
    }
}

export const getProfile = async () => {
    const sessionToken = getSession();

    if (!sessionToken) {
        toast.error("Session not set!")
        return {result: false, profile: {}};
    }

    const resp = await manageHandler.get('/user', {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    })

    console.log(resp.data)
    return {result: true, profile: resp.data}
}

export const modifyUser = async (name, password) => {
    const sessionToken = getSession();
    let data = {}
    if (!sessionToken) {
        toast.error("Session not set!")
        return {result: false, message: "Unauthenticated"};
    }

    if (name.length !== 0) data.name = name
    if (password.length !== 0) data.password = password

    await manageHandler.put(`/user`, data, {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    })

    return {result: true, message: "Profile Edited Successfully"}
}

export const deleteUser = async () => {
    const sessionToken = getSession();
    if (!sessionToken) {
        toast.error("Session not set!")
        return {result: false, message: "Unauthenticated"};
    }

    await manageHandler.delete(`/user`, {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    })

    return {result: true, message: "Deletetion Successful"}
}

export const createShortUrl = async (title, url) => {
    const sessionToken = getSession();
    if (!sessionToken) {
        toast.error("Session not set!")
        return {result: false, urls: []};
    }

    const resp = await manageHandler.post('/urls', {
        title, url
    }, {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    })

    return {result: true, data: resp.data, message: "Link Created Successfully"}
}

export const getShortUrls = async () => {
    const sessionToken = getSession();

    if (!sessionToken) {
        toast.error("Session not set!")
        return {result: false, urls: []};
    }

    const resp = await manageHandler.get('/urls', {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    })

    return {result: true, urls: resp.data}
}

export const updateShortUrl = async (id, title, url) => {
    const sessionToken = getSession();

    if (!sessionToken) {
        toast.error("Session not set!")
        return {result: false, urls: []};
    }

    let data = {}

    if (title.length !== 0) data.title = title
    if (url.length !== 0) data.url = url

    await manageHandler.put(`/urls/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${sessionToken}`
        }
    })

    return {result: true, message: "Modified Successfully"}
}

export const deleteShortUrl = async (id) => {
    try {
        const sessionToken = getSession();
        if (!sessionToken) {
            return false
        }
        const resp = await manageHandler.delete(`/urls/${id}`, {
            headers: {
                'Authorization': `Bearer ${sessionToken}`
            }
        })

        if (resp.status === 200) {
            return true;
        }
        return false;
    } catch (err) {
        return false
    }
}
