import axios from 'axios';
import queryString from 'query-string';
import { axiosClient } from './axiosClient';
const apiURL='https://localhost:7039/'
export const axiosAdmin = axios.create({
    baseURL: apiURL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "text/plain",
    },
    withCredentials: false,
    paramsSerializer: (params) => queryString.stringify(params)
});


const apiProduct = {
    getProducts: async (page) => {
        const res = await axiosAdmin.get(`/Product?page=${page}`)
        console.log(res)
        console.log(typeof res.data)
        return res.data;
    },
    getTop8Product: async () => {
        const res = await axiosClient.get('Product/gettop8product/')
        return res.data;
    },
    getProductDetail: async (id) => {
        const res = await axiosClient.get(`Product/${id}/`)
        return res.data;
    },
    // saveOrder: async (params) => {
    //     const res = await axiosAdmin.post('/myorders',params)
    //     return res.data;
    // },
    // changeTypeOrder: async (params, id) => {
    //     const res = await axiosAdmin.patch(`/myorders/${id}`,params)
    //     return res.data;
    // },
    // makePaymentMomo: async (params) => {
    //     const res = await axiosAdminWithPayment.post('/create-payment',params)
    //     return res.data;
    // },
    
}
export default apiProduct;