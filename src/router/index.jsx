import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home.tsx";
import Cart from "../components/Cart/Cart";
import Admin from "../views/Admin";
import SignUp from "../views/SignUp/SignUp";
import SignIn from "../views/SignIn/SignIn";

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
]);
