import {all, call, fork, put, takeEvery} from '@redux-saga/core/effects';
import Factories from './factories';
// sagas/productSaga.js

// import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import ProductActions from './actions';


// Saga để lấy danh sách sản phẩm
export function* fetchProducts() {
  yield takeEvery(ProductActions.FETCH_PRODUCTS, function* (action: any): any {
    const { onSuccess, onFailed, onError } = action.payload;
    try {
      const response: CommonResponse<CodeResponse> = yield call(() =>
        Factories.getAllProducts() // Gọi API lấy danh sách sản phẩm
      );
      
      if (response?.status === 200) {
        onSuccess && onSuccess(response.data.Data);
        yield put({
          type: ProductActions.FETCH_PRODUCTS_SUCCESS,
          payload: response.data.Data,
        });
      } else {
        onFailed && onFailed(response.data.MsgNo);
      }
    } catch (error) {
      onError && onError(error);
    }
  });
}

// Saga để tạo mới sản phẩm
export function* createProduct() {
  yield takeEvery(ProductActions.CREATE_PRODUCT, function* (action: any): any {
    const { product, onSuccess, onFailed, onError } = action.payload;
    try {
      const response: CommonResponse<CodeResponse> = yield call(() =>
        Factories.createProduct(product) // Gọi API tạo sản phẩm mới
      );

      if (response?.status === 200) {
        onSuccess && onSuccess(response.data.Data);
        yield put({
          type: ProductActions.CREATE_PRODUCT_SUCCESS,
          payload: response.data.Data,
        });
      } else {
        onFailed && onFailed(response.data.MsgNo);
      }
    } catch (error) {
      onError && onError(error);
    }
  });
}

// Saga để cập nhật sản phẩm
export function* updateProduct() {
  yield takeEvery(ProductActions.UPDATE_PRODUCT, function* (action: any): any {
    const { id, product, onSuccess, onFailed, onError } = action.payload;
    try {
      const response: CommonResponse<CodeResponse> = yield call(() =>
        Factories.updateProduct(id, product) // Gọi API cập nhật sản phẩm
      );

      if (response?.status === 200) {
        onSuccess && onSuccess(response.data.Data);
        yield put({
          type: ProductActions.UPDATE_PRODUCT_SUCCESS,
          payload: response.data.Data,
        });
      } else {
        onFailed && onFailed(response.data.MsgNo);
      }
    } catch (error) {
      onError && onError(error);
    }
  });
}

// Saga để xóa sản phẩm
export function* deleteProduct() {
  yield takeEvery(ProductActions.DELETE_PRODUCT, function* (action: any): any {
    const { id, onSuccess, onFailed, onError } = action.payload;
    try {
      const response: CommonResponse<CodeResponse> = yield call(() =>
        Factories.deleteProduct(id) // Gọi API xóa sản phẩm
      );

      if (response?.status === 200) {
        onSuccess && onSuccess(response.data.Data);
        yield put({
          type: ProductActions.DELETE_PRODUCT_SUCCESS,
          payload: id, // Trả về id của sản phẩm đã bị xóa
        });
      } else {
        onFailed && onFailed(response.data.MsgNo);
      }
    } catch (error) {
      onError && onError(error);
    }
  });
}

// Watcher saga
export function* watchFetchProducts() {
  yield takeEvery(ProductActions.FETCH_PRODUCTS, fetchProducts);
}

export function* watchCreateProduct() {
  yield takeEvery(ProductActions.CREATE_PRODUCT, createProduct);
}

export function* watchUpdateProduct() {
  yield takeEvery(ProductActions.UPDATE_PRODUCT, updateProduct);
}

export function* watchDeleteProduct() {
  yield takeEvery(ProductActions.DELETE_PRODUCT, deleteProduct);
}

// Root saga
export default function* productSaga() {
  yield all([
    fork(watchFetchProducts),
    fork(watchCreateProduct),
    fork(watchUpdateProduct),
    fork(watchDeleteProduct),
  ]);
}

