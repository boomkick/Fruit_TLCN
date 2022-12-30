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
    getProductsByPage: async (page, pageSize) => {
        const res = await axiosAdmin.get(`/Product?page=${page}&pageSize=${pageSize}`)
        return res.data;
    },
    getProductsByCategory: async (params) => {
        let search = ""
        for (let item in params) {
            search = search + item.toString() + "=" + params[item] + "&";
        }
        search = search.slice(0, -1);
        console.log("search", search)
        const res = await axiosAdmin.get(`/Product?${search}`)
        return res.data;
    },
    postProduct: async (params) => {
        const res = await axiosAdmin.post(`/Product`, params);
        return res.data;
    },
    
}
export default apiProduct;