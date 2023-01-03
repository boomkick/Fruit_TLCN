import {  axiosClientWithToken} from "./axiosClient";

const apiProfile = {
    ///authentication
    putChangeEmail: async (params) => {
        const res = await axiosClientWithToken.put('/account/changeEmail', params)
        return res.data;
    },
    postChangePassword: async (params) => {
        const res = await axiosClientWithToken.post('/account/changePassword', params)
        return res.data;
    },
    postUploadAvatar: async (params) => {
        const res = await axiosClientWithToken.post('/account/uploadPhoto', params)
        return res.data;
    },
    putUpdateProfile: async (params) => {
        const res = await axiosClientWithToken.put('/account/updateProfile', params)
        return res.data;
    },
    getUserbyID: async (params) => {
        const res = await axiosClientWithToken.get(`/account/${params}`)
        return res.data;
    },
    getUserProfile: async () => {
        const res = await axiosClientWithToken.get(`/account/profile`)
        return res.data;
    },
    putChangePhone: async (params) => {
        const res = await axiosClientWithToken.put('/account/profile/changePhone', params)
        return res.data;
    },
    putUpdateRole: async (params) => {
        const res = await axiosClientWithToken.put('/account/updateRole', params)
        return res.data;
    },
    

}
    
export default apiProfile;