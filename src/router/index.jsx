import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home.tsx";
import Cart from "../components/Cart/Cart";
import Admin from "../views/Admin";
import SignUp from "../views/SignUp/SignUp";
import SignIn from "../views/SignIn/SignIn";
import ArmaPC from "../views/ArmaPC/ArmaPC";
import productAdmin from "../components/Admin/Products/products";
import Detail from "../views/Detail/Detail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/armatupc",
    element: <ArmaPC />,
  },
  {
    path: "/Admin/products",
    element: <Admin children={productAdmin()} />,
  },
  {
    path: "/productos/:name",
    element: <Detail />,
  },
]);
