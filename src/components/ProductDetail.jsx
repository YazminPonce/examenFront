import { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import SearchBox from './SearchBox';
import logo from '../assets/logo.png' 
import './ProductDetail.css';
import Swal from 'sweetalert2';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);


  const handleCompraClick = (productId) => {
    const fetchCompra= async () => {
      
      try {
        const saleRequest = {
          ProductoId: parseInt(productId), 
        };
        const response = await axios.post('http://localhost:5197/api/addSale', saleRequest);
     
      if (response.data === true) {
        Swal.fire({
          title: 'Compra exitosa',
          text: 'Tu compra ha sido registrada con éxito.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        navigate(`/sales`);
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al registrar tu compra.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      
      }
    } catch (error) {
      console.error('Error al registrar la compra:', error);

    }
  };
    fetchCompra();
  };
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
     
      try {
        const response = await axios.get(`http://localhost:5197/api/Products/${id}`);
        setProduct(response.data);  
      } catch (err) {
        console.log(`Error al obtener el producto: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center my-5">Cargando...</div>;

  if (!product) return null; 

  return (
    <div className="container mt-4 text-center">
    
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="Logo"
          className="logo mb-2"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
        <SearchBox />
      </div>

      <div className="d-flex justify-content-center mb-3">
      <img
              src={product.thumbnail}
              alt={product.name}
              className="rounded-circle me-3"
              style={{ width: '10%', height: '100%', objectFit: 'cover' }} 
            />
      </div>

      <h2 className="product-name">{product.title}</h2>
      <p className="text-muted">{product.category}</p>
      <p className="product-descriptionn">{product.description}</p>
      <p className="product-price"><strong>${product.price}</strong></p>

      
      <div className="text-warning mb-3">
        {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
      </div>

      
      <button className="btn btn-outline-dark btn-lg" onClick={() => handleCompraClick(product.id)}>Comprar</button>
      
    </div>
  );
}



export default ProductDetail;
