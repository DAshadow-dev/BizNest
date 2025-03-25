import { call, put, takeLatest, all } from 'redux-saga/effects';
import CategoryActions from './actions';
import ApiConstants from '../../adapter/ApiConstants';
import axios from 'axios';

// Worker Saga để lấy danh sách danh mục
function* fetchCategoriesSaga(action: any): Generator<any, void, any> {
  try {
    const { onSuccess, onFailed, onError } = action.payload;

    const response = yield call(axios.get, ApiConstants.GET_CATEGORIES);

    if (response && response.status === 200) {
      yield put({
        type: CategoryActions.FETCH_CATEGORIES_SUCCESS,
        payload: response.data,
      });
      if (onSuccess) onSuccess(response.data);
    } else {
      yield put({
        type: CategoryActions.FETCH_CATEGORIES_FAILURE,
        payload: response?.data?.msgNo || 'Failed to fetch categories',
      });
      if (onFailed) onFailed(response?.data?.msgNo || 'Failed to fetch categories');
    }
  } catch (error: any) {
    yield put({
      type: CategoryActions.FETCH_CATEGORIES_FAILURE,
      payload: error.message || 'An error occurred',
    });
    if (action.payload.onError) action.payload.onError(error);
  }
}

// Worker Saga để tạo danh mục mới
function* createCategorySaga(action: any): Generator<any, void, any> {
  try {
    const { category, onSuccess, onFailed, onError } = action.payload;

    const response = yield call(axios.post, ApiConstants.CREATE_CATEGORY, category);

    if (response && response.status === 201) {
      yield put({
        type: CategoryActions.CREATE_CATEGORY_SUCCESS,
        payload: response.data,
      });
      if (onSuccess) onSuccess(response.data);
    } else {
      yield put({
        type: CategoryActions.CREATE_CATEGORY_FAILURE,
        payload: response?.data?.msgNo || 'Failed to create category',
      });
      if (onFailed) onFailed(response?.data?.msgNo || 'Failed to create category');
    }
  } catch (error: any) {
    yield put({
      type: CategoryActions.CREATE_CATEGORY_FAILURE,
      payload: error.message || 'An error occurred',
    });
    if (action.payload.onError) action.payload.onError(error);
  }
}

// Watcher Saga
function* categorySaga() {
  yield all([
    takeLatest(CategoryActions.FETCH_CATEGORIES, fetchCategoriesSaga),
    takeLatest(CategoryActions.CREATE_CATEGORY, createCategorySaga),
  ]);
}

export default categorySaga; 