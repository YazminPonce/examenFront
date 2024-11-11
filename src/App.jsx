// src/App.jsx
import { BrowserRouter,  Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import NotFoundPage from './components/NotFoundPage';
import HomePage from './components/homePage.jsx';

import ResultsList from './components/ResultsList';
import ProductDetail from './components/ProductDetail';
import Shopping from './components/shopping';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/items/search/:search" element={<ResultsList />} />
        <Route path="/items/detail/:id" element={<ProductDetail />} />
        <Route path="/sales" element={<Shopping />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
