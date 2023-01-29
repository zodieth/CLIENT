import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home.tsx";
import Cart from "../components/Cart/Cart";
import Admin from "../views/Admin";
import SignUp from "../views/SignUp/SignUp";
import SignIn from "../views/SignIn/SignIn";
import productAdmin from "../components/Admin/Products/products"
import CategoryAdmin from "../components/Admin/Categories/category"

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
    path: "/Admin/products",
    element: <Admin children={<productAdmin/>} />,
  },
  {
    path: "/Admin/categories",
    element: <Admin children={<CategoryAdmin/>} />,
  },
]);
