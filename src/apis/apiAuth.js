
import { axiosClient } from "./axiosClient";

const apiAuth = {
    postLogin: async (params) => {
        const myLogin = await axiosClient.post('/account/login', params)
        return myLogin.data;
    },
    postGoogleLogin: async (params) => {
        const myLogin = await axiosClient.post('/googleaccount/login', params)
        return myLogin.data;
    },
    postRegister: async (params) => {
        const register = await axiosClient.post('/account/user/register', params)
        return register.data
    },
    getUserByToken: async (params) => {
        const myLogin = await axiosClient.get('/auth/social', {params})
        return myLogin.data;
    },
    search: async (params) => {
        const mySearch = await axiosClient.post('', params)
        return mySearch.data;
    },

}

export default apiAuth;