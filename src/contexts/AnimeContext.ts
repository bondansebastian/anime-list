import { createContext } from "react";
import Media from "../types/Media";
import PageInfo from "../types/PageInfo";

type AnimeContextType = {
    animes: Array<Media>,
    pageInfo: PageInfo,
    setAnimes: Function,
    getAnime(id: number|string|undefined): Media|undefined,
    setPageInfo: Function,
}

const AnimeContext = createContext<AnimeContextType>({} as AnimeContextType);

export default AnimeContext;