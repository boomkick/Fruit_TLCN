
import { axiosClientWithToken } from "./axiosClient";

const apiInventory = {
    getInventoryById: async (params) => {
        const res = await axiosClientWithToken.get(`/Inventory/${params}`)
        return res.data;
    },
    getInventory: async (params) => {
        const res = await axiosClientWithToken.get(`/Inventory?${getSearchParams(params)}`)
        return res.data;
    },
    postInventory: async (params) => {
        const res = await axiosClientWithToken.post(`/Inventory`, params);
        return res.data;
    },
    putInventory: async (params, id) => {
        const res = await axiosClientWithToken.put(`/Inventory/${id}/`, params);
        return res.data;
    },
    getNotificationInventory: async (params) => {
        const res = await axiosClientWithToken.get(`/Inventory/notification?${getSearchParams(params)}`)
        return res.data;
    },
}
export default apiInventory;

function getSearchParams(params) {
    let search = ""
        for (let item in params) {
            search = search + item.toString() + "=" + params[item] + "&";
        }
        search = search.slice(0, -1);
        return search
}