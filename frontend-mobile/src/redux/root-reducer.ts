import UserReducer from '@redux/user/reducer';
// import InvoiceReducer from '@redux/invoice/reducer';
import ProductReducer from '@redux/product/reducer';
import staffReducer from './staff/reducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  User: UserReducer,
  Product: ProductReducer,
  Staff: staffReducer,
  // Invoice: InvoiceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
