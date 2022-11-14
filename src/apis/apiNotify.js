import axios from 'axios';
import queryString from 'query-string';

const baseURL = 'https://playerhostedapitest.herokuapp.com/api/'
// const baseURL='https://nhom3-tiki.herokuapp.com/api'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});

const apiNotify = {
    postNotify: async (params) => {
        const res = await axiosClient.post("/notifications",params)
        return res.data
    },

    getNotification: async (params) => {
        const res = await axiosClient.get('/notifications', {params})
        return res.data
    },
    changeSeenProp: async (params,id) => {
        const res = await axiosClient.patch(`/notifications/${id}`,params)
        return res.data;
    },
    deleteNotifyById: async (params) => {
        const res = await axiosClient.delete(`/notifications/${params.id}`)
        return res.data;
    },
}
export default apiNotify;