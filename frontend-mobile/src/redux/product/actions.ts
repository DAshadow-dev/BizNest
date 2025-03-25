const ProductActions = {
  FETCH_PRODUCTS: 'FETCH_PRODUCTS',
  FETCH_PRODUCTS_SUCCESS: 'FETCH_PRODUCTS_SUCCESS',
  FETCH_PRODUCTS_FAILURE: 'FETCH_PRODUCTS_FAILURE',

  CREATE_PRODUCT: 'CREATE_PRODUCT',
  CREATE_PRODUCT_SUCCESS: 'CREATE_PRODUCT_SUCCESS',
  CREATE_PRODUCT_FAILURE: 'CREATE_PRODUCT_FAILURE',

  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  UPDATE_PRODUCT_SUCCESS: 'UPDATE_PRODUCT_SUCCESS',
  UPDATE_PRODUCT_FAILURE: 'UPDATE_PRODUCT_FAILURE',

  DELETE_PRODUCT: 'DELETE_PRODUCT',
  DELETE_PRODUCT_SUCCESS: 'DELETE_PRODUCT_SUCCESS',
  DELETE_PRODUCT_FAILURE: 'DELETE_PRODUCT_FAILURE',

  FETCH_PRODUCT_DETAIL: 'FETCH_PRODUCT_DETAIL',
  FETCH_PRODUCT_DETAIL_SUCCESS: 'FETCH_PRODUCT_DETAIL_SUCCESS',
  FETCH_PRODUCT_DETAIL_FAILURE: 'FETCH_PRODUCT_DETAIL_FAILURE',
};

// Action để fetch sản phẩm
export const fetchProducts = (onSuccess = () => {}, onFailed = () => {}, onError = () => {}) => ({
  type: ProductActions.FETCH_PRODUCTS,
  payload: { onSuccess, onFailed, onError },
});

// Action thành công khi lấy sản phẩm
export const fetchProductsSuccess = (products) => ({
  type: ProductActions.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

// Action thất bại khi lấy sản phẩm
export const fetchProductsFailure = (error) => ({
  type: ProductActions.FETCH_PRODUCTS_FAILURE,
  payload: error,
});

// Action để tạo sản phẩm
export const createProduct = (product, onSuccess = () => {}, onFailed = () => {}, onError = () => {}) => ({
  type: ProductActions.CREATE_PRODUCT,
  payload: { product, onSuccess, onFailed, onError },
});

// Action thành công khi tạo sản phẩm
export const createProductSuccess = (product) => ({
  type: ProductActions.CREATE_PRODUCT_SUCCESS,
  payload: product,
});

// Action thất bại khi tạo sản phẩm
export const createProductFailure = (error) => ({
  type: ProductActions.CREATE_PRODUCT_FAILURE,
  payload: error,
});

// Action để cập nhật sản phẩm
export const updateProduct = (id, product, onSuccess = () => {}, onFailed = () => {}, onError = () => {}) => ({
  type: ProductActions.UPDATE_PRODUCT,
  payload: { id, product, onSuccess, onFailed, onError },
});

// Action thành công khi cập nhật sản phẩm
export const updateProductSuccess = (product) => ({
  type: ProductActions.UPDATE_PRODUCT_SUCCESS,
  payload: product,
});

// Action thất bại khi cập nhật sản phẩm
export const updateProductFailure = (error) => ({
  type: ProductActions.UPDATE_PRODUCT_FAILURE,
  payload: error,
});

// Action để xóa sản phẩm
export const deleteProduct = (id, onSuccess = () => {}, onFailed = () => {}, onError = () => {}) => ({
  type: ProductActions.DELETE_PRODUCT,
  payload: { id, onSuccess, onFailed, onError },
});

// Action thành công khi xóa sản phẩm
export const deleteProductSuccess = (id) => ({
  type: ProductActions.DELETE_PRODUCT_SUCCESS,
  payload: id,
});

// Action thất bại khi xóa sản phẩm
export const deleteProductFailure = (error) => ({
  type: ProductActions.DELETE_PRODUCT_FAILURE,
  payload: error,
});


// ✅ Action để fetch chi tiết sản phẩm
export const fetchProductDetail = (id, onSuccess = () => {}, onFailed = () => {}, onError = () => {}) => ({
  type: ProductActions.FETCH_PRODUCT_DETAIL,
  payload: { id, onSuccess, onFailed, onError },
});

// ✅ Action thành công khi lấy chi tiết sản phẩm
export const fetchProductDetailSuccess = (product) => ({
  type: ProductActions.FETCH_PRODUCT_DETAIL_SUCCESS,
  payload: product,
});

// ✅ Action thất bại khi lấy chi tiết sản phẩm
export const fetchProductDetailFailure = (error) => ({
  type: ProductActions.FETCH_PRODUCT_DETAIL_FAILURE,
  payload: error,
});
export default ProductActions;
