import ApiConstants from 'src/adapter/ApiConstants';
import api from '@libs/api';
import type { ChangePassword, UpdateInformation } from '@type/user.types';

// Define a type for the invoice data
type InvoiceData = {
  amount: number;
  date: string;
  customer: string;
  address: string;
  createdBy: string;
  createdDate: string;
};

const Factories = {
  // User Actions
  changePassword: (data: ChangePassword) => {
    return api.post(ApiConstants.CHANGE_PASSWORD, { data });
  },

  updateInformation: (data: UpdateInformation) => {
    return api.post(ApiConstants.UPDATE_INFORMATION, { data });
  },

  // Invoice Actions
  createInvoice: (data: InvoiceData) => {
    return api.post(ApiConstants.CREATE_INVOICE, { data });
  },

  // You can add more invoice-related methods here
  updateInvoice: (invoiceId: string, data: Partial<InvoiceData>) => {
    return api.put(`${ApiConstants.UPDATE_INVOICE}/${invoiceId}`, { data });
  },

  getInvoice: (invoiceId: string) => {
    return api.get(`${ApiConstants.GET_INVOICE}/${invoiceId}`);
  },

  deleteInvoice: (invoiceId: string) => {
    return api.delete(`${ApiConstants.DELETE_INVOICE}/${invoiceId}`);
  },

  getInvoicesByCustomer: (customerId: string) => {
    return api.get(`${ApiConstants.GET_INVOICE_BY_CUSTOMER}/${customerId}`);
  },
};

export default Factories;