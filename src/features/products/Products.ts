import * as ActionTypes from "../ActionTypes";
import interfaceProduct from "./interfaceProduct";

export const Products = (
  state = {
    isLoading: true,
    errMess: null, 
    productsFilter: [],
    allProducts: [],
  },
  action: any
) => {
  switch (action.type) {
    case ActionTypes.PRODUCTS_ADD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        productsFilter: action.payload,
        allProducts: action.payload,
      };

    case ActionTypes.PRODUCT_ADD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        productsFilter: action.payload,
        allProducts: state.allProducts.concat(action.payload),
      };

    case ActionTypes.PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        productsFilter: [],
      };

    case ActionTypes.PRODUCT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        productsFilter: [],
      };

    case ActionTypes.PRODUCT_FILTER:
      const value = action.payload.value; //Name
      const categorySearch = action.payload.categorySearch; //Category
      //const type = action.payload.type; //Ordenamiento ALF o PRICE
      const brand = action.payload.brand;
      const order = action.payload.order;
      const costMin = action.payload.costMin;
      const costMax = action.payload.costMax;

      let productsFilter;

      if (categorySearch !== "") {
        productsFilter = state.allProducts.filter(
          (product: interfaceProduct) =>
            product.category &&
            product.category.name
              .toUpperCase()
              .includes(categorySearch.toUpperCase())
        );
      } else {
        productsFilter = state.allProducts;
      }

      const filterName = productsFilter.filter((product: interfaceProduct) =>
        product.name.toUpperCase().includes(value.toUpperCase())
      );

      const filterBrand = filterName.filter((product: interfaceProduct) =>
        product.brand.name.toUpperCase().includes(brand.toUpperCase())
      );

      let filterCost;
      if (costMin === "" && costMax != 0) {
        filterCost = filterBrand.filter(
          (product: interfaceProduct) => product.price <= costMax
        );
      } else if (costMin != 0 && costMax != 0) {
        filterCost = filterBrand.filter(
          (product: interfaceProduct) =>
            costMin <= product.price && product.price <= costMax
        );
      } else if (costMin != 0 && costMax === "") {
        filterCost = filterBrand.filter(
          (product: interfaceProduct) => product.price >= costMin
        );
      } else {
        filterCost = filterBrand;
      }

      let totalOrder= order.split("|")
      
      if (totalOrder[0] === "ALF") {
        if (totalOrder[1] === "ASC") {
          filterCost.sort(function (a: interfaceProduct, b: interfaceProduct) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          });
        } else if (totalOrder[1] === "DESC"){
          filterCost.sort(function (a: interfaceProduct, b: interfaceProduct) {
            if (a.name < b.name) {
              return 1;
            }
            if (a.name > b.name) {
              return -1;
            }
            return 0;
          });
        }
      } else if (totalOrder[0] === "PRICE") {
        if (totalOrder[1] === "ASC") {
          filterCost.sort(function (a: any, b: any) {
            return a.price - b.price;
          });
        } else if (totalOrder[1] === "DESC") {
          filterCost.sort(function (a: any, b: any) {
            return b.price - a.price;
          });
        }
      }

      return {
        ...state,
        isLoading: false,
        errMess: null,
        productsFilter: filterCost,
      };

    case ActionTypes.PRODUCT_UPDATE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        allProducts: state.allProducts.map((product:interfaceProduct) => {
          if(product._id === action.payload._id)
            return action.payload;
          return product;
        }),
      };

    default:
      return state;
  }
};
