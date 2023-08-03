import React, { useState } from 'react';
import Media from '../types/Media';
import AnimeContext from '../contexts/AnimeContext';

export default function AnimeProvider({ children }: any)
{
    const [animes, setAnimes] = useState<Media[]>([]);
    const getAnime = (id: number|undefined): Media|undefined => animes.find(anime => anime.id === id)
    return (
        <AnimeContext.Provider value={{ animes, setAnimes, getAnime }}>
            {children}
        </AnimeContext.Provider>
    )
}