import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import Factories from './factories';
import AuthActions from './actions';

function* handleAuthSaga(action : any,factoryFunction : Function, successAction : string, failureAction : string ){
  const {data, onSuccess, onFailure, onError} = action.payload;

  try {
    const response : CommonResponse<CodeResponse> = yield call(() => factoryFunction(data))
      if (response?.status === 200){
        onSuccess && onSuccess(response.data.Data);
        yield put({type: successAction, payload: {user : response.data.Data}})
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
  yield takeEvery(AuthActions.LOGIN, function* (action:any) : any{
    yield handleAuthSaga(action, Factories.login, AuthActions.LOGIN_SUCCESS,AuthActions.LOGIN_FAILURE);
  })
}

export function* register() {
  yield takeEvery(AuthActions.REGISTER, function* (action : any) : any{
    yield handleAuthSaga(action, Factories.register,AuthActions.REGISTER_SUCCESS,AuthActions.REGISTER_FAILURE)
  })
}

export function* verifyEmail() {
  yield takeEvery(AuthActions.VERIFY_EMAIL, function* (action : any) : any{
    yield handleAuthSaga(action, Factories.verifyEmail, AuthActions.VERIFY_EMAIL_SUCCESS, AuthActions.VERIFY_EMAIL_FAILURE)
  })
}

export default function* authSaga() {
  yield all([
    fork(login),
    fork(register),
    fork(verifyEmail),
  ]);
}
