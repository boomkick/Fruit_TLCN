
import { axiosClientWithToken } from "./axiosClient";

const apiStatistics = {
    getCart: async (params) => {
        const res = await axiosClientWithToken.get(`/Statistics/countCart?${getSearchParams(params)}`)
        return res.data;
    },
    getProfit: async (params) => {
        const res = await axiosClientWithToken.get(`/Statistics/profit?${getSearchParams(params)}`)
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