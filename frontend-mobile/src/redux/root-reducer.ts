
import UserReducer from '@redux/user/reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  User: UserReducer,
  Product: ProductReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
