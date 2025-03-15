import UserReducer from '@redux/user/reducer';
import InvoiceReducer from '@redux/invoice/reducer';

import { combineReducers } from 'redux';
import ChatReducer from './chat/reducer';

const rootReducer = combineReducers({
  User: UserReducer,
  Invoice: InvoiceReducer,
  Chat: ChatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
