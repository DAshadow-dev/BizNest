import 'regenerator-runtime/runtime';
import userSaga from '@redux/user/saga';
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    userSaga(),
    productSaga(),
  ]);
}
