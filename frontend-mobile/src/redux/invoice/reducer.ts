import ApiConstants from "src/adapter/ApiConstants";
import api from "@libs/api";
import type { InvoiceData } from "@type/invoice.types";
import InvoiceActions from "./actions";

// Define the initial state
const initialState = {
  invoices: [] as InvoiceData[],
  invoiceList: [],
  loading: false,
  error: null,
};

const reducer = (
  state = initialState,
  action: {
    type: string;
    payload?: InvoiceData | { invoiceId: string };
  }
) => {
  switch (action.type) {
    case InvoiceActions.CREATE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: [...state.invoices, action.payload as InvoiceData],
      };

    case InvoiceActions.UPDATE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: state.invoices.map((invoice) =>
          invoice.id === (action.payload as InvoiceData).id
            ? (action.payload as InvoiceData)
            : invoice
        ),
      };

    case InvoiceActions.GET_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: [
          ...state.invoices.filter(
            (invoice) => invoice.id !== (action.payload as InvoiceData).id
          ),
          action.payload as InvoiceData,
        ],
      };

    case InvoiceActions.DELETE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: state.invoices.filter(
          (invoice) =>
            invoice.id !== (action.payload as { invoiceId: string }).invoiceId
        ),
      };
    case InvoiceActions.GET_INVOICE_LIST:
      return { ...state, loading: true, error: null };

    case InvoiceActions.GET_INVOICE_LIST_SUCCESS:
      return { ...state, loading: false, invoiceList: action.payload };

    case InvoiceActions.GET_INVOICE_LIST_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
