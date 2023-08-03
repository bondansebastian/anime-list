import { createContext } from "react";
import Media from "../types/Media";

type AnimeContextType = {
    animes: Array<Media>,
    setAnimes: Function,
    getAnime(id: number|undefined): Media|undefined,
}

const AnimeContext = createContext<AnimeContextType>({} as AnimeContextType);

export default AnimeContext;