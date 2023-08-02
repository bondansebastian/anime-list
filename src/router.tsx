import { createBrowserRouter } from "react-router-dom";
import AnimeDetail from "./modules/AnimeDetail/AnimeDetail";
import AnimeList from "./modules/AnimeList/AnimeList";

export default createBrowserRouter([
    {
        path: "/",
        element: <AnimeList />,
    },
    {
        path: "/anime-detail/:id",
        element: <AnimeDetail />,
    },
]);