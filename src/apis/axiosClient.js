import axios from 'axios';
import queryString from 'query-string';
import jwt_decode from 'jwt-decode';
import { logoutSuccess } from '../slices/authSlice';
// const baseURL='https://playerhostedapitest.herokuapp.com/api/'
//const baseURL='http://localhost:5000/api'
const baseURL='https://localhost:7039'
const apiURL='https://localhost:7039'
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

export const axiosAdmin = axios.create({
    baseURL: apiURL,
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
            // const decodeToken = jwt_decode(user?.accessToken);
            // let dateNow = new Date();
            config.headers['Authorization'] = `Bearer ${user.accessToken}`;
            return config;
        },
        err => {
            return Promise.reject(err)
        }
    );
}
