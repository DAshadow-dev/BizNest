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
  ProductListScreen: undefined,
  ProductDetailScreen: {  product: {name: string;
                          price: number;
                          size: string;
                          color: string;
                          brand: string;
                          image: string;
                          category: string;} };
  CreateProductScreen: undefined,
  EditProductScreen: {  product: {name: string;
                        price: number;
                        size: string;
                        color: string;
                        brand: string;
                        image: string;
                        category: string;} };
    //staff
    StaffListScreen: undefined;
    StaffDetailScreen: { staff: { fullname: string; email: string; phone: string; role: string; } };
    CreateStaffScreen: undefined;
    EditStaffScreen: { staff: { fullname: string; email: string; phone: string; role: string; } };
  PROFILE_SCREEN: undefined,
  PASSWORD_SCREEN: undefined,
  PROFILE: undefined,
  CUSTOMER_LIST: {showToast?: boolean, message?: string},
  CREATE_CUSTOMER: {idUpdate: number};
  CUSTOMER_DETAIL: {id: number};
  BUSINESS_DASHBOARD: undefined,
  LOGIN_SCREEN: undefined,
  ONBOARDING_SCREEN : undefined,
  REGISTER_SCREEN :undefined,
  BUSINESSCATEGORY_SCREEN: {
    email: string,
    fullName: string,
    mobile: string,
    password : string,
  },
  // HOME_SCREEN: undefined,
  CHAT_SCREEN :undefined,
};
