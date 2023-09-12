import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../components/Home/Home";
import Media from "../components/Media/Media";
import MediaDetails from "../components/Media/MediaDetails/MediaDetails";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import About from "../components/About/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/media",
        element: <Media></Media>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/details/:id",
        element: <MediaDetails></MediaDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/postDetails/${params.id}`),
      },
    ],
  },
]);
