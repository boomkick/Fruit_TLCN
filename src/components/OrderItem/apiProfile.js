import {  axiosClientWithToken} from "./axiosClient";

const apiProfile = {

    ///authentication
    putChangeEmail: async (params) => {
        const res = await axiosClientWithToken.put('/user/profile/changeEmail', params)
        return res.data;
    },
    putChangePassword: async (params) => {
        const res = await axiosClientWithToken.put('/user/profile/changePassword', params)
        return res.data;
    },
    putUploadAvatar: async (params) => {
        const res = await axiosClientWithToken.post('/user/profile/uploadAvatar', params,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        return res.data;
    },
    putChangeInfo: async (params) => {
        const res = await axiosClientWithToken.put('/user/profile/changeInfo', params)
        return res.data;
    },
    getUserbyID: async (params) => {
        const res = await axiosClientWithToken.get(`/user/${params}`)
        return res.data;
    },
    getUserProfile: async () => {
        const res = await axiosClientWithToken.get(`/user/profile`)
        return res.data;
    },
    putChangePhone: async (params) => {
        const res = await axiosClientWithToken.put('/user/profile/changePhone', params)
        return res.data;
    },

    getAllUser: async (params) => {
        const res = await axiosClientWithToken.get('admin/user/all', params)
        return res.data;
    },

    

}
    
export default apiProfile;