import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import * as ActionTypes from "../features/ActionTypes";
import { RootState } from "./store";
import axios from "axios";

export const postClaim = (value: any) => {
  axios.post("https://henry-pf-back.up.railway.app/claims", value);
  return {
    type: ActionTypes.POST_CLAIM,
    payload: value,
  };
};

export const updateUser = (value: any) => {
  return {
    type: ActionTypes.USER_UPDATE,
    payload: value,
  };
};

export const putUser =
  (user: any, id: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    return axios
      .put("https://henry-pf-back.up.railway.app/users/" + id, user)
      .then(
        (response) => {
          if (response.status) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => {
        dispatch(updateUser(response.data));
      });
  };

export const getUser = (value: any) => {
  return {
    type: ActionTypes.GET_USER,
    payload: value,
  };
};

export const searchUserByEmail = (value: any) => async (dispatch: any) => {
  const user = await axios.get(
    `https://henry-pf-back.up.railway.app/useremail/${value}`
  );

  dispatch(getUser(user.data));
};

export const createProduct = (value: any) => {
  axios.post("https://henry-pf-back.up.railway.app/products", value);
  return {
    type: ActionTypes.CREATE_PRODUCT,
    payload: value,
  };
};

export const footerEmail = (value: any) => {
  axios.post("https://henry-pf-back.up.railway.app/emails", value);
  return {
    type: ActionTypes.FOOTER_EMAIL,
    payload: value,
  };
};

export const sendProducts = (value: any) => {
  axios.post("https://henry-pf-back.up.railway.app/sale", value);

  return {
    type: ActionTypes.CREATE_PRODUCT,
    payload: value,
  };
};

export const addToCart = (value: any) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: value,
  };
};

export const addCountCart = (productName: string) => {
  return {
    type: ActionTypes.ADD_COUNT,
    payload: { productName },
  };
};

export const removeCountCart = (productName: string, count: number) => {
  return {
    type: ActionTypes.REMOVE_COUNT,
    payload: { productName, count },
  };
};

export const deleteFromCart = (value: any) => {
  return {
    type: ActionTypes.DELETE_FROM_CART,
    payload: value,
  };
};

export const addProducts = (value: any) => {
  return {
    type: ActionTypes.PRODUCTS_ADD,
    payload: value,
  };
};

export const addProduct = (value: any) => {
  return {
    type: ActionTypes.PRODUCT_ADD,
    payload: value,
  };
};

export const productsLoading = () => ({
  type: ActionTypes.PRODUCT_LOADING,
});

export const productsFailed = (value: String) => ({
  type: ActionTypes.PRODUCT_FAILED,
  payload: value,
});

export const productsFilter = (
  value: String,
  // type: String,
  order: String,
  costMin: String,
  costMax: String,
  categorySearch: String,
  brand: String
) => {
  return {
    type: ActionTypes.PRODUCT_FILTER,
    payload: { value, order, costMin, costMax, categorySearch, brand },
  };
};

export const fetchProductsApi =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(productsLoading());

    return await axios
      .get("https://henry-pf-back.up.railway.app/products")
      .then(
        function (response) {
          if (response.status) return response;
          else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            throw error;
          }
        },
        function (error) {
          var errMess = new Error(error.message);
          throw errMess;
        }
      )
      .then((data) => dispatch(addProducts(data.data)));
  };

export const categoryBrands = (categorySearch: String, brand: String) => {
  return {
    type: ActionTypes.PRODUCT_FILTER,
    payload: { categorySearch, brand },
  };
};

//Marcas
export const addBrand = (value: any) => {
  return {
    type: ActionTypes.BRAND_ADD,
    payload: value,
  };
};

export const brandLoading = () => ({
  type: ActionTypes.BRAND_LOADING,
});

export const brandFailed = (value: String) => ({
  type: ActionTypes.BRAND_FAILED,
  payload: value,
});

export const fetchBrandApi =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(brandLoading());

    return await axios
      .get("https://henry-pf-back.up.railway.app/brands")
      .then(
        function (response) {
          if (response.status) return response;
          else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            throw error;
          }
        },
        function (error) {
          var errMess = new Error(error.message);
          throw errMess;
        }
      )
      .then((data) => dispatch(addBrand(data.data)))
      .catch((error) => dispatch(brandFailed(error.message)));
  };

//Categorias

export const addCategories = (value: any) => {
  return {
    type: ActionTypes.CATEGORIES_ADD,
    payload: value,
  };
};

export const addCategory = (value: any) => {
  return {
    type: ActionTypes.CATEGORY_ADD,
    payload: value,
  };
};

export const categoryLoading = () => ({
  type: ActionTypes.CATEGORY_LOADING,
});

export const categoryFailed = (value: String) => ({
  type: ActionTypes.CATEGORY_FAILED,
  payload: value,
});

