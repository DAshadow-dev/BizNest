const InvoiceActions = {
    FETCH_INVOICES: 'FETCH_INVOICES',
    FETCH_INVOICES_SUCCESS: 'FETCH_INVOICES_SUCCESS',
    FETCH_INVOICES_FAILURE: 'FETCH_INVOICES_FAILURE',
  
    CREATE_INVOICE: 'CREATE_INVOICE',
    CREATE_INVOICE_SUCCESS: 'CREATE_INVOICE_SUCCESS',
    CREATE_INVOICE_FAILURE: 'CREATE_INVOICE_FAILURE',
  
    UPDATE_INVOICE: 'UPDATE_INVOICE',
    UPDATE_INVOICE_SUCCESS: 'UPDATE_INVOICE_SUCCESS',
    UPDATE_INVOICE_FAILURE: 'UPDATE_INVOICE_FAILURE',
  
    DELETE_INVOICE: 'DELETE_INVOICE',
    DELETE_INVOICE_SUCCESS: 'DELETE_INVOICE_SUCCESS',
    DELETE_INVOICE_FAILURE: 'DELETE_INVOICE_FAILURE',
  
    FETCH_INVOICE_DETAIL: 'FETCH_INVOICE_DETAIL',
    FETCH_INVOICE_DETAIL_SUCCESS: 'FETCH_INVOICE_DETAIL_SUCCESS',
    FETCH_INVOICE_DETAIL_FAILURE: 'FETCH_INVOICE_DETAIL_FAILURE',
  };
  
  // Action để fetch danh sách hóa đơn
  export const fetchInvoices = (onSuccess = () => {}, onFailed = () => {}, onError = () => {}) => ({
    type: InvoiceActions.FETCH_INVOICES,
    payload: { onSuccess, onFailed, onError },
  });
  
  export const fetchInvoicesSuccess = (invoices) => ({
    type: InvoiceActions.FETCH_INVOICES_SUCCESS,
    payload: invoices,
  });
  
  export const fetchInvoicesFailure = (error) => ({
    type: InvoiceActions.FETCH_INVOICES_FAILURE,
    payload: error,
  });
  
  // Action để tạo hóa đơn
  export const createInvoice = (invoice) => async (dispatch) => {
    try {
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoice),
      });
  
  
      dispatch({ type: "CREATE_INVOICE_SUCCESS", payload: data });
  
      return Promise.resolve(data); // Ensure a promise is returned
    } catch (error) {
      return Promise.reject(error); // Ensure errors return a rejected promise
    }
  };
  
  export const createInvoiceSuccess = (invoice) => ({
    type: InvoiceActions.CREATE_INVOICE_SUCCESS,
    payload: invoice,
  });
  
  export const createInvoiceFailure = (error) => ({
    type: InvoiceActions.CREATE_INVOICE_FAILURE,
    payload: error,
  });
  
  // Action để cập nhật hóa đơn
  export const updateInvoice = (id, invoice, onSuccess = () => {}, onFailed = () => {}, onError = () => {}) => ({
    type: InvoiceActions.UPDATE_INVOICE,
    payload: { id, invoice, onSuccess, onFailed, onError },
  });
  
  export const updateInvoiceSuccess = (invoice) => ({
    type: InvoiceActions.UPDATE_INVOICE_SUCCESS,
    payload: invoice,
  });
  
  export const updateInvoiceFailure = (error) => ({
    type: InvoiceActions.UPDATE_INVOICE_FAILURE,
    payload: error,
  });
  
  // Action để xóa hóa đơn
  export const deleteInvoice = (id, onSuccess = () => {}, onFailed = () => {}, onError = () => {}) => ({
    type: InvoiceActions.DELETE_INVOICE,
    payload: { id, onSuccess, onFailed, onError },
  });
  
  export const deleteInvoiceSuccess = (id) => ({
    type: InvoiceActions.DELETE_INVOICE_SUCCESS,
    payload: id,
  });
  
  export const deleteInvoiceFailure = (error) => ({
    type: InvoiceActions.DELETE_INVOICE_FAILURE,
    payload: error,
  });
  
  // Action để fetch chi tiết hóa đơn
  export const fetchInvoiceDetail = (id, onSuccess = () => {}, onFailed = () => {}, onError = () => {}) => ({
    type: InvoiceActions.FETCH_INVOICE_DETAIL,
    payload: { id, onSuccess, onFailed, onError },
  });
  
  export const fetchInvoiceDetailSuccess = (invoice) => ({
    type: InvoiceActions.FETCH_INVOICE_DETAIL_SUCCESS,
    payload: invoice,
  });
  
  export const fetchInvoiceDetailFailure = (error) => ({
    type: InvoiceActions.FETCH_INVOICE_DETAIL_FAILURE,
    payload: error,
  });
  
  export default InvoiceActions;
  