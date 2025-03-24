import ApiConstants from 'src/adapter/ApiConstants';
import api from '@libs/api/index2';
import { store } from '@redux/store';

const Factories = {
  // Lấy danh sách hóa đơn
  getAllInvoices: () => {
    const { User } = store.getState();
    const storeId = User.Auth?.storeId;

    console.log('[Factories] Getting invoices with storeId:', storeId);

    const url = storeId
      ? `${ApiConstants.GET_INVOICES}?storeId=${storeId}`
      : ApiConstants.GET_INVOICES;

    console.log('[Factories] API URL:', url);
    return api.get(url);
  },

  // Tạo hóa đơn mới
  createInvoice: (invoice: any) => {
    console.log('[Factories] Creating invoice with FormData');

    if (invoice instanceof FormData) {
      console.log('[Factories] FormData entries:');
      if (typeof invoice.forEach === 'function') {
        invoice.forEach((value: any, key: string) => {
          console.log(`[Factories] - ${key}: ${value instanceof File || value instanceof Blob ? 'File/Blob' : value}`);
        });
      }
    }

    return api.post(ApiConstants.CREATE_INVOICE, invoice);
  },

  // Cập nhật hóa đơn
  updateInvoice: (id: number | string, invoice: any) => {
    console.log('[Factories] Updating invoice:', id);

    if (invoice instanceof FormData) {
      console.log('[Factories] FormData entries:');
      if (typeof invoice.forEach === 'function') {
        invoice.forEach((value: any, key: string) => {
          console.log(`[Factories] - ${key}: ${value instanceof File || value instanceof Blob ? 'File/Blob' : value}`);
        });
      }
    }

    const { User } = store.getState();
    const storeId = User.Auth?.storeId;

    if (invoice instanceof FormData && storeId && !invoice.get('storeId')) {
      invoice.append('storeId', storeId.toString());
      console.log('[Factories] Added storeId to FormData:', storeId);
    }

    console.log(`[Factories] PUT request to: ${ApiConstants.UPDATE_INVOICE}/${id}`);
    return api.put(`${ApiConstants.UPDATE_INVOICE}/${id}`, invoice);
  },

  // Xóa hóa đơn
  deleteInvoice: (id: number | string) => {
    const { User } = store.getState();
    const storeId = User.Auth?.storeId;

    const url = storeId
      ? `${ApiConstants.DELETE_INVOICE}/${id}?storeId=${storeId}`
      : `${ApiConstants.DELETE_INVOICE}/${id}`;

    console.log('[Factories] Delete invoice URL:', url);
    return api.delete(url);
  },

  // Lấy chi tiết hóa đơn
  getInvoiceDetail: (id: number | string) => {
    const { User } = store.getState();
    const storeId = User.Auth?.storeId;

    const url = storeId
      ? `${ApiConstants.GET_INVOICE_DETAIL}/${id}?storeId=${storeId}`
      : `${ApiConstants.GET_INVOICE_DETAIL}/${id}`;

    console.log('[Factories] Get invoice detail URL:', url);
    return api.get(url);
  },
};

export default Factories;
