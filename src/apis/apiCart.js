import { axiosClientWithToken } from "./axiosClient";

const apiCart = {
    getCart: async (params) => {
        const res = await axiosClientWithToken.get('/Cart')
        return res.data;
    },
    postCart: async (params) => {
        const res = await axiosClientWithToken.post('/Cart', params)
        return res.data;
    },
    putCart: async (params) => {
        const res = await axiosClientWithToken.put('/Cart',params)
        return res.data;
    },
    deleteCart: async (params) => {
        const res = await axiosClientWithToken.delete(`/Cart/${params}`)
        return res.data;
    },
    postPayment: async (params) => {
        const res = await axiosClientWithToken.post(`/Cart/payment`, params)
        return res.data;
    },
    getOrders: async () => {
        const res = await axiosClientWithToken.get('/Cart/Carthistory')
        return res.data;
    },
    getOrdersFilterOfUser: async (params) => {
        let search = ""
        for (let item in params) {
            search = search + item.toString() + "=" + params[item] + "&";
        }
        search = search.slice(0, -1);
        const res = await axiosClientWithToken.get(`/Cart/Carthistory?${search}`)
        return res.data;
    },
    getAllOrders: async (params) => {
        let search = ""
        for (let item in params) {
            search = search + item.toString() + "=" + params[item] + "&";
        }
        search = search.slice(0, -1);
        const res = await axiosClientWithToken.get(`/Cart/processCart?${search}`)
        return res.data;
    },
    putProcessCart: async (params, id) => {
        const res = await axiosClientWithToken.put(`/Cart/ProcessCart/${id}`,params)
        return res.data;
    },
    getProcessCart: async (params) => {
        const res = await axiosClientWithToken.get(`/Cart/ProcessCart/${params.id}`)
        return res.data;
    },
    getCartHistoryById: async (params) => {
        const res = await axiosClientWithToken.get(`/Cart/CartHistory/${params.id}`)
        return res.data;
    },
    getCancelCart: async (id) => {
        const res = await axiosClientWithToken.get(`/Cart/CartCancel/${id}`)
        return res.data;
    },
    getValidateQuantity: async () => {
        const res = await axiosClientWithToken.get(`/Cart/validateQuantity`)
        return res.data;
    },
}
export default apiCart;