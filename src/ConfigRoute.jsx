import Home from "./pages/Home";
import CustomerAccount from "./pages/CustomerAccount";
import ProductDetail from "./pages/ProductDetail";
import FilterProduct from "./pages/FilterProduct";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";


import PrivateRoute from "./components/PrivateRoute"


import Admin from "./pages/Admin";
import { Route, Routes } from "react-router-dom";


function ConfigRoute() {
  return (
    // <Routes>
    //   <Route path="/" element={<Home />} />

    //   {/* Routing customer account */}
    //   {/* <Route element={<PrivateRoute roles={["USER",'ADMIN']} />}>
    //     <Route path="my-account/*" element={<CustomerAccount />} />
    //   </Route> */}
    //   <Route path="my-account/*" element={<CustomerAccount />} />
    //   <Route path="product-detail/*" element={<ProductDetail />} />
    //   <Route path="admin/*" element={<Admin />} />
    // </Routes>


    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="cart" element={<Cart />} />
       {/* user */}
      <Route path="payment" element={<Payment />} />
      <Route path="my-account/*" element={<CustomerAccount />} />
      {/* admin */}
      <Route path="admin/*" element={<Admin />} />

      {/* Routing customer account */}
      <Route element={<PrivateRoute roles={["USER", "ADMIN"]} />}>
        <Route path="payment" element={<Payment />} />
        <Route path="my-account/*" element={<CustomerAccount />} />
      </Route>


      <Route path="product-detail/:id" element={<ProductDetail />} />
      <Route path="product-category/:id" element={<FilterProduct />} />
    </Routes>
  );
}

export default ConfigRoute;
