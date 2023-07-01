import axios from 'axios';
import queryString from 'query-string';

const baseURLGHN = "https://online-gateway.ghn.vn/shiip/public-api/"

export const axiosGHN = axios.create({
    baseURL: baseURLGHN,
    headers: {
        "token": "a4864617-17cb-11ee-8506-6ead57e9219a",
        "Content-Type": "application/json",
    },
    withCredentials: false,
    paramsSerializer: (params) => queryString.stringify(params)
});

export const axiosGHNTime = axios.create({
    baseURL: baseURLGHN,
    headers: {
        "token": "a4864617-17cb-11ee-8506-6ead57e9219a",
        "Content-Type": "application/json",
        "ShopId": "4300980",
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