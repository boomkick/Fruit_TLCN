
import { axiosClient, axiosClientWithToken } from "./axiosClient";

const apiAddress = {
    getProfileUser: async (params) => {
        const res = await axiosClientWithToken.get('/account/profile')
        return res.data;
    },
    getVietNamLocations: async (params) => {
        const res = await axiosClientWithToken.get('/Location/VietnamLocation')
        return res.data;
    },
}
export default apiAddress;