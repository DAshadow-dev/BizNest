import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import InvoiceActions, { fetchInvoiceDetailFailure, fetchInvoiceDetailSuccess } from "./actions";
import Factories from "./factories";

// ✅ Saga lấy danh sách hóa đơn
export function* fetchInvoices() {
  yield takeEvery(InvoiceActions.FETCH_INVOICES, function* (action: any): any {
    const { onSuccess = () => {}, onFailed = () => {}, onError = () => {} } = action.payload || {};
    console.log("Fetching invoice list...");

    try {
      const response = yield call(Factories.getAllInvoices);
      console.log("API response:", response);

      if (response?.status === 200) {
        console.log("Invoices fetched successfully:", response.data.Data);
        onSuccess(response.data.Data);
        yield put({ type: InvoiceActions.FETCH_INVOICES_SUCCESS, payload: response.data.Data });
      } else {
        console.log("Failed to fetch invoices:", response.data);
        onFailed(response.data.MsgNo);
        yield put({ type: InvoiceActions.FETCH_INVOICES_FAILURE, payload: response.data.MsgNo });
      }
    } catch (error: any) {
      console.error("Error fetching invoices:", error);
      onError(error);
      yield put({ type: InvoiceActions.FETCH_INVOICES_FAILURE, payload: error.message });
    }
  });
}

// ✅ Saga tạo hóa đơn
export function* createInvoice() {
  yield takeEvery(InvoiceActions.CREATE_INVOICE, function* (action: any): any {
    const { invoice, onSuccess = () => {}, onFailed = () => {}, onError = () => {} } = action.payload || {};
    console.log("Creating invoice...");

    try {
      const response = yield call(() => Factories.createInvoice(invoice));
      if (response?.status === 201) {
        onSuccess(response.data.Data);
        yield put({ type: InvoiceActions.CREATE_INVOICE_SUCCESS, payload: response.data.Data });

        // ✅ Fetch lại danh sách hóa đơn sau khi tạo mới
        yield put({ type: InvoiceActions.FETCH_INVOICES });
      } else {
        onFailed(response.data.MsgNo);
      }
    } catch (error) {
      onError(error);
    }
  });
}

// ✅ Saga cập nhật hóa đơn
export function* updateInvoice() {
  yield takeEvery(InvoiceActions.UPDATE_INVOICE, function* (action: any): any {
    const { id, invoice, onSuccess = () => {}, onFailed = () => {}, onError = () => {} } = action.payload || {};
    console.log("Updating invoice...");

    try {
      const response = yield call(() => Factories.updateInvoice(id, invoice));

      if (response?.status === 200) {
        onSuccess(response.data.Data);
        yield put({ type: InvoiceActions.UPDATE_INVOICE_SUCCESS, payload: response.data.Data });

        // ✅ Load lại danh sách hóa đơn sau khi cập nhật
        yield put({ type: InvoiceActions.FETCH_INVOICES });
      } else {
        onFailed(response.data.MsgNo);
      }
    } catch (error) {
      onError(error);
    }
  });
}

// ✅ Saga xóa hóa đơn
export function* deleteInvoice() {
  yield takeEvery(InvoiceActions.DELETE_INVOICE, function* (action: any): any {
    const { id, onSuccess = () => {}, onFailed = () => {}, onError = () => {} } = action.payload || {};
    console.log("Deleting invoice...");

    try {
      const response = yield call(() => Factories.deleteInvoice(id));
      if (response?.status === 200) {
        onSuccess(response.data.Data);
        yield put({ type: InvoiceActions.DELETE_INVOICE_SUCCESS, payload: id });

        // ✅ Load lại danh sách hóa đơn sau khi xóa
        yield put({ type: InvoiceActions.FETCH_INVOICES });
      } else {
        onFailed(response.data.MsgNo);
      }
    } catch (error) {
      onError(error);
    }
  });
}

// ✅ Saga lấy chi tiết hóa đơn
export function* fetchInvoiceDetailSaga() {
  yield takeLatest(InvoiceActions.FETCH_INVOICE_DETAIL, function* (action: any): any {
    const { id, onSuccess, onFailed, onError } = action.payload;
    console.log("Fetching invoice detail for ID:", id);

    try {
      const response = yield call(() => Factories.getInvoiceDetail(id));
      if (response?.status === 200) {
        yield put(fetchInvoiceDetailSuccess(response.data));
        onSuccess && onSuccess(response.data);
      } else {
        onFailed && onFailed(response.data.MsgNo);
      }
    } catch (error) {
      yield put(fetchInvoiceDetailFailure(error.message));
      onError && onError(error.message);
    }
  });
}

// ✅ Root Saga
export default function* invoiceSaga() {
  yield all([
    fork(fetchInvoices),
    fork(createInvoice),
    fork(updateInvoice),
    fork(deleteInvoice),
    takeLatest(InvoiceActions.FETCH_INVOICE_DETAIL, fetchInvoiceDetailSaga),
  ]);
}
