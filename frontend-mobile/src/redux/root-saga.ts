import 'regenerator-runtime/runtime';
import { all } from 'redux-saga/effects';
import userSaga from '@redux/user/saga';
import customerSaga from '@redux/customer/saga';
// import invoiceSaga from '@redux/invoice/saga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    customerSaga(),
    // invoiceSaga(),
  ]);
}
