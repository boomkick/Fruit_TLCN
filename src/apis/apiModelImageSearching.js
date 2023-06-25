import axios from 'axios';
import queryString from 'query-string';

const baseURLGHN = "http://127.0.0.1:5000/"

export const axiosModel = axios.create({
    baseURL: baseURLGHN,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
    paramsSerializer: (params) => queryString.stringify(params)
});

const apiModelImageSearching = {
    postGetForm: async (params) => {
        const res = await axiosModel.post('/test-form', params)
        return res.data;
    },
};
export default apiModelImageSearching