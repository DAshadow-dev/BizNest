import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';
import userSaga from '@redux/user/saga';
import invoiceSaga from '@redux/invoice/saga';
import productSaga from '@redux/product/saga'
import staffSaga from './staff/saga';
import adminSaga from './admin/saga';
import customerSaga from '@redux/customer/saga';
import categorySaga from '@redux/category/saga';

export default function* rootSaga() {
  yield all([
    userSaga(),
    productSaga(),
    staffSaga(),
    adminSaga(),
    customerSaga(),
    categorySaga(),
    invoiceSaga(),
  ]);
}
