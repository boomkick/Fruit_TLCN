import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter } from "react-router-dom";
import ConfigRoute from "./ConfigRoute";
import './app/style/App.scss'

function App() {
  const isAdmin = true;
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
