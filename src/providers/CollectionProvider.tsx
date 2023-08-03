import React, { useEffect, useState } from 'react';
import Media from '../types/Media';
import Collection from '../types/Collection';
import CollectionContext from '../contexts/CollectionContext';

export default function CollectionProvider({ children }: any)
{
    const [collections, setCollections] = useState<Collection[]>([]);

    const addCollection = (name: string, animes: Array<Media>) => {
        setCollections([
            ...collections,
            { name, animes, coverImage: animes[0]?.coverImage.large }
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

    const storageKey = 'collection';

    // Load collections from local storage
    useEffect(() => {
        const serialized = localStorage.getItem(storageKey);
        if (serialized !== null) setCollections(JSON.parse(serialized));
    }, [])

    // Update local storage collections
    useEffect(() => {
        const serialized = JSON.stringify(collections);
        localStorage.setItem(storageKey, serialized);
    }, [collections])

    return (
        <CollectionContext.Provider value={{ 
            collections,
            addCollection,
            removeCollection,
            validateCollection,
            addAnime
        }}>
            {children}
        </CollectionContext.Provider>
    )
}