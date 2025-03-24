
export type RootParamList = {
  HomeScreen: undefined,
  AdminDashboardScreen : undefined,
  AccountListScreen : undefined,
  PendingAccountsScreen : undefined,
  AccountDetailScreen : {  
    id: string
  },
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
                          categoryId: string;
                          quantity: string;} };
  CreateProductScreen: undefined,
  EditProductScreen: {  product: {name: string;
                        price: number;
                        size: string;
                        color: string;
                        brand: string;
                        image: string;
                        categoryId: string;
                        quantity: string;}}; 
  //new Product screen
  WareHouse: { refresh?: boolean };
  ProductCreateScreen: undefined
  ProductDetailScreens: {
    product: {name: string;
      price: number;
      size: string;
      color: string;
      brand: string;
      image: string;
      category: string;}
  };
  EditProductScreens: {
    product: {name: string;
    price: number;
    size: string;
    color: string;
    brand: string;
    quantity: number;
    image: string | null;
    description: string;
    _id: string;
    category: string;}
  };
    //staff
    StaffListScreen: { refresh?: boolean };
    StaffDetailScreen: { staff: { 
      username: string; 
      email: string; 
      phone: string; 
      role: string; 
      status: string;
      image: string | null;
      _id: string;
    } };
    CreateStaffScreen: undefined;
    EditStaffScreen: { staff: { 
      firstName: string; 
      lastName: string; 
      email: string; 
      phone: string; 
      role: string;
      status: string;
      image: string | null;
      _id: string;
      username?: string;
    } };
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
  HOME_ADMIN: undefined,
  STATUS_SCREEN: {status: string},
  ReviewScreen: undefined,
};
