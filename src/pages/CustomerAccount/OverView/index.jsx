import { useSelector } from "react-redux";
import "./OverView.scss";


function OverView() {
    const user = useSelector(state => state.auth.user)

    return (
        <div style={{fontSize: "15px"}}>
            <p>
                {"Chào "}
                <b>{user?.fullName}</b>
                {", nếu như bạn đang cảm thấy lạnh giá vì những ngày mùa đông đang đến gần thì hãy để chúng mình mang đến cho bạn những món trái cây không thể nóng hơn như trái ớt nhé, ^^ hì hì."}
            </p>
            <p style={{paddingTop: "10px"}}>Chúc bạn một ngày tốt lành.</p>
        </div>
    )
}

export default OverView;