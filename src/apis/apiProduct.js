import axios from 'axios';
import queryString from 'query-string';
import { axiosClientWithToken } from './axiosClient';

const apiURL='http://tlcndotnet-dev.eba-ubynrpz2.ap-southeast-1.elasticbeanstalk.com/'
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
        const res = await axiosClientWithToken.get('Product/gettop8product/')
        return res.data;
    },
    getBestProduct: async () => {
        const res = await axiosClientWithToken.get('Product/getbestproduct/')
        return res.data;
    },
    getProductDetail: async (id) => {
        const res = await axiosClientWithToken.get(`Product/${id}/`)
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
        const res = await axiosClientWithToken.get(`/Product?${search}`)
        return res.data;
    },
    postProduct: async (params) => {
        const res = await axiosAdmin.post(`/Product`, params);
        return res.data;
    },
    putProduct: async (params, id) => {
        const res = await axiosAdmin.put(`/Product/${id}/`, params);
        return res.data;
    },
    deleteProduct: async (params) => {
        const res = await axiosAdmin.delete(`/Product/${params.id}/`);
        return res.data;
    },
    getProductSuggest: async (params) => {
        const res = await axiosAdmin.get(`/Product/suggestion/`);
        return res.data;
    },
    
}
export default apiProduct;