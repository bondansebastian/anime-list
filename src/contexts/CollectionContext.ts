import { createContext } from "react";
import Media from "../types/Media";
import Collection from "../types/Collection";

type CollectionContextType = {
    collections: Array<Collection>;
    setCollections(collections: Array<Collection>): void;
    addCollection(name: string, animes?: Array<Media>): void;
    removeCollection(name: string): void;
    validateCollection(name: string): boolean;
    addAnime(collection: Collection, anime: Media): void;
    hasAnime(collection: Collection, anime: Media): boolean;
}

const CollectionContext = createContext<CollectionContextType>({} as CollectionContextType);

export default CollectionContext;