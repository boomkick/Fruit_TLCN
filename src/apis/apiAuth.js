
import { axiosClient } from "./axiosClient";

const apiAuth = {
    postLogin: async (params) => {
        const myLogin = await axiosClient.post('/account/login', params)
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

    postCheckPhone: async (params) => {
        const checkPhone = await axiosClient.post('/auth/verification', params)
        return checkPhone.data
    },
    resetPassword:async (params,token) => {
        const register = await axiosClient.post(`/auth/resetPassword/?token=${token}`, params)
        return register.data
    },
    forgetPassword:async (params) => {
        const register = await axiosClient.post(`/account/changePassword`, params)
        return register.data
    }

}

export default apiAuth;