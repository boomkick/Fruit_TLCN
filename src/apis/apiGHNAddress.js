import axios from 'axios';
import queryString from 'query-string';

const baseURLGHN = "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/"

export const axiosGHN = axios.create({
    baseURL: baseURLGHN,
    headers: {
        "token": "9d4848e1-54d0-11ed-9ad7-269dd9db11fd",
        "Content-Type": "application/json",
    },
    withCredentials: false,
    paramsSerializer: (params) => queryString.stringify(params)
});

const apiGHNAddress = {
    getProvinces: async () => {
        const res = await axiosGHN.get('/province')
        return res.data;
    },
    getDistrictsByCityId: async (params) => {
        const res = await axiosGHN.get('/district', params)
        return res.data;
    },
    getWardsByDictrictId: async (params) => {
        const res = await axiosGHN.get('/ward', params)
        return res.data;
    },
};
export default apiGHNAddress