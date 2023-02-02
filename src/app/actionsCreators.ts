import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import * as ActionTypes from "../features/ActionTypes";
import { RootState } from "./store";

export const createProduct = (value: any) => {
  fetch("http://localhost:3001/products", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(value),
  });

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
  console.log(count);
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
  type: String,
  order: String,
  costMin: String,
  costMax: String,
  categorySearch: String,
  brand: String
) => {
  return {
    type: ActionTypes.PRODUCT_FILTER,
    payload: { value, type, order, costMin, costMax, categorySearch, brand },
  };
};

export const fetchProductsApi =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(productsLoading());

    return await fetch("http://localhost:3001/products")
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
          var errMess = new Error(error.message);
          throw errMess;
        }
      )
      .then((response) => response.json())
      .then((products) => {
        dispatch(addProducts(products));
      })
      .catch((error) => dispatch(productsFailed(error.message)));
  };

export const categoryBrands = (categorySearch: String, brand: String) => {
  return {
    type: ActionTypes.PRODUCT_FILTER,
    payload: { categorySearch, brand },
  };
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

    return await fetch("http://localhost:3001/category")
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
          var errMess = new Error(error.message);
          throw errMess;
        }
      )
      .then((response) => response.json())
      .then((categories) => {
        dispatch(addCategories(categories));
      })
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
      const response = await fetch("http://localhost:3001/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(products),
      });

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

    return fetch("http://localhost:3001/category", {
      method: "POST",
      body: JSON.stringify(newCategory),
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
        dispatch(addCategory(response));
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

  return fetch(`http://localhost:3001/category/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      dispatch(deleteCategory(id))
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      throw error;
    }
  }, error => {
      throw error;
  })
  .catch(error => { 
    console.log('Delete category', error.message); 
    dispatch(categoryFailed(error.message))
  });
}

export const updateCategory = (value: any) => {
  return {
    type: ActionTypes.CATEGORY_UPDATE,
    payload: value,
  };
};

export const putCateogry = (id:string, category:any): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch) => {
  dispatch(categoryLoading());
  
  return fetch('http://localhost:3001/category/'+id, {
    method: 'PUT',
    body: JSON.stringify(category),
    headers: {
        'Content-Type': 'application/json'
    }
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          throw error;
      }
  }, error => {
      throw error;
  })
  .then((response) => response.json())
  .then((response) => {
    dispatch(updateCategory(response));
  })
  .catch(error => { 
    console.log('Post activity', error.message); 
    dispatch(categoryFailed(error.message))
  });
}

//Brands

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

    return await fetch("http://localhost:3001/brands")
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
          var errMess = new Error(error.message);
          throw errMess;
        }
      )
      .then((response) => response.json())
      .then((brands) => {
        dispatch(addBrand(brands));
      })
      .catch((error) => dispatch(brandFailed(error.message)));
  };

export const postBrand =
  (
    name: string
  ): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch) => {
    dispatch(brandLoading());

    const newBrand = {
      name: name,
    };

    return fetch("http://localhost:3001/brands", {
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

  return fetch(`http://localhost:3001/brands/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      dispatch(deleteBrand(id))
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      throw error;
    }
  }, error => {
      throw error;
  })
  .catch(error => { 
    console.log('Delete brand', error.message); 
    dispatch(brandFailed(error.message))
  });
}

export const updateBrand = (value: any) => {
  return {
    type: ActionTypes.BRAND_UPDATE,
    payload: value,
  };
};

export const putBrand = (id:string, brand:any): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch) => {
  dispatch(categoryLoading());
  
  return fetch('http://localhost:3001/brands/'+id, {
    method: 'PUT',
    body: JSON.stringify(brand),
    headers: {
        'Content-Type': 'application/json'
    }
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          throw error;
      }
  }, error => {
      throw error;
  })
  .then((response) => response.json())
  .then((response) => {
    dispatch(updateBrand(response));
  })
  .catch(error => { 
    console.log('Post brand', error.message); 
    dispatch(brandFailed(error.message))
  });
}