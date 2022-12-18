import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter } from "react-router-dom";
import ConfigRoute from "./ConfigRoute";
import './app/style/App.scss'
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from './apis/axiosClient';
import { loginSuccess, logoutSuccess } from './slices/authSlice';

function App() {
  // Lấy thông tin user
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  if (user) {
    axiosInstance(user, dispatch, loginSuccess, logoutSuccess);
  }
  const isAdmin = window.location.href.includes("admin");

  return (
    <div className="App">
      <BrowserRouter>
        
        
          {isAdmin ? null : <Header />}
          <ConfigRoute />
          {isAdmin ? null : <Footer />}

        
      </BrowserRouter>
    </div>
  );
}

export default App;
