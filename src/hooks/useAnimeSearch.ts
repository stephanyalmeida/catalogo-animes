import { useState } from 'react';
import type { Anime, JikanAnimeResponse } from '../types/anime.types';

export function useAnimeSearch() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchAnimes = async (query: string) => {
    if (!query) {
      setAnimes([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&sfw=true`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar os animes na API');
      }

      const result: JikanAnimeResponse = await response.json();
      setAnimes(result.data);
      
    } catch (err) {
      setError('Falha ao comunicar com a Jikan API.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSeasonAnimes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://api.jikan.moe/v4/seasons/now?sfw=true&limit=18');
      if (!response.ok) throw new Error('Erro ao buscar os animes da temporada');
      const result: JikanAnimeResponse = await response.json();
      setAnimes(result.data);
    } catch (err) {
      setError('Falha ao carregar os animes da temporada.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { animes, loading, error, searchAnimes, getSeasonAnimes };
}