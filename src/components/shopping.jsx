import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ShoppingList.css';

function ShoppingList() {
  const [compras, setCompras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await axios.get(`http://localhost:5197/api/sales`);
        setCompras(response.data);
      } catch (err) {
        console.log(`Error al obtener los productos: ${err}`);
      }
    };

    fetchCompras();
  }, []);

  if (!compras || compras.length === 0) {
    return <p>No hay artículos en la lista de compras.</p>;
  }

  return (
    <div className="shopping-list-container">
     
      <h1 className="shopping-title">Compras</h1>

      
      

      
      <div className="shopping-list">
        {compras.map((item) => (
          <div key={item.compraId} className="shopping-item">
            <img
              src={item.productDetails.thumbnail}
              alt={item.productDetails.title}
              className="product-thumbnail"
            />
            <div className="product-info">
              <h3 className="product-title">{item.productDetails.title}</h3>
              <p className="product-description">{item.productDetails.description}</p>
              <p className="product-price">Precio: ${item.productDetails.price}</p>
              <p className="purchase-date">Fecha de compra: {new Date(item.fechaCompra).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="home-button" onClick={() => navigate('/')}>
        Salir
      </button>
    </div>
  );
}

export default ShoppingList;
