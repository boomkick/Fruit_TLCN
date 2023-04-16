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
    updateUserStatus: async (params) => {
        const res = await axiosClientWithToken.put('/account/admin/updateUserStatus', params)
        return res.data;
    },
    getUserByAdmin: async (params) => {
        const res = await axiosClientWithToken.get(`/account/admin/manageUser?${getSearchParams(params)}`);
        return res.data;
    },
    getEmployeeByAdmin: async (params) => {
        const res = await axiosClientWithToken.get(`/account/admin/manageemployee?${getSearchParams(params)}`);
        return res.data;
    },
    getEmployeeByAdminWithID: async (params) => {
        const res = await axiosClientWithToken.get(`/account/admin/account/${params.id}`);
        return res.data;
    },
    getUserDetailByAdmin: async (params) => {
        const res = await axiosClientWithToken.get(`/account/admin/userDetail/${params.userId}?${getSearchParams(params, true)}`);
        return res.data;
    },
}
    
export default apiProfile;

function getSearchParams(params, isUserID) {
    isUserID = isUserID || false
    let search = "";
    for (let item in params) {
        if (isUserID){
            if (item !== 'userId'){
                search = search + item.toString() + "=" + params[item] + "&";    
            }
        } else {
            search = search + item.toString() + "=" + params[item] + "&";
        }
    }
    search = search.slice(0, -1);
    return search;
  }