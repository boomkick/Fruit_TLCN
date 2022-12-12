import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify';
import { logoutSuccess } from '../../slices/authSlice';
import { useEffect, useState } from 'react';
import {role} from '../../constraints/Role'

//Component tạo một định tuyến an toàn, khi muốn truy cập các đường dẫn cần có xác thực thì phải đi qua route này
const PrivateRoute = ({
    roles,
}) => {
    const [auth, setAuth] = useState(null)
    let location = useLocation();
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
    useEffect(() => {
        const verify = async () => {
            if (user) {
                /*const veri = await apiMain.verifyToken(user, dispatch, loginSuccess)
                if (veri?.status !== 200) {
                    toast.warning("Phiên làm việc của bạn đã hết. Vui lòng đăng nhập lại", { autoClose: 1000, pauseOnHover: false, hideProgressBar: true })
                    setAuth(false);
                }*/
                if(!user.refreshToken){
                    toast.warning("Phiên làm việc của bạn đã hết. Vui lòng đăng nhập lại")
                    setAuth(false);
                    dispatch(logoutSuccess())
                    return
                }
                // const tokenDecode = jwt_decode(user?.refreshToken)
                // let date = new Date();
                // if (tokenDecode.exp < date.getTime() / 1000) {
                //     toast.warning("Phiên làm việc của bạn đã hết. Vui lòng đăng nhập lại")
                //     setAuth(false);
                //     dispatch(logoutSuccess())
                //     return
                // }
                let user_role = role.map((item) => {
                    if(item.id === user.id){
                      return item
                    }
                  })
                const userHasRequiredRole = roles.includes(user_role.id) ? true : false
                console.log("here: ", userHasRequiredRole);
                if (!userHasRequiredRole) {
                    toast.warning("Bạn không có quyền truy cập", { autoClose: 1000, pauseOnHover: false, hideProgressBar: true })
                    setAuth(false);
                    return
                }

                setAuth(true)
            }
            else {
                toast.warning("Bạn chưa đăng nhập", { autoClose: 1000, pauseOnHover: false })
                setAuth(false)
                return <Navigate to="/" state={{ from: location }} />;
            }
        }
        verify()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (auth === null) return <></>
    return auth === true ? <Outlet /> : <Navigate to="/" state={{ from: location }} />;

};

export default PrivateRoute;
