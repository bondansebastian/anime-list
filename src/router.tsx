import { createBrowserRouter } from "react-router-dom";
import Home from "./modules/Home/Home";
import AnimeDetail from "./modules/AnimeDetail/AnimeDetail";

export default createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/anime-detail",
        element: <AnimeDetail />,
    },
]);