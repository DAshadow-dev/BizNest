import {all, call, fork, put, takeEvery} from '@redux-saga/core/effects';
import InvoiceActions from './actions';
import Factories from './factories';

function* createInvoiceSaga(action: { type: string; payload: any }) {
  try {
    const response = yield call(Factories.createInvoice, action.payload);
    yield put({ type: InvoiceActions.CREATE_INVOICE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: InvoiceActions.CREATE_INVOICE_FAILED, payload: error });
  }
}

function* updateInvoiceSaga(action: { type: string; payload: { invoiceId: string; data: any } }) {
  try {
    const response = yield call(Factories.updateInvoice, action.payload.invoiceId, action.payload.data);
    yield put({ type: InvoiceActions.UPDATE_INVOICE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: InvoiceActions.UPDATE_INVOICE_FAILED, payload: error });
  }
}

function* getInvoiceSaga(action: { type: string; payload: string }) {
  try {
    const response = yield call(Factories.getInvoice, action.payload);
    yield put({ type: InvoiceActions.GET_INVOICE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: InvoiceActions.GET_INVOICE_FAILED, payload: error });
  }
}

function* deleteInvoiceSaga(action: { type: string; payload: string }) {
  try {
    yield call(Factories.deleteInvoice, action.payload);
    yield put({ type: InvoiceActions.DELETE_INVOICE_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: InvoiceActions.DELETE_INVOICE_FAILED, payload: error });
  }
}

function* fetchInvoiceListSaga() {
  try {
    const invoices = yield call(fetchInvoiceList);
    yield put(getInvoiceListSuccess(invoices));
  } catch (error: any) {
    yield put(getInvoiceListFailed(error.message));
  }
}

export default function* invoiceSaga() {
  yield takeLatest(InvoiceActions.CREATE_INVOICE, createInvoiceSaga);
  yield takeLatest(InvoiceActions.UPDATE_INVOICE, updateInvoiceSaga);
  yield takeLatest(InvoiceActions.GET_INVOICE, getInvoiceSaga);
  yield takeLatest(InvoiceActions.DELETE_INVOICE, deleteInvoiceSaga);
  yield takeLatest(InvoiceActions.GET_INVOICE_LIST, fetchInvoiceListSaga);
}
