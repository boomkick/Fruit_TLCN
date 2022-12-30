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
    putUploadAvatar: async (params) => {
        const res = await axiosClientWithToken.post('/account/uploadAvatar', params,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        return res.data;
    },
    putChangeInfo: async (params) => {
        const res = await axiosClientWithToken.put('/account/changeInfo', params)
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

    getAllUser: async (params) => {
        const res = await axiosClientWithToken.get('admin/account/all', params)
        return res.data;
    },

    

}
    
export default apiProfile;