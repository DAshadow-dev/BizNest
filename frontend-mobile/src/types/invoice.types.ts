export type InvoiceData = {
    invoiceId?: string;
    amount: number;
    date: string;
    customer: string;
    address: string;
    createdBy: string;
    createdDate: string;
  };
  
  export type CreateInvoiceRequest = Omit<InvoiceData, "invoiceId">;
  
  export type CreateInvoiceResponse = {
    success: boolean;
    message: string;
    invoice: InvoiceData;
  };
  
  export type UpdateInvoiceRequest = Partial<Omit<InvoiceData, "invoiceId">>;
  
  export type UpdateInvoiceResponse = {
    success: boolean;
    message: string;
    updatedInvoice: InvoiceData;
  };
  
  export type GetInvoiceResponse = {
    success: boolean;
    invoice: InvoiceData;
  };
  
  export type DeleteInvoiceResponse = {
    success: boolean;
    message: string;
  };