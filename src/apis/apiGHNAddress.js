import axios from 'axios';
import queryString from 'query-string';

const baseURLGHN = "https://dev-online-gateway.ghn.vn/shiip/public-api/"

export const axiosGHN = axios.create({
    baseURL: baseURLGHN,
    headers: {
        "token": "9d4848e1-54d0-11ed-9ad7-269dd9db11fd",
        "Content-Type": "application/json",
    },
    withCredentials: false,
    paramsSerializer: (params) => queryString.stringify(params)
});

export const axiosGHNTime = axios.create({
    baseURL: baseURLGHN,
    headers: {
        "token": "9d4848e1-54d0-11ed-9ad7-269dd9db11fd",
        "Content-Type": "application/json",
        "ShopId": "120212",
    },
    withCredentials: false,
    paramsSerializer: (params) => queryString.stringify(params)
});

const apiGHNAddress = {
    getProvinces: async () => {
        const res = await axiosGHN.get('/master-data/province')
        return res.data;
    },
    getDistrictsByProvinceId: async (params) => {
        const res = await axiosGHN.post('/master-data/district', params)
        return res.data;
    },
    getWardsByDictrictId: async (params) => {
        const res = await axiosGHN.post('/master-data/ward', params)
        return res.data;
    },
    postShippingOrderFee: async (params) => {
        const res = await axiosGHN.post('/v2/shipping-order/fee', params)
        return res.data;
    },
    postShippingOrderTime: async (params) => {
        const res = await axiosGHNTime.post('/v2/shipping-order/leadtime', params)
        return res.data;
    },
};
export default apiGHNAddress