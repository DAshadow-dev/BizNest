import 'regenerator-runtime/runtime';
import userSaga from '@redux/user/saga';
import {all} from 'redux-saga/effects';
import authSaga from './auth/saga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    authSaga()
  ]);
}
