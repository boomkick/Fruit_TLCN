import Home from "./pages/Home";
import CustomerAccount from "./pages/CustomerAccount";
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin";
import { Route, Routes } from "react-router-dom";


function ConfigRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Routing customer account */}
      {/* <Route element={<PrivateRoute roles={["USER",'ADMIN']} />}>
        <Route path="my-account/*" element={<CustomerAccount />} />
      </Route> */}
      <Route path="my-account/*" element={<CustomerAccount />} />
      <Route path="product-detail/*" element={<ProductDetail />} />
      <Route path="admin/*" element={<Admin />} />
    </Routes>
  );
}

export default ConfigRoute;
