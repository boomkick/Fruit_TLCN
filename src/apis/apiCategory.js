import {  axiosClientWithToken } from "./axiosClient";

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
        const res = await axiosClientWithToken.post(`/Category/`,params)
        return res.data;
    },
    putCategory: async (params, id) => {
        const res = await axiosClientWithToken.put(`/Category/${id}`, params)
        return res.data;
    },
    getCategoryById: async (id) => {
        const res = await axiosClientWithToken.get(`/Category/${id}`);
        return res.data;
    }
}
export default apiCategory;