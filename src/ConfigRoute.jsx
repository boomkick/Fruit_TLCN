import Home from "./pages/Home";
import CustomerAccount from "./pages/CustomerAccount";
import ProductDetail from "./pages/ProductDetail";
import FilterProduct from "./pages/FilterProduct";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";


import PrivateRoute from "./components/PrivateRoute"


import Admin from "./pages/Admin";
import { Route, Routes } from "react-router-dom";
import Employee from "./pages/Employee";


function ConfigRoute() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<PrivateRoute roles={["ROLE_ADMIN"]} />}>
        <Route path="admin/*" element={<Admin />} />
      </Route>

      <Route element={<PrivateRoute roles={["ROLE_EMPLOYEE"]} />}>
        <Route path="employee/*" element={<Employee />} />
      </Route>

      <Route element={<PrivateRoute roles={["ROLE_USER", "ROLE_EMPLOYEE", "ROLE_ADMIN"]} />}>
        <Route path="cart/" element={<Cart />} />
        <Route path="payment" element={<Payment />} />
        <Route path="my-account/*" element={<CustomerAccount />} />
      </Route>


      <Route path="product-detail/:id" element={<ProductDetail />} />
      <Route path="product-category/:id" element={<FilterProduct />} />
    </Routes>
  );
}

export default ConfigRoute;
