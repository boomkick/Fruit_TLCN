import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, } from "react-router-dom";
import ConfigRoute from "./ConfigRoute";
import './app/style/App.scss'
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from './apis/axiosClient';
import { loginSuccess, logoutSuccess } from './slices/authSlice';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollUp from './components/ScrollUp';

function App() {
  // Lấy thông tin user
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  if (user) {
    axiosInstance(user, dispatch, loginSuccess, logoutSuccess);
  }
  const isAdmin = window.location.href.includes("admin");
  const isEmployee = window.location.href.includes("employee");

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollUp>
          <ToastContainer />
          {isAdmin || isEmployee ? null : <Header />}
          <ConfigRoute />
          {isAdmin || isEmployee ? null : <Footer />}
        </ScrollUp>
      </BrowserRouter>
    </div>
  );
}

export default App;
