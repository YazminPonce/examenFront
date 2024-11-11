import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SearchBox() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      
      navigate(`/items/search/${search}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-lg rounded-pill">Buscar</button>

      </form>
    </div>
  );
}

export default SearchBox;
