import axios from 'axios';
import queryString from 'query-string';


// create axiosProducts to test favorite product
const baseURL='http://tlcndotnet-dev.eba-ubynrpz2.ap-southeast-1.elasticbeanstalk.com'
export const axiosProducts = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: false,
    paramsSerializer: (params) => queryString.stringify(params)
});


const apiMain = {

    ///authentication
    getProducts: async (params) => {
        const res = await axiosProducts.get('/Product?page=1', {params})
        return res.data;
    },
}


export default apiMain;