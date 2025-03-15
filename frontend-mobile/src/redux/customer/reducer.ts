import type {CustomerReducer, User, UserReducer} from '@type/user.types';

import CustomerActions from './actions';
import { act } from 'react';

const initState: CustomerReducer = {
  ListCustomer:[]
};

const Reducer = (
  state = initState,
  action: { type: string; payload: { c: User, data: any, id: number}},
) => {
  switch (action.type) {
    case CustomerActions.FETCH_LIST_CUSTOMER_SUCCESS:
      return {
        ...state,
        ListCustomer: action.payload.data
      };
    case CustomerActions.CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        ListCustomer: [...state.ListCustomer, action.payload.data]
      };
    case CustomerActions.UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        ListCustomer: state.ListCustomer.map(customer =>
          customer._id === action.payload.id
            ? { ...customer, ...action.payload.data } 
            : customer 
        )
      };
    default:
      return state;
  }
};

export default Reducer;
