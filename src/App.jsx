import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter, } from "react-router-dom";
import ConfigRoute from "./ConfigRoute";
import './app/style/App.scss'
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance, axiosInstanceFile } from './apis/axiosClient';
import { loginSuccess, logoutSuccess } from './slices/authSlice';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollUp from './components/ScrollUp';

function App() {
  // Lấy thông tin user
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  if (user) {
    axiosInstance(user, dispatch, loginSuccess, logoutSuccess);
    axiosInstanceFile(user, dispatch, loginSuccess, logoutSuccess);
  }
  

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollUp>
          <ToastContainer />
          <Header />
          <ConfigRoute />
          <Footer />
        </ScrollUp>
      </BrowserRouter>
    </div>
  );
}

export default App;
