import { all, call, fork, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import ProductActions, { fetchProductDetailFailure, fetchProductDetailSuccess } from './actions';
import Factories from './factories';

// ✅ Saga lấy danh sách sản phẩm
export function* fetchProducts() {
  yield takeEvery(ProductActions.FETCH_PRODUCTS, function* (action: any): any {
    const { storeId, onSuccess = () => {}, onFailed = () => {}, onError = () => {} } = action.payload || {};
    console.log('Fetching product list with storeId:', storeId);

    try {
      console.log('Calling API to get products...');
      const response = yield call(Factories.getAllProducts);
      
      if (response?.status === 200) {
        onSuccess(response.data.Data);
        yield put({ type: ProductActions.FETCH_PRODUCTS_SUCCESS, payload: response.data.Data });
      } else {
        console.log('Failed to fetch products:', response.data);
        onFailed(response.data.MsgNo);
        yield put({ type: ProductActions.FETCH_PRODUCTS_FAILURE, payload: response.data.MsgNo });
      }
    } catch (error: any) {
      console.error('Error fetching products:', error);
      console.error('Error details:', error.response?.data || error.message);
      onError(error);
      yield put({ type: ProductActions.FETCH_PRODUCTS_FAILURE, payload: error.message });
    }
  });
}


// ✅ Saga tạo sản phẩm
export function* createProduct() {
  yield takeEvery(ProductActions.CREATE_PRODUCT, function* (action: any): any {
    const { product, onSuccess = () => {}, onFailed = () => {}, onError = () => {} } = action.payload || {};
    console.log('Creating product...');

    try {
      const response = yield call(() => Factories.createProduct(product));
      if (response?.status === 201) {
        onSuccess(response.data.Data);
        yield put({ type: ProductActions.CREATE_PRODUCT_SUCCESS, payload: response.data.Data });

        // ✅ Fetch lại danh sách sản phẩm sau khi tạo mới
        yield put({ type: ProductActions.FETCH_PRODUCTS });
      } else {
        onFailed(response.data.MsgNo);
      }
    } catch (error) {
      onError(error);
    }
  });
}


// ✅ Saga cập nhật sản phẩm
export function* updateProduct() {
  yield takeEvery(ProductActions.UPDATE_PRODUCT, function* (action: any): any {
    const { id, product, onSuccess = () => {}, onFailed = () => {}, onError = () => {} } = action.payload || {};
    console.log('Updating product...');

    try {
      const response = yield call(() => Factories.updateProduct(id, product));

      if (response?.status === 200) {
        onSuccess(response.data.Data); // ✅ Gọi onSuccess sau khi cập nhật thành công
        yield put({ type: ProductActions.UPDATE_PRODUCT_SUCCESS, payload: response.data.Data });

        // ✅ Load lại danh sách sản phẩm sau khi cập nhật
        yield put({ type: ProductActions.FETCH_PRODUCTS });
      } else {
        onFailed(response.data.MsgNo);
      }
    } catch (error) {
      onError(error);
    }
  });
}




// ✅ Saga xóa sản phẩm
export function* deleteProduct() {
  yield takeEvery(ProductActions.DELETE_PRODUCT, function* (action: any): any {
    const { id, onSuccess = () => {}, onFailed = () => {}, onError = () => {} } = action.payload || {};
    console.log('Deleting product...');

    try {
      const response = yield call(() => Factories.deleteProduct(id));
      if (response?.status === 200) {
        onSuccess(response.data.Data);
        yield put({ type: ProductActions.DELETE_PRODUCT_SUCCESS, payload: id });

        // ✅ Load lại danh sách sản phẩm sau khi xóa
        yield put({ type: ProductActions.FETCH_PRODUCTS });
      } else {
        onFailed(response.data.MsgNo);
      }
    } catch (error) {
      onError(error);
    }
  });
}


// ✅ Saga lấy chi tiết sản phẩm
export function* fetchProductDetailSaga() {
  yield takeLatest(ProductActions.FETCH_PRODUCT_DETAIL, function* (action: any): any {
    const { id, onSuccess, onFailed, onError } = action.payload;
    console.log('Fetching product detail for ID:', id);

    try {
      const response = yield call(() => Factories.getProductDetail(id));
      if (response?.status === 200) {
        yield put(fetchProductDetailSuccess(response.data));
        onSuccess && onSuccess(response.data);
      } else {
        onFailed && onFailed(response.data.MsgNo);
      }
    } catch (error) {
      yield put(fetchProductDetailFailure(error.message));
      onError && onError(error.message);
    }
  });
}

// ✅ Root Saga (Sửa lỗi `fork(fetchProductDetailSaga)`)
export default function* productSaga() {
  yield all([
    fork(fetchProducts),
    fork(createProduct),
    fork(updateProduct),
    fork(deleteProduct),
    takeLatest(ProductActions.FETCH_PRODUCT_DETAIL, fetchProductDetailSaga), // ✅ Fix lỗi
  ]);
}
