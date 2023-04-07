
import { axiosClientWithToken } from "./axiosClient";

const apiStatistics = {
    getCart: async (params) => {
        const res = await axiosClientWithToken.get(`/Statistics/countCart?${getSearchParams(params)}`)
        return res.data;
    },
    getProfit: async (params) => {
        const res = await axiosClientWithToken.get(`/Statistics/profit?${getSearchParams(params)}`)
        return res.data;
    },
    getProduct: async (params) => {
        const res = await axiosClientWithToken.get(`/Statistics/product?${getSearchParams(params)}`)
        return res.data;
    },
    getProductExport: async (params) => {
        const res = await axiosClientWithToken.get(`/Statistics/product/export?${getSearchParams(params)}`)
        return res.data;
    },
    getBill: async (params) => {
        const res = await axiosClientWithToken.get(`/Statistics/bill?${getSearchParams(params)}`)
        return res.data;
    },
    getBillExport: async (params) => {
        const res = await axiosClientWithToken.get(`/Statistics/bill/export?${getSearchParams(params)}`)
        return res.data;
    },
    getCountAllUser: async () => {
        const res = await axiosClientWithToken.get(`/Statistics/countAllUser`)
        return res.data;
    },
    getCountAllProduct: async () => {
        const res = await axiosClientWithToken.get(`/Statistics/countAllProduct`)
        return res.data;
    },
    getProfitIn7Days: async () => {
        const res = await axiosClientWithToken.get(`/Statistics/profitin7days`)
        return res.data;
    },
    getByCategory: async () => {
        const res = await axiosClientWithToken.get(`/Statistics/category`)
        return res.data;
    },
}
export default apiStatistics;

function getSearchParams(params) {
    let search = ""
        for (let item in params) {
            search = search + item.toString() + "=" + params[item] + "&";
        }
        search = search.slice(0, -1);
        return search
}