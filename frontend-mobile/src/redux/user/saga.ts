import {all, call, fork, put, takeEvery} from '@redux-saga/core/effects';
import UserActions from './actions';
import Factories from './factories';
import { storeToken } from '@utils/handleToken';

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

function* handleAuthSaga(action : any,factoryFunction : Function, successAction : string, failureAction : string ){
  const {data, onSuccess, onFailure, onError} = action.payload;
  try {
    const response : CommonResponse<CodeResponse> = yield call(() => factoryFunction(data))
      if (response?.status === 200){
        storeToken(response.data.Data.token);
        yield put({type: successAction, payload: {user : response.data.Data.user}})
        onSuccess && onSuccess(response.data.Data.user);
    }
    else {
      onFailure && onFailure(response.data.MsgNo);
      yield put({type: failureAction})
    }
  } catch (error) {
    onError && onError(error);
    yield put({type: failureAction})
  }
}

export function* login() {
  yield takeEvery(UserActions.LOGIN, function* (action:any) : any{
    yield handleAuthSaga(action, Factories.login, UserActions.LOGIN_SUCCESS,UserActions.LOGIN_FAILURE);
  })
}

export function* register() {
  yield takeEvery(UserActions.REGISTER, function* (action : any) : any{
    yield handleAuthSaga(action, Factories.register,UserActions.REGISTER_SUCCESS,UserActions.REGISTER_FAILURE)
  })
}

export function* verifyEmail() {
  yield takeEvery(UserActions.VERIFY_EMAIL, function* (action : any) : any{
    yield handleAuthSaga(action, Factories.verifyEmail, UserActions.VERIFY_EMAIL_SUCCESS, UserActions.VERIFY_EMAIL_FAILURE)
  })
}

export default function* userSaga() {
  yield all([
    fork(changePassword),
    fork(updateInformation),
    fork(login),
    fork(register),
    fork(verifyEmail),
  ]);
}
