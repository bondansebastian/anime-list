import { createBrowserRouter } from "react-router-dom";
import AnimeDetail from "./modules/AnimeDetail/AnimeDetail";
import AnimeList from "./modules/AnimeList/AnimeList";
import CollectionList from "./modules/CollectionList/CollectionList";
import CollectionDetail from "./modules/CollectionDetail/CollectionDetail";

export default createBrowserRouter([
    {
        path: "/",
        element: <AnimeList />,
    },
    {
        path: "/anime-detail/:id",
        element: <AnimeDetail />,
    },
    {
        path: "/collection-list",
        element: <CollectionList />,
    },
    {
        path: "/collection-detail/:name",
        element: <CollectionDetail />,
    },
]);