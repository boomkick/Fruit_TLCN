import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { logoutSuccess } from '../../slices/authSlice'
import { toast } from 'react-toastify'
import jwt_decode from 'jwt-decode'

const privatePath = [
    '/customer/', '/admin/', '/payment',
]

function CheckAuthentication() {
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(() => {
        const check = () => {
            const isPrivate = privatePath.findIndex(e => location.pathname.includes(e)) >= 0 ? true : false

            if (user) {
                if (user.refreshToken) {
                    const tokenDecode = jwt_decode(user.refreshToken)
                    let date = new Date();
                    if (tokenDecode.exp < date.getTime() / 1000) {
                        toast.warning("Phiên làm việc của bạn đã hết. Vui lòng đăng nhập lại")
                        dispatch(logoutSuccess())
                        if (isPrivate)
                            navigate('/')

                    }
                }
                else {
                    dispatch(logoutSuccess())
                    toast.warning("Phiên làm việc của bạn đã hết. Vui lòng đăng nhập lại")
                    if (isPrivate)
                        navigate('/')
                }
            }
            else {
                if (isPrivate)
                    navigate('/')
            }
        }
        check()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    return
}

export default CheckAuthentication