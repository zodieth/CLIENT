import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home.tsx";
import Cart from "../components/Cart/Cart";
import User from "../views/USER/User";
import Admin from "../views/Admin";
import SignUp from "../views/SignUp/SignUp";
import SignIn from "../views/SignIn/SignIn";
import CreateCategoryAdmin from "../components/Admin/Categories/createCategory";
import CategoriesAdmin from "../components/Admin/Categories/categories";
import EditCategoryAdmin from "../components/Admin/Categories/editCategory";
import ArmaPC from "../views/ArmaPC/ArmaPC";
import CreateProductAdmin from "../components/Admin/Products/createProduct";
import Detail from "../views/Detail/Detail";
import PostLogin from "../views/PostLogin/PostLogin";
import PostSignUp from "../views/PostSignUp/PostSignUp";
import CreateBrandAdmin from "../components/Admin/Brands/createBrand";
import BrandsAdmin from "../components/Admin/Brands/brands";
import EditBrandAdmin from "../components/Admin/Brands/editBrand";
import ProductsAdmin from "../components/Admin/Products/products";
import EditProductAdmin from "../components/Admin/Products/editProduct";
import PreguntasFrecuentes from "../views/PreguntasFrecuentes/PreguntasFrecuentes";
import ComoComprar from "../views/ComoComprar/ComoComprar";
import EditUser from "../views/USER/EditUser";
import QuestionsAdmin from "../components/Admin/Questions/questions";
import AllQuestionsAdmin from "../components/Admin/Questions/allQuestions";
import ResetPassword from "../views/SignIn/ResetPassword";
import Reclamos from "../views/USER/Reclamos";
import SalesAdmin from "../components/Admin/Sales/sales";
import GraphicsAdmin from "../components/Admin/Graphics/graphics";
import UsersAdmin from "../components/Admin/Users/users";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    exact: true,
  },
  {
    path: "/cart",
    element: <Cart />,
    exact: true,
  },
  {
    path: "/user",
    element: <User />,
    exact: true,
  },
  {
    path: "/user/perfil",
    element: <User children={<EditUser />} />,
    exact: true,
  },
  {
    path: "/user/reclamos",
    element: <User children={<Reclamos />} />,
    exact: true,
  },
  {
    path: "/admin",
    element: <Admin children={<GraphicsAdmin/>}/>,
    exact: true,
  },
  {
    path: "/signup",
    element: <SignUp />,
    exact: true,
  },
  {
    path: "/signin",
    element: <SignIn />,
    exact: true,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
    exact: true,
  },
  {
    path: "/postlogin",
    element: <PostLogin />,
    exact: true,
  },
  {
    path: "/postsignup",
    element: <PostSignUp />,
    exact: true,
  },
  {
    path: "/armatupc",
    element: <ArmaPC />,
  },
  {
    path: "/user/purchases",
    element: <Admin children={<ProductsAdmin />} />,
    exact: true,
  },
  {
    path: "/user/claims",
    element: <Admin children={<CategoriesAdmin />} />,
    exact: true,
  },
  {
    path: "/Admin/products",
    element: <Admin children={<ProductsAdmin />} />,
    exact: true,
  },
  {
    path: "/Admin/products/create",
    element: <Admin children={<CreateProductAdmin />} />,
    exact: true,
  },
  {
    path: "/Admin/products/edit/:id",
    element: <Admin children={<EditProductAdmin />} />,
    exact: true,
  },
  {
    path: "/Admin/categories",
    element: <Admin children={<CategoriesAdmin />} />,
    exact: true,
  },
  {
    path: "/Admin/categories/create",
    element: <Admin children={<CreateCategoryAdmin />} />,
    exact: true,
  },
  {
    path: "/Admin/categories/edit/:id",
    element: <Admin children={<EditCategoryAdmin />} />,
    exact: true,
  },
  {
    path: "/productos/:name",
    element: <Detail />,
  },
  {
    path: "/Admin/brands",
    element: <Admin children={<BrandsAdmin />} />,
    exact: true,
  },
  {
    path: "/Admin/brands/create",
    element: <Admin children={<CreateBrandAdmin />} />,
    exact: true,
  },
  {
    path: "/Admin/brands/edit/:id",
    element: <Admin children={<EditBrandAdmin />} />,
    exact: true,
  },
  {
    path: "/preguntas",
    element: <PreguntasFrecuentes />,
    exact: true,
  },
  {
    path: "/comocomprar",
    element: <ComoComprar />,
    exact: true,
  },
  {
    path: "/Admin/questions",
    element: <Admin children={<QuestionsAdmin />} />,
    exact: true,
  },
  {
    path: "/Admin/allQuestions",
    element: <Admin children={<AllQuestionsAdmin />} />,
    exact: true,
  },
  {
    path: "/Admin/sales",
    element: <Admin children={<SalesAdmin />} />,
    exact: true,
  },
  {
    path: "/Admin/users",
    element: <Admin children={<UsersAdmin />} />,
    exact: true,
  },
]);
