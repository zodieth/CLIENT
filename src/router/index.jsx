import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home.tsx";
import Cart from "../components/Cart/Cart";
import Admin from "../views/Admin";
import SignUp from "../views/SignUp/SignUp";
import SignIn from "../views/SignIn/SignIn";
import CategoryAdmin from "../components/Admin/Categories/createCategory"
import CategoriesAdmin from "../components/Admin/Categories/categories"
import EditCategoryAdmin from "../components/Admin/Categories/editCategory"
import ArmaPC from "../views/ArmaPC/ArmaPC";
import productAdmin from "../components/Admin/Products/products";
import Detail from "../views/Detail/Detail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    exact: true
  },
  {
    path: "/cart",
    element: <Cart />,
    exact: true
  },
  {
    path: "/admin",
    element: <Admin />,
    exact: true
  },
  {
    path: "/signup",
    element: <SignUp />,
    exact: true
  },
  {
    path: "/signin",
    element: <SignIn />,
    exact: true
  },
  {
    path: "/armatupc",
    element: <ArmaPC />,
  },
  {
    path: "/Admin/products",
    element: <Admin children={<productAdmin/>} />,
    exact: true
  },
  {
    path: "/Admin/categories",
    element: <Admin children={<CategoriesAdmin/>} />,
    exact: true
  },
  {
    path: "/Admin/categories/create",
    element: <Admin children={<CategoryAdmin/>} />,
    exact: true
  },
  {
    path: "/Admin/categories/edit/:id",
    element: <Admin children={<EditCategoryAdmin />} />,
    exact: true
  },
  {
    path: "/productos/:name",
    element: <Detail />,
  },
]);
