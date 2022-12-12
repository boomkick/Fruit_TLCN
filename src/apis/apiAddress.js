
import { axiosClient, axiosClientWithToken } from "./axiosClient";

const apiAddress = {

    getProfileUser: async (params) => {
        const res = await axiosClientWithToken.get('/user/profile')
        return res.data;
    },

    getUserAddress: async (params) => {
        const res = await axiosClientWithToken.get('/user/address')
        return res.data;
    },
    deleteAddressById: async (params) => {
        const res = await axiosClientWithToken.delete(`/address/${params.id}`)
        return res.data;
    },
    saveAddress: async (params) => {
        const res = await axiosClientWithToken.post('/user/address', params)
        return res.data;
    },

    updateUserAddressById: async (params, id) => {
        const res = await axiosClientWithToken.post(`/address/${id}`, params)
        return res.data;
    },
    getAddressById: async (params) => {
        const res = await axiosClientWithToken.get('/address', { params })
        return res.data;
    },
    getCommuneInDistrictById: async (params) => {
        const res = await axiosClient.get(`address/commune/${params.id}/district`)
        return res.data;
    },
    getDistrictInProvinceById: async (params)=>{
        const res= await axiosClient.get(`address/district/${params.id}/province`)
        return res.data;
    },
    getAllProvince : async (params)=>{
        const res = await axiosClient.get('address/province')
        return res.data;
    },

}
export default apiAddress;