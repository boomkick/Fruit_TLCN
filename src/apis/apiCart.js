import axios from 'axios';
import { axiosAdmin, axiosClient, axiosClientWithToken } from "./axiosClient";
import queryString from 'query-string';
const baseURL='https://localhost:7039'

// export const axiosClient = axios.create({
//     baseURL: baseURL,
//     headers: {
//         "Content-Type": "application/json"
//     },
//     withCredentials: false,
//     paramsSerializer: (params) => queryString.stringify(params)
// });

export const axiosClientWithPayment = axios.create({
    baseURL: 'https://mypayment-momo.herokuapp.com/api',
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});

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
    getAllOrders: async (params) => {
        let search = ""
        for (let item in params) {
            search = search + item.toString() + "=" + params[item] + "&";
        }
        search = search.slice(0, -1);
        console.log("search", search)
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
    // getProcessCartByFilter: async (params) => {
    //     let search = ""
    //     for (let item in params) {
    //         search = search + item.toString() + "=" + params[item] + "&";
    //     }
    //     search = search.slice(0, -1);
    //     console.log("search", search)
    //     const res = await axiosClientWithToken.get(`/Cart/ProcessCart/`, params)
    //     return res.data;
    // },
    getCancelCart: async (id) => {
        const res = await axiosClientWithToken.get(`/Cart/CartCancel/${id}`)
        return res.data;
    },
}
export default apiCart;