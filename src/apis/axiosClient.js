import axios from 'axios';
import queryString from 'query-string';
import jwt_decode from 'jwt-decode';
// const baseURL='https://playerhostedapitest.herokuapp.com/api/'
//const baseURL='http://localhost:5000/api'
const baseURL='https://nhom3-tiki.herokuapp.com/api'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});



const refreshToken = async (user) => {
    const res = await axiosClient.post('/auth/refreshtoken', { refreshToken: user.refreshToken  }, { headers: { Authorization: `Bearer ${user.accessToken}` }, })
    return res.data
}

export const axiosClientWithToken = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});

var myInterceptor = null;
export const axiosInstance = (user, dispatch, stateSuccess,stateFail) => {
    axiosClientWithToken.interceptors.request.eject(myInterceptor)
    myInterceptor = axiosClientWithToken.interceptors.request.use(
        async (config) => {
            let date = new Date();
            if(!(user && user.accessToken)){
                return config;
            }
            const decodeToken = jwt_decode(user?.accessToken);
            
            if (decodeToken.exp < date.getTime() / 1000) {
                try{
                    const newAccessToken = await refreshToken(user);

                    const newUser = {
                        ...user,
                        accessToken: newAccessToken.data.accessToken,
                        refreshToken: newAccessToken.data.refreshToken
                    }
                    dispatch(stateSuccess(newUser))
                    config.headers['Authorization'] = `Bearer ${newAccessToken.accessToken}`;
                }
                catch(err){
                    dispatch(stateFail(null))
                }
            }else{
                config.headers['Authorization'] = `Bearer ${user.accessToken}`;
            }
            return config;
        },
        err => {
            return Promise.reject(err)
        }
    );
}
