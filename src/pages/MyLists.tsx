import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAnimeLists } from '../hooks/useAnimeLists';

export function MyLists() {
  const { lists } = useAnimeLists();
  
  const [abaAtiva, setAbaAtiva] = useState<'favoritos' | 'assistidos' | 'queroVer'>('favoritos');

  const renderList = (animeList: any[], emptyMessage: string) => {
    
    const listaOrdenada = [...animeList].sort((a, b) => a.title.localeCompare(b.title));

    return (
      <div style={{ marginBottom: '40px' }}>
        {listaOrdenada.length === 0 ? (
          <p style={{ color: '#888', fontStyle: 'italic', textAlign: 'center', marginTop: '40px' }}>
            {emptyMessage}
          </p>
        ) : (
          <div className="anime-grid">
            {listaOrdenada.map((anime) => (
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
        )}
      </div>
    );
  };

  const tabStyle = (isActive: boolean) => ({
    padding: '12px 24px',
    cursor: 'pointer',
    background: isActive ? '#646cff' : '#333',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'background 0.3s',
  });

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <Link to="/" style={{ color: '#646cff', textDecoration: 'none', fontWeight: 'bold' }}>
          ⬅ Voltar para a busca
        </Link>
        <h1 style={{ margin: 0 }}>Minhas Listas 📋</h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <div className="tabs-container" style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '40px' }}>
        <button 
          style={tabStyle(abaAtiva === 'favoritos')} 
          onClick={() => setAbaAtiva('favoritos')}
        >
          ❤️ Favoritos
        </button>
        <button 
          style={tabStyle(abaAtiva === 'assistidos')} 
          onClick={() => setAbaAtiva('assistidos')}
        >
          ✅ Assistidos
        </button>
        <button 
          style={tabStyle(abaAtiva === 'queroVer')} 
          onClick={() => setAbaAtiva('queroVer')}
        >
          ⏳ Quero Ver
        </button>
      </div>

      {abaAtiva === 'favoritos' && renderList(lists.favoritos, 'Você ainda não adicionou nenhum anime aos favoritos.')}
      {abaAtiva === 'assistidos' && renderList(lists.assistidos, 'Você ainda não marcou nenhum anime como assistido.')}
      {abaAtiva === 'queroVer' && renderList(lists.queroVer, 'Sua lista de animes para ver está vazia.')}
    </div>
  );
}