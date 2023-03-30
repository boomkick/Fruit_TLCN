
import { axiosClientWithToken } from "./axiosClient";

const apiStatistics = {
    getInventoryById: async (params) => {
        const res = await axiosClientWithToken.get(`/Inventory/${params}`)
        return res.data;
    },
    getInventory: async (params) => {
        const res = await axiosClientWithToken.get(`/Inventory?${getSearchParams(params)}`)
        return res.data;
    },
    postProduct: async (params) => {
        const res = await axiosClientWithToken.post(`/Inventory`, params);
        return res.data;
    },
    putProduct: async (params, id) => {
        const res = await axiosClientWithToken.put(`/Inventory/${id}/`, params);
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