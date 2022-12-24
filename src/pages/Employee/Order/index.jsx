import { Routes,Route } from "react-router-dom";
import DetailOrder from "./DetailOrder";
import OrderList from "./OrderList";


function Order() {
    return (<>
        <Routes>
            <Route path='/' element={<OrderList />} />
            <Route path="detail/:id" element={<DetailOrder />} />
        </Routes>
    </>
    )
}
export default Order