export const fetchCategoryApi =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(categoryLoading());

    return await axios
      .get("https://henry-pf-back.up.railway.app/category")
      .then(
        function (response) {
          if (response.status) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            throw error;
          }
        },
        function (error) {
          var errMess = new Error(error.message);
          throw errMess;
        }
      )
      .then((categories) => dispatch(addCategories(categories.data)))
      .catch((error) => dispatch(categoryFailed(error.message)));
  };

//MercadoPago

type Product = {
  name: String;
  price: Number;
  images: [String];
  count: number;
};

export const payMercadoPagoApi = (products: Product[]) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(
        "https://henry-pf-back.up.railway.app/api/pay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(products),
        }
      );

      if (!response.ok) {
        throw new Error("Error loading countries");
      }

      const data = await response.json();
      return data;

      // despacha una acción con la respuesta del servidor
      //dispatch({ type: 'PAYMENT_SUCCESS', payload: data });
    } catch (error) {
      // despacha una acción con el error
      //dispatch({ type: 'PAYMENT_ERROR', payload: error });
    }
  };
};

//Category admin

export const postCateogry =
  (
    name: string,
    description: string,
    father: any = null
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    dispatch(categoryLoading());

    if (father === "") father = null;

    const newCategory = {
      name: name,
      description: description,
      father: father,
    };

    return axios
      .post("https://henry-pf-back.up.railway.app/category", newCategory)
      .then((response) => {
        dispatch(addCategory(response.data));
      })
      .catch((error) => {
        console.log("Post activity", error.message);
        dispatch(categoryFailed(error.message));
      });
  };

export const deleteCategory = (value: any) => {
  return {
    type: ActionTypes.CATEGORY_DELETE,
    payload: value,
  };
};

