import './home.css';
import SearchBox from './SearchBox';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; 

function HomePage() {
  const navigate = useNavigate();

  const shopping = () => {
    navigate('/sales'); 
  };

  return (
    <div className="header-container">

      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>


      <h1 className="app-title">YPH Store</h1>

 
      <div className="search-container">
        <SearchBox />
        
        <button className="cart-button" onClick={shopping}>
          <FaShoppingCart size={20} />
        </button>
      </div>
      

    
    </div>
  );
}

export default HomePage;
