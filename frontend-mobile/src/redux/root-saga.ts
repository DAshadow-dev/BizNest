import 'regenerator-runtime/runtime';
import userSaga from '@redux/user/saga';
import {all} from 'redux-saga/effects';
import authSaga from './auth/saga';
import adminSaga from './admin/saga';
import invoiceSaga from '@redux/invoice/saga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    authSaga(),
    adminSaga(),
    invoiceSaga(),
  ]);
}
