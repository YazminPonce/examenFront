import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import SearchBox from './SearchBox';
import './ResultsList.css';
import logo from '../assets/logo.png'; 

function ResultsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { search } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      try {
        const response = await axios.get(`http://localhost:5197/api/Products?q=${search}`);
        setProducts(response.data);
      } catch (err) {
        console.log(`Error al obtener los productos: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    if (search) {
      fetchProducts();
    }
  }, [search]);

  if (loading) return <div className="text-center my-5">Cargando...</div>;
  

  const handleProductClick = (productId) => {
    navigate(`/items/detail/${productId}`);
  };

  return (
    <div className="container mt-4">

      <div className="header-bar mb-4">
        <a href="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
        </a>
        <SearchBox />
      </div>
      
      <h5 className="text-center">Resultados de la búsqueda de <strong>{search}</strong>: {products.length}</h5>
      <div className="list-group">
        {products.map((product) => (
          <div
            key={product.id}
            className="list-group-item d-flex align-items-start justify-content-center product-item"
            onClick={() => handleProductClick(product.id)}
          >
            <img
              src={product.thumbnail}
              alt={product.name}
              className="product-image rounded-circle me-3"
            />
            <div className="product-details">
              <h5 className="product-title">{product.title} <small className="text-muted">{product.category}</small></h5>
              <p className="product-description">{product.description}</p>  
              <p className="product-price"><strong>${product.price}</strong></p>
              <div className="product-rating text-warning">
                {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsList;
