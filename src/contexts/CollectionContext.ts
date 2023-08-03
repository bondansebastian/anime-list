import { createContext } from "react";
import Media from "../types/Media";
import Collection from "../types/Collection";

type CollectionContextType = {
    collections: Array<Collection>;
    addCollection(name: string, animes: Array<Media>): void;
    removeCollection(name: string): void;
    validateCollection(name: string): boolean;
    addAnime(collection: Collection, anime: Media): void;
}

const CollectionContext = createContext<CollectionContextType>({} as CollectionContextType);

export default CollectionContext;