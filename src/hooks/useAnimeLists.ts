import { useState, useEffect } from 'react';
import type { Anime } from '../types/anime.types';

export interface AnimeLists {
  assistidos: Anime[];
  favoritos: Anime[];
  queroVer: Anime[];
}

export function useAnimeLists() {
  const [lists, setLists] = useState<AnimeLists>(() => {
    const savedLists = localStorage.getItem('@catalogoAnimes');
    return savedLists ? JSON.parse(savedLists) : { assistidos: [], favoritos: [], queroVer: [] };
  });

  useEffect(() => {
    localStorage.setItem('@catalogoAnimes', JSON.stringify(lists));
  }, [lists]);

  const toggleAnime = (anime: Anime, listType: keyof AnimeLists) => {
    setLists(prev => {
      const isAlreadyInList = prev[listType].some(item => item.mal_id === anime.mal_id);
      
      if (isAlreadyInList) {
        return { ...prev, [listType]: prev[listType].filter(item => item.mal_id !== anime.mal_id) };
      } else {
        return { ...prev, [listType]: [...prev[listType], anime] };
      }
    });
  };

  const isInList = (animeId: number, listType: keyof AnimeLists) => {
    return lists[listType].some(item => item.mal_id === animeId);
  };

  return { lists, toggleAnime, isInList };
}