export const deleteCateogry =
  (id: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    dispatch(categoryLoading());

    return axios
      .delete(`https://henry-pf-back.up.railway.app/${id}`, {})
      .then(
        (response) => {
          if (response.data) {
            dispatch(deleteCategory(id));
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .catch((error) => {
        console.log("Delete category", error.message);
        dispatch(categoryFailed(error.message));
      });
  };

export const updateCategory = (value: any) => {
  return {
    type: ActionTypes.CATEGORY_UPDATE,
    payload: value,
  };
};

export const putCateogry =
  (
    id: string,
    category: any
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    dispatch(categoryLoading());

    return axios
      .put("https://henry-pf-back.up.railway.app/category/" + id, category)
      .then(
        (response) => {
          if (response.status) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => {
        dispatch(updateCategory(response.data));
      })
      .catch((error) => {
        console.log("put category", error.message);
        dispatch(categoryFailed(error.message));
      });
  };

//Brand admin

export const postBrand =
  (name: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    dispatch(brandLoading());

    const newBrand = {
      name: name,
    };

    return fetch("https://henry-pf-back.up.railway.app/brands", {
      method: "POST",
      body: JSON.stringify(newBrand),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => response.json())
      .then((response) => {
        dispatch(addBrand(response));
      })
      .catch((error) => {
        console.log("Post brand", error.message);
        dispatch(brandFailed(error.message));
      });
  };

export const deleteBrand = (value: any) => {
  return {
    type: ActionTypes.BRAND_DELETE,
    payload: value,
  };
};

export const deleteBrandApi =
  (id: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    dispatch(brandLoading());

    return fetch(`https://henry-pf-back.up.railway.app/brands/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(
        (response) => {
          if (response.ok) {
            dispatch(deleteBrand(id));
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .catch((error) => {
        console.log("Delete brand", error.message);
        dispatch(brandFailed(error.message));
      });
  };

export const updateBrand = (value: any) => {
  return {
    type: ActionTypes.BRAND_UPDATE,
    payload: value,
  };
};

export const putBrand =
  (id: string, brand: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    dispatch(categoryLoading());

    return axios
      .put(`https://henry-pf-back.up.railway.app/brands/${id}`, brand)
      .then(
        (response) => {
          if (response.status) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => {
        dispatch(updateBrand(response.data));
      })
      .catch((error) => {
        console.log("Delete category", error.message);
        dispatch(categoryFailed(error.message));
      });
  };

//Product admin

export const postProduct =
  (newProduct: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    dispatch(productsLoading());

    return axios
      .post("https://henry-pf-back.up.railway.app/products", newProduct)
      .then((response) => {
        dispatch(addProduct(response.data));
      })
      .catch((error) => {
        console.log("Post activity", error.message);
        dispatch(productsFailed(error.message));
      });
  };

export const deleteProduct = (value: any) => {
  return {
    type: ActionTypes.CATEGORY_DELETE,
    payload: value,
  };
};

export const updateProduct = (value: any) => {
  return {
    type: ActionTypes.PRODUCT_UPDATE,
    payload: value,
  };
};

export const updateProducts = () => {
  return {
    type: "",
  };
};

export const putProduct =
  (
    id: string,
    product: any
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    dispatch(productsLoading());
    return axios
      .put("https://henry-pf-back.up.railway.app/product/" + id, product)
      .then(
        (response) => {
          if (response.status) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => {
        dispatch(updateProduct(response.data));
      })
      .catch((error) => {
        console.log("PUT product", error.message);
        dispatch(productsFailed(error.message));
      });
  };

// Questions

export const updateQuestion = (value: any) => {
  return {
    type: ActionTypes.QUESTION_UPDATE,
    payload: value,
  };
};

export const loadingQuestion = () => {
  return {
    type: ActionTypes.QUESTION_LOADING,
  };
};

export const failedQuestion = (value: any) => {
  return {
    type: ActionTypes.QUESTION_FAILED,
    payload: value,
  };
};

export const addQuestions = (value: any) => {
  return {
    type: ActionTypes.QUESTIONS_ADD,
    payload: value,
  };
};

export const addQuestion = (value: any) => {
  return {
    type: ActionTypes.QUESTION_ADD,
    payload: value,
  };
};

export const fetchQuestionsApi =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(categoryLoading());

    return await axios
      .get("https://henry-pf-back.up.railway.app/questions")
      .then(
        function (response) {
          if (response.status) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            throw error;
          }
        },
        function (error) {
          var errMess = new Error(error.message);
          throw errMess;
        }
      )
      .then((questions) => dispatch(addQuestions(questions.data)))
      .catch((error) => dispatch(categoryFailed(error.message)));
  };

export const postQuestion =
  (
    userMail: any,
    product: any,
    newQuestion: any
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    dispatch(loadingQuestion());

    return axios
      .post("https://henry-pf-back.up.railway.app/questions", {
        userMail,
        product,
        newQuestion,
      })
      .then((response) => {
        dispatch(addQuestion(response.data.question));
        dispatch(updateProduct(response.data.updatedProduct));
        return true;
      })
      .catch((error) => {
        console.log("Post question", error.message);
        dispatch(failedQuestion(error.message));
      });
  };

export const putQuestion =
  (
    id: string,
    question: any
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    return axios
      .put("https://henry-pf-back.up.railway.app/question/" + id, question)
      .then(
        (response) => {
          if (response.status) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => {
        dispatch(updateQuestion(response.data));
      })
      .catch((error) => {
        console.log("PUT question", error.message);
      });
  };

//Ventas

export const updateSale = (value: any) => {
  return {
    type: ActionTypes.SALE_UPDATE,
    payload: value,
  };
};

export const loadingSale = () => {
  return {
    type: ActionTypes.SALE_LOADING,
  };
};

export const failedSale = (value: any) => {
  return {
    type: ActionTypes.SALE_FAILED,
    payload: value,
  };
};

export const addSales = (value: any) => {
  return {
    type: ActionTypes.SALES_ADD,
    payload: value,
  };
};

export const addSale = (value: any) => {
  return {
    type: ActionTypes.SALE_ADD,
    payload: value,
  };
};

export const fetchSalesApi =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(loadingSale());

    return await axios
      .get("https://henry-pf-back.up.railway.app/sale")
      .then(
        function (response) {
          if (response.status) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            throw error;
          }
        },
        function (error) {
          var errMess = new Error(error.message);
          throw errMess;
        }
      )
      .then((sales) => dispatch(addSales(sales.data)))
      .catch((error) => dispatch(failedSale(error.message)));
  };

export const putSale =
  (id: string, sale: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    return axios
      .put("https://henry-pf-back.up.railway.app/sale/" + id, sale)
      .then(
        (response) => {
          if (response.status) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            throw error;
          }
        },
        (error) => {
          throw error;
        }
      )
      .then((response) => {
        dispatch(updateSale(response.data));
      })
      .catch((error) => {
        console.log("PUT sale", error.message);
      });
  };

//USERS

export const updatedUser = (value: any) => {
  return {
    type: ActionTypes.USER_UPDATE,
    payload: value,
  };
};

export const loadingUser = () => {
  return {
    type: ActionTypes.USER_LOADING,
  };
};

export const failedUser = (value: any) => {
  return {
    type: ActionTypes.USER_FAILED,
    payload: value,
  };
};

export const addUsers = (value: any) => {
  return {
    type: ActionTypes.USERS_ADD,
    payload: value,
  };
};

export const fetchUsersApi =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(loadingUser());

    return await axios
      .get("https://henry-pf-back.up.railway.app/users")
      .then(
        function (response) {
          if (response.status) {
            return response;
          } else {
            var error = new Error(
              "Error " + response.status + ": " + response.statusText
            );
            throw error;
          }
        },
        function (error) {
          var errMess = new Error(error.message);
          throw errMess;
        }
      )
      .then((questions) => dispatch(addUsers(questions.data)))
      .catch((error) => dispatch(failedUser(error.message)));
  };

//Valoracion

export const saveReview =
  (
    description: any,
    productoID: any,
    rating: any
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    return axios
      .post("https://henry-pf-back.up.railway.app/reviews", {
        description,
        productoID,
        rating,
      })
      .then((response) => {
        dispatch(updateProduct(response.data));
        return true;
      })
      .catch((error) => {
        console.log("Post question", error.message);
        dispatch(failedQuestion(error.message));
      });
  };
