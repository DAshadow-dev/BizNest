import 'regenerator-runtime/runtime';
import userSaga from '@redux/user/saga';
// import invoiceSaga from '@redux/invoice/saga';
import customerSaga from '@redux/customer/saga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([
    userSaga(),
    // invoiceSaga(),
    customerSaga(),
  ]);
}
