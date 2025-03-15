// import ApiConstants from "src/adapter/ApiConstants";
// import axios from "axios";
// import Action from "./actions";
// import { InvoiceData } from "@redux/invoice/invoice.types"; // Ensure correct import path

// const Factories = {
//   createInvoice: async (
//     invoiceData: CreateInvoiceRequest
//   ): Promise<CreateInvoiceResponse> => {
//     try {
//       const response = await axios.post<CreateInvoiceResponse>(
//         ApiConstants.CREATE_INVOICE,
//         invoiceData,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       return response.data;
//     } catch (error: any) {
//       throw new Error(
//         error.response?.data?.message || "Failed to create invoice."
//       );
//     }
//   },

//   updateInvoice: async (
//     invoiceId: string,
//     invoiceData: UpdateInvoiceRequest
//   ): Promise<UpdateInvoiceResponse> => {
//     try {
//       const response = await axios.put<UpdateInvoiceResponse>(
//         `${ApiConstants.UPDATE_INVOICE}/${invoiceId}`,
//         invoiceData,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       return response.data;
//     } catch (error: any) {
//       throw new Error(
//         error.response?.data?.message || "Failed to update invoice."
//       );
//     }
//   },

//   getInvoices: async (): Promise<GetInvoiceResponse[]> => {
//     try {
//       const response = await axios.get<GetInvoiceResponse[]>(
//         ApiConstants.GET_INVOICE
//       );
//       return response.data;
//     } catch (error: any) {
//       throw new Error(
//         error.response?.data?.message || "Failed to fetch invoices."
//       );
//     }
//   },

//   getInvoiceByCustomer: async (
//     customerId: string
//   ): Promise<GetInvoiceResponse[]> => {
//     try {
//       const response = await axios.get<GetInvoiceResponse[]>(
//         `${ApiConstants.GET_INVOICE_BY_CUSTOMER}/${customerId}`
//       );
//       return response.data;
//     } catch (error: any) {
//       throw new Error(
//         error.response?.data?.message ||
//           "Failed to fetch invoices for customer."
//       );
//     }
//   },

//   deleteInvoice: async (invoiceId: string): Promise<DeleteInvoiceResponse> => {
//     try {
//       const response = await axios.delete<DeleteInvoiceResponse>(
//         `${ApiConstants.DELETE_INVOICE}/${invoiceId}`
//       );
//       return response.data;
//     } catch (error: any) {
//       throw new Error(
//         error.response?.data?.message || "Failed to delete invoice."
//       );
//     }
//   },
// };

// export default Factories;
