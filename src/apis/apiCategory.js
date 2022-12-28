import {  axiosClient, axiosClientWithToken } from "./axiosClient";

const apiCategory = {
    showAllCategory: async (params) => {
        const res = await axiosClientWithToken.get('/Category', params)
        return res.data;
    },
    deleteCategory: async (params) => {
        const res = await axiosClientWithToken.delete(`/Category/${params.id}`)
        return res.data;
    },
    postCategory: async (params) => {
        const res = await axiosClientWithToken.post(`/Category/insert`,params)
        return res.data;
    },
    putCategory: async (params, id) => {
        const res = await axiosClientWithToken.put(`/Category/${id}`, params)
        return res.data;
    }
}
export default apiCategory;