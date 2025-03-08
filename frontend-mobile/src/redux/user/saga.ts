import {all, call, fork, put, takeEvery} from '@redux-saga/core/effects';
import UserActions from './actions';
import Factories from './factories';

export function* changePassword() {
  yield takeEvery(UserActions.CHANGE_PASSWORD, function* (action: any): any {
    const {data, onSuccess, onFailed, onError} = action.payload;
    try {
      const response: CommonResponse<CodeResponse> = yield call(() =>
        Factories.changePassword(data),
      );

      if (response?.status === 200) {
        onSuccess && onSuccess(response.data.Data);
        yield put({
          type: UserActions.CHANGE_PASSWORD_SUCCESS,
          payload: {
            data
          },
        });
      }else{
        onFailed && onFailed(response.data.MsgNo);
      }
    } catch (error) {
      onError && onError(error);
    }    
  });
}

export function* updateInformation() {
  yield takeEvery(UserActions.UPDATE_INFORMATION, function* (action: any): any {
    const {data, onSuccess, onFailed, onError} = action.payload;
    try {
      const response: CommonResponse<CodeResponse> = yield call(() =>
        Factories.updateInformation(data),
      );
      if (response?.status === 200) {
        onSuccess && onSuccess(response.data.Data);
        yield put({
          type: UserActions.UPDATE_INFORMATION_SUCCESS,
          payload: {
            data
          },
        });
      }else{
        onFailed && onFailed(response.data.MsgNo);
      }
    } catch (error) {
      onError && onError(error);
    }    
  });
}

export default function* userSaga() {
  yield all([
    fork(changePassword),
    fork(updateInformation),
  ]);
}
