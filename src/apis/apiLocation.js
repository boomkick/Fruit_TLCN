import { axiosClient } from "./axiosClient";

const apiCategory = {
    getVietNamLocation: async () => {
        const res = await axiosClient.get('/Location/VietNam')
        return res.data;
    },
    getGlobalLocation: async () => {
        const res = await axiosClient.get(`/Location/GlobalLocation`)
        return res.data;
    },
    getListCity: async () => {
        const res = await axiosClient.get(`/Location/city`)
        return res.data;
    },
    getListDistrictByCityId: async (params) => {
        const res = await axiosClient.get(`/Location/district/${params.cityId}`)
        return res.data;
    },
    getListWardByCityIdAndDistrictId: async (params) => {
        const res = await axiosClient.get(`/Location/ward/${params.cityId}/${params.districtId}`)
        return res.data;
    },
    getCityById: async (params) => {
        const res = await axiosClient.get(`/Location/city/${params.cityId}`, )
        return res.data;
    },
    getDistrictByCityIdDistrictId: async (params) => {
        const res = await axiosClient.get(`/Location/district/${params.cityId}/${params.districtId}`)
        return res.data;
    },
    getWardByIdCityIdDistrictIdWardId: async (params) => {
        const res = await axiosClient.get(`/Location/ward/${params.cityId}/${params.districtId}/${params.wardId}`, )
        return res.data;
    }
}
export default apiCategory;