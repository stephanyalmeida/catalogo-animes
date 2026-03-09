import { useState, useEffect, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAnimeSearch } from '../hooks/useAnimeSearch';

export function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isShowingSeason, setIsShowingSeason] = useState(true); 
  const { animes, loading, error, searchAnimes, getSeasonAnimes } = useAnimeSearch();

  useEffect(() => {
    getSeasonAnimes();
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      getSeasonAnimes();
      setIsShowingSeason(true);
    } else {
      searchAnimes(searchTerm);
      setIsShowingSeason(false); 
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Catálogo de Animes 🌸</h1>
        <div style={{ marginBottom: '20px' }}>
          <Link to="/minhas-listas" style={{ color: '#fff', background: '#e91e63', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            📋 Ver as Minhas Listas
          </Link>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Digite o nome do anime..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>
      </header>

      {error && <p className="error-message">{error}</p>}

      <main>
        {!loading && animes.length > 0 && (
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#e0e0e0' }}>
            {isShowingSeason ? '🔥 Top Animes da Temporada' : `🔍 Resultados da busca`}
          </h2>
        )}

        {loading && <h3 style={{ textAlign: 'center' }}>Carregando... ⏳</h3>}

        <div className="anime-grid">
          {animes.map((anime) => (
            <Link 
              to={`/anime/${anime.mal_id}`} 
              key={anime.mal_id} 
              style={{ textDecoration: 'none' }}
            >
              <div className="anime-card">
                <img 
                  src={anime.images.jpg.image_url} 
                  alt={`Capa do anime ${anime.title}`} 
                />
                <h3>{anime.title}</h3>
                <div className="anime-info">
                  <span>⭐ Nota: {anime.score || 'N/A'}</span>
                  <span>📺 Eps: {anime.episodes || 'N/A'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}