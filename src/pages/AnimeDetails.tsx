import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Anime } from '../types/anime.types';
import { useAnimeLists } from '../hooks/useAnimeLists';

export function AnimeDetails() {
  const { id } = useParams();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const { toggleAnime, isInList } = useAnimeLists();
  
  const [sinopsePtBr, setSinopsePtBr] = useState<string>('');
  const [traduzindo, setTraduzindo] = useState(false);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
      .then((res) => res.json())
      .then(async (data) => {
        const animeData = data.data;
        setAnime(animeData);
        setLoading(false);

          if (animeData.synopsis) {
            setTraduzindo(true);
            try {
              const urlTraducao = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(animeData.synopsis)}`;
              const resTraducao = await fetch(urlTraducao);
              const dataTraducao = await resTraducao.json();

              const textoTraduzido = dataTraducao[0].map((linha: any[]) => linha[0]).join('');
              
              setSinopsePtBr(textoTraduzido);
            } catch (error) {
              console.error("Erro ao traduzir:", error);
              setSinopsePtBr(animeData.synopsis); 
            } finally {
              setTraduzindo(false);
            }
          }
      });
  }, [id]);

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Carregando detalhes... 🌸</h2>;
  if (!anime) return <h2 style={{ textAlign: 'center' }}>Anime não encontrado!</h2>;

  return (
    <div className="container">
      <Link to="/" style={{ color: '#646cff', textDecoration: 'none', fontWeight: 'bold' }}>
        ⬅ Voltar para a busca
      </Link>
      
      <div className="details-content">
        <img 
           className="details-image"
           src={anime.images.jpg.large_image_url} 
           alt={`Capa do anime ${anime.title}`} 
        />
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ marginTop: '0' }}>{anime.title}</h1>
          <p><strong>⭐ Nota:</strong> {anime.score}</p>
          <p><strong>📺 Episódios:</strong> {anime.episodes}</p>

          <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
            <button 
              onClick={() => toggleAnime(anime, 'assistidos')}
              style={{ background: isInList(anime.mal_id, 'assistidos') ? '#4caf50' : '#ddd', color: isInList(anime.mal_id, 'assistidos') ? '#fff' : '#333', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {isInList(anime.mal_id, 'assistidos') ? '✅ Assistido' : '👁️ Marcar como Assistido'}
            </button>

            <button 
              onClick={() => toggleAnime(anime, 'favoritos')}
              style={{ background: isInList(anime.mal_id, 'favoritos') ? '#f44336' : '#ddd', color: isInList(anime.mal_id, 'favoritos') ? '#fff' : '#333', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {isInList(anime.mal_id, 'favoritos') ? '❤️ Favorito' : '🤍 Favoritar'}
            </button>

            <button 
              onClick={() => toggleAnime(anime, 'queroVer')}
              style={{ background: isInList(anime.mal_id, 'queroVer') ? '#2196f3' : '#ddd', color: isInList(anime.mal_id, 'queroVer') ? '#fff' : '#333', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {isInList(anime.mal_id, 'queroVer') ? '⏳ Na Lista' : '➕ Quero Ver'}
            </button>
          </div>
          
          <p>
            <strong>📖 Sinopse: </strong> 
            {traduzindo ? (
              <span style={{ color: '#888', fontStyle: 'italic' }}>Traduzindo para português... ⏳</span>
            ) : (
              sinopsePtBr || 'Nenhuma sinopse disponível para este anime.'
            )}
          </p>
          
        </div>
      </div>
    </div>
  );
}