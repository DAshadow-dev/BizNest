import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';
import userSaga from '@redux/user/saga';
import authSaga from './auth/saga';
import chatSaga from './chat/saga';
import transactionSaga from '@redux/transaction/saga';
import productSaga from '@redux/product/saga'
import staffSaga from './staff/saga';
import adminSaga from './admin/saga';
import customerSaga from '@redux/customer/saga';
import categorySaga from '@redux/category/saga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    authSaga(),
    // invoiceSaga(),
    chatSaga()
    productSaga(),
    staffSaga(),
    adminSaga(),
    customerSaga(),
    categorySaga(),
    transactionSaga(),
  ]);
}
