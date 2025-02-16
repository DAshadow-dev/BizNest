export type RootParamList = {
  HomeScreen: undefined,
  AdminDashboardScreen : undefined,
  AccountListScreen : undefined,
  PendingAccountsScreen : undefined,
  AccountDetailScreen : {  id: string;
    name: string;
    status: 'Active' | 'Blocked'},
  InvoiceListScreen : undefined,
  CreateInvoiceScreen : {
      invoiceId?: string;
      amount?: string;
      date?: string;
      customer?: string;
      address?: string;
      createdBy?: string;
      createdDate?: string;
  },
  InvoiceScreen:{
    invoiceId: string;
      amount: string;
      date: string;
      customer: string;
      address: string;
      createdBy: string;
      createdDate: string;
  },
  PaymentScreen: undefined,
};
