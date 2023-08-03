import React, { useEffect, useState } from 'react';
import Media from '../types/Media';
import Collection from '../types/Collection';
import CollectionContext from '../contexts/CollectionContext';

export default function CollectionProvider({ children }: any)
{
    const [collections, setCollections] = useState<Collection[]>([]);
    const [firstLoad, setFirstLoad] = useState(true);

    const addCollection = (name: string, animes: Array<Media> = []) => {
        setCollections([
            { name, animes },
            ...collections,
        ])
    }

    const removeCollection = (name: string) => {
        setCollections(collections.filter(item => item.name !== name))
    }

    const validateCollection = (name: string) => {
        return collections.find(item => item.name === name) === undefined
    }

    const addAnime = (collection: Collection, anime: Media) => {
        removeCollection(collection.name)
        addCollection(collection.name, [ ...collection.animes, anime ])
    }

    const removeAnime = (collection: Collection, anime: Media) => {
        let mutated = [ ...collections ];
        const index = mutated.findIndex(item => item.name === collection.name);
        mutated[index].animes = mutated[index].animes.filter(item => item.id !== anime.id);
        setCollections(mutated);
    }

    const hasAnime = (collection: Collection, anime: Media) => {
        return collection.animes.find(item => item.id === anime.id) !== undefined;
    }

    const storageKey = 'collection';

    // Load collections from local storage
    useEffect(() => {
        const serialized = localStorage.getItem(storageKey);
        if (serialized !== null) setCollections(JSON.parse(serialized));
        setFirstLoad(false);
    }, [])

    // Update local storage collections
    useEffect(() => {
        if (firstLoad) return;
        const serialized = JSON.stringify(collections);
        localStorage.setItem(storageKey, serialized);
    }, [collections, firstLoad])

    return (
        <CollectionContext.Provider value={{ 
            collections,
            setCollections,
            addCollection,
            removeCollection,
            validateCollection,
            addAnime,
            removeAnime,
            hasAnime,
        }}>
            {children}
        </CollectionContext.Provider>
    )
}