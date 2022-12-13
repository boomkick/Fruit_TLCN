import { useSelector } from "react-redux";
import "./OverView.scss";


function OverView() {
    const user = useSelector(state => state.auth.user)

    return (
        <div>
            <p>
                {"Chào "}
                <strong>{user?.fullName}</strong>
            </p>
        </div>
    )
}

export default OverView;