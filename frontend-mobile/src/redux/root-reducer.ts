import UserReducer from '@redux/user/reducer';
import ProductReducer from '@redux/product/reducer';
import staffReducer from './staff/reducer';
import AdminReducer from '@redux/admin/reducer';
// import InvoiceReducer from '@redux/invoice/reducer';
import CustomerReducer from '@redux/customer/reducer';
import CategoryReducer from '@redux/category/reducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  User: UserReducer,
  Product: ProductReducer,
  Staff: staffReducer,
  // Invoice: InvoiceReducer,
  Admin: AdminReducer,
  Customer: CustomerReducer,
  Category: CategoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
