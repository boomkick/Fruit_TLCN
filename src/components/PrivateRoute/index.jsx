import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify';
import { logoutSuccess } from '../../slices/authSlice';
import { useEffect, useState } from 'react';
import {role} from '../../constraints/Role'

//Component tạo một định tuyến an toàn, khi muốn truy cập các đường dẫn cần có xác thực thì phải đi qua route này
const 
PrivateRoute = ({
    roles,
}) => {
    const [auth, setAuth] = useState(null)
    let location = useLocation();
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch()
    useEffect(() => {
        const verify = async () => {
            if (user) {
                const decodeToken = jwt_decode(user?.accessToken);
                let dateNow = new Date();
                if (decodeToken.exp < dateNow.getTime()/1000) {
                    toast.warning("Vui lòng đăng nhập lại để sử dụng tính năng", { autoClose: 1000, pauseOnHover: false })
                    setAuth(false)
                    dispatch(logoutSuccess())
                    return
                }
                let user_role = role.find((item) => item.id === user.role)
                const userHasRequiredRole = roles.includes(user_role.value) ? true : false
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
