import {  axiosClientWithToken } from "./axiosClient";

const apiNotification = {
    getNotification: async (params) => {
        const res = await axiosClientWithToken.get(`/cartNotification?${getSearchParams(params)}`)
        return res.data;
    },
    getCountNewNotification: async () => {
        const res = await axiosClientWithToken.get('/cartNotification/countNewNotifications')
        return res.data;
    },
    getResetNewNotification: async () => {
        const res = await axiosClientWithToken.get('/cartNotification/resetNewNotification')
        return res.data;
    },
    putNotification: async (params) => {
        const res = await axiosClientWithToken.put(`/cartNotification/${params.id}`)
        return res.data;
    }
}
export default apiNotification;

function getSearchParams(params) {
    let search = ""
        for (let item in params) {
            search = search + item.toString() + "=" + params[item] + "&";
        }
        search = search.slice(0, -1);
        return search
}