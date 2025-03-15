import ProductActions from "./actions";

// reducers/productReducer.js

// import ProductActions from '../actions/productActions';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ProductActions.FETCH_PRODUCTS:
    case ProductActions.CREATE_PRODUCT:
    case ProductActions.UPDATE_PRODUCT:
    case ProductActions.DELETE_PRODUCT:
    case ProductActions.FETCH_PRODUCT_DETAIL: // ✅ Bắt đầu tải chi tiết sản phẩm
      return { ...state, loading: true };

    case ProductActions.FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case ProductActions.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };

      case ProductActions.UPDATE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          products: state.products.map((product) =>
            product._id === action.payload._id ? action.payload : product
          ),
        };
      
    //
    case ProductActions.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    case ProductActions.FETCH_PRODUCT_DETAIL_SUCCESS:
      return { ...state, loading: false, productDetail: action.payload };

    case ProductActions.FETCH_PRODUCTS_FAILURE:
    case ProductActions.CREATE_PRODUCT_FAILURE:
    case ProductActions.UPDATE_PRODUCT_FAILURE:
    case ProductActions.DELETE_PRODUCT_FAILURE:
    case ProductActions.FETCH_PRODUCT_DETAIL_FAILURE: // ✅ Xử lý lỗi lấy chi tiết sản phẩm
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default productReducer;
