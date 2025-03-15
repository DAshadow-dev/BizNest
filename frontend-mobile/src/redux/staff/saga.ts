import { all, call, fork, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import staffActions, { 
  fetchSTAFFsSuccess, 
  fetchStaffsFailure, 
  createstaffSuccess, 
  createStaffFailure,
  updateStaffSuccess,
  updateStaffFailure,
  deleteStaffSuccess,
  deleteStaffFailure,
  fetchStaffDetailSuccess,
  fetchStaffDetailFailure,
  searchStaffsSuccess,
  searchStaffsFailure
} from './actions';
import Factories from './factories';

// ✅ Saga lấy danh sách nhân viên
export function* fetchStaffs() {
  yield takeEvery(staffActions.FETCH_STAFFS, function* (action: any): any {
    const { onSuccess = () => {}, onFailed = () => {}, onError = () => {} } = action.payload || {};
    console.log('Fetching staff list...');

    try {
    console.log('🔄 SAGA - FETCH_STAFFS - Calling API');
      const response = yield call(Factories.getAllSTAFFS);
      if (response?.status === 200) {
        onSuccess(response.data.Data);
        yield put({ type: staffActions.FETCH_STAFFS_SUCCESS, payload: response.data.Data });
      } else {
        onFailed(response.data.MsgNo);
      }
    } catch (error: any) {
      onError(error);
      yield put(fetchStaffsFailure(error.message));
    }
  });
}

// ✅ Saga tạo nhân viên
export function* createStaff() {
  yield takeEvery(staffActions.CREATE_STAFF, function* (action: any): any {
    const { staff, onSuccess = () => {}, onFailed = () => {}, onError = () => {} } = action.payload || {};
    console.log('Creating staff...');

    try {
      const response = yield call(() => Factories.createStaff(staff));
      if (response?.status === 201) {
        onSuccess(response.data.Data);
        yield put(createstaffSuccess(response.data.Data));

        // ✅ Fetch lại danh sách nhân viên sau khi tạo mới
        yield put({ type: staffActions.FETCH_STAFFS });
      } else {
        onFailed(response.data.MsgNo);
      }
    } catch (error: any) {
      onError(error);
      yield put(createStaffFailure(error.message));
    }
  });
}

// ✅ Saga cập nhật nhân viên
export function* updateStaff() {
  yield takeEvery(staffActions.UPDATE_STAFF, function* (action: any): any {
    const { id, staff, onSuccess = () => {}, onFailed = () => {}, onError = () => {} } = action.payload || {};
    console.log('Updating staff...');

    try {
      const response = yield call(() => Factories.updateStaff(id, staff));

      if (response?.status === 200) {
        onSuccess(response.data.Data); // ✅ Gọi onSuccess sau khi cập nhật thành công
        yield put(updateStaffSuccess(response.data.Data));

        // ✅ Load lại danh sách nhân viên sau khi cập nhật
        yield put({ type: staffActions.FETCH_STAFFS });
      } else {
        onFailed(response.data.MsgNo);
      }
    } catch (error: any) {
      onError(error);
      yield put(updateStaffFailure(error.message));
    }
  });
}

// ✅ Saga xóa nhân viên
export function* deleteStaff() {
  yield takeEvery(staffActions.DELETE_STAFF, function* (action: any): any {
    const { id, onSuccess = () => {}, onFailed = () => {}, onError = () => {} } = action.payload || {};
    console.log('Deleting staff...');

    try {
      const response = yield call(() => Factories.deleteStaff(id));
      if (response?.status === 200) {
        onSuccess(response.data.Data);
        yield put(deleteStaffSuccess(id));

        // ✅ Load lại danh sách nhân viên sau khi xóa
        yield put({ type: staffActions.FETCH_STAFFS });
      } else {
        onFailed(response.data.MsgNo);
      }
    } catch (error: any) {
      onError(error);
      yield put(deleteStaffFailure(error.message));
    }
  });
}

// ✅ Saga lấy chi tiết nhân viên
export function* fetchStaffDetailSaga() {
  yield takeLatest(staffActions.FETCH_STAFF_DETAIL, function* (action: any): any {
    const { id, onSuccess, onFailed, onError } = action.payload;
    console.log('Fetching staff detail for ID:', id);

    try {
      const response = yield call(() => Factories.getStaffDetail(id));
      if (response?.status === 200) {
        yield put(fetchStaffDetailSuccess(response.data));
        onSuccess && onSuccess(response.data);
      } else {
        onFailed && onFailed(response.data.MsgNo);
      }
    } catch (error: any) {
      yield put(fetchStaffDetailFailure(error.message));
      onError && onError(error.message);
    }
  });
}

// ✅ Saga tìm kiếm nhân viên
export function* searchStaffs() {
  yield takeEvery(staffActions.SEARCH_STAFFS, function* (action: any): any {
    const { query, onSuccess = () => {}, onFailed = () => {}, onError = () => {} } = action.payload || {};
    console.log('Searching staff with query:', query);

    try {
      const response = yield call(() => Factories.searchStaff(query));
      if (response?.status === 200) {
        onSuccess(response.data.Data);
        yield put(searchStaffsSuccess(response.data.Data));
      } else {
        onFailed(response.data.MsgNo);
      }
    } catch (error: any) {
      onError(error);
      yield put(searchStaffsFailure(error.message));
    }
  });
}

// ✅ Root Saga
export default function* staffSaga() {
  yield all([
    fork(fetchStaffs),
    fork(createStaff),
    fork(updateStaff),
    fork(deleteStaff),
    fork(fetchStaffDetailSaga),
    fork(searchStaffs),
  ]);
}
