import UserReducer from '@redux/user/reducer';
import InvoiceReducer from '@redux/invoice/reducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  User: UserReducer,
  Invoice: InvoiceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
