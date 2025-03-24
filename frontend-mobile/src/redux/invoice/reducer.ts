import InvoiceActions from "./actions";

const initialState = {
  invoices: [],
  invoiceDetail: null,
  loading: false,
  error: null,
};

const invoiceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case InvoiceActions.FETCH_INVOICES:
    case InvoiceActions.CREATE_INVOICE:
    case InvoiceActions.UPDATE_INVOICE:
    case InvoiceActions.DELETE_INVOICE:
    case InvoiceActions.FETCH_INVOICE_DETAIL:
      return { ...state, loading: true, error: null };

    case InvoiceActions.FETCH_INVOICES_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: Array.isArray(action.payload?.data?.invoices)
          ? action.payload.data.invoices
          : [],
      };

    case InvoiceActions.CREATE_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: [...state.invoices, action.payload],
      };

    case InvoiceActions.UPDATE_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: state.invoices.map((invoice) =>
          invoice.id === action.payload.id ? action.payload : invoice
        ),
      };

    case InvoiceActions.DELETE_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        invoices: state.invoices.filter(
          (invoice) => invoice.id !== action.payload
        ),
      };

    case InvoiceActions.FETCH_INVOICE_DETAIL_SUCCESS:
      return { ...state, loading: false, invoiceDetail: action.payload };

    case InvoiceActions.FETCH_INVOICES_FAILURE:
    case InvoiceActions.CREATE_INVOICE_FAILURE:
    case InvoiceActions.UPDATE_INVOICE_FAILURE:
    case InvoiceActions.DELETE_INVOICE_FAILURE:
    case InvoiceActions.FETCH_INVOICE_DETAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default invoiceReducer;
