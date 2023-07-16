import axios from 'axios';
import queryString from 'query-string';
const baseURL='http://tlcndotnet-dev.eba-ubynrpz2.ap-southeast-1.elasticbeanstalk.com/'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: false,
    paramsSerializer: (params) => queryString.stringify(params)
});

export const axiosClientWithToken = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: false,
    paramsSerializer: (params) => queryString.stringify(params)
});

export const axiosAdminGetFile = axios.create({
    baseURL: baseURL,
    responseType: 'arraybuffer',
    headers: {
        "Content-Type": "blob",
    },
    withCredentials: false,
    paramsSerializer: (params) => queryString.stringify(params)
});

export const axiosAdmin = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    paramsSerializer: (params) => queryString.stringify(params)
});

var myInterceptor = null;
export const axiosInstance = (user, dispatch, stateSuccess, stateFail) => {
    axiosClientWithToken.interceptors.request.eject(myInterceptor)
    myInterceptor = axiosClientWithToken.interceptors.request.use(
        async (config) => {
            if(!(user && user.accessToken)){
                return config;
            }
            config.headers['Authorization'] = `Bearer ${user.accessToken}`;
            return config;
        },
        err => {
            return Promise.reject(err)
        }
    );
}


export const axiosInstanceFile = (user, dispatch, stateSuccess, stateFail) => {
    axiosAdminGetFile.interceptors.request.eject(myInterceptor)
    myInterceptor = axiosAdminGetFile.interceptors.request.use(
        async (config) => {
            if(!(user && user.accessToken)){
                return config;
            }
            config.headers['Authorization'] = `Bearer ${user.accessToken}`;
            return config;
        },
        err => {
            return Promise.reject(err)
        }
    );
}