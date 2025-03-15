import 'regenerator-runtime/runtime';
import userSaga from '@redux/user/saga';
// import invoiceSaga from '@redux/invoice/saga';
import productSaga from '@redux/product/saga'
import staffSaga from './staff/saga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    userSaga(),
    productSaga(),
    staffSaga(),
    // invoiceSaga(),
  ]);
}
