import type {User} from '@type/user.types';

import TransactionActions from './actions';
import { act } from 'react';

const initState: any = {
  ListTransaction:[]
};

const Reducer = (
  state = initState,
  action: { type: string; payload: { c: User, data: any, id: number}},
) => {
  switch (action.type) {
    case TransactionActions.FETCH_LIST_TRANSACTION_SUCCESS:
      return {
        ...state,
        ListTransaction: action.payload.data
      };
    case TransactionActions.CREATE_TRANSACTION:
      return {
        ...state,
        ListTransaction: [...state.ListTransaction, action.payload.data]
      };
    default:
      return state;
  }
};

export default Reducer;
