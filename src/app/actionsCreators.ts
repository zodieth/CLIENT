
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import * as ActionTypes from "../features/ActionTypes";
import { RootState } from "./store";

console.log('hola4');
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
  
export const algo= async (crearProd:any) => {
  console.log('hola5', crearProd);
  const products= await fetch("http://localhost:3001/products" , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:crearProd,
      
      })
      .then(res => res.json())
      const results= await products.json()
      return results
  
}

   //Agregar Productos 
  export const createProducts = 
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  console.log('hola3')
   const products= await fetch("http://localhost:3001/products" , {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addProducts),
      })
      .then(res => res.json())
      .catch((error) => dispatch(productsFailed(error.message)));

      const results= await products.json()
      return results
      
  };

  export const categoryBrands = (
    categorySearch: String,
    brand: String
  ) => {
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

export const postCateogry = (name:string, description:string, father:any=null): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch) => {
  dispatch(categoryLoading());
  
  if(father === '') father = null;

  const newCategory = {
    name: name,
    description: description,
    father: father,
  }

  return fetch('http://localhost:3001/category', {
    method: 'POST',
    body: JSON.stringify(newCategory),
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
  .then(response => response.json())
  .then(response => {
    dispatch(addCategory(response))
  })
  .catch(error => { 
    console.log('Post activity', error.message); 
    dispatch(categoryFailed(error.message))
  });
}

export const deleteCategory = (value: any) => {
  return {
    type: ActionTypes.CATEGORY_DELETE,
    payload: value,
  };
};

export const deleteCateogry = (id: string): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch) => {
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
