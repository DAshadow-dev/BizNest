import AdminActions from './actions';

const initState: any = {
  ListBussinessOnwer:[]
};

const Reducer = (
  state = initState,
  action: { type: string; payload: {data: any, id: number}},
) => {
  switch (action.type) {
    case AdminActions.FETCH_LIST_BUSSINESS_OWNER_SUCCESS:
      return {
        ...state,
        ListBussinessOnwer: action.payload.data
      };
    case AdminActions.TOGGLE_ACCOUNT_STATUS_SUCCESS:
      return {
        ...state,
        ListBussinessOnwer: state.ListBussinessOnwer.map((account: any) =>
          account._id === action.payload.id
            ? { 
              ...account,
              status: account.status == "inactive" ? "active" : "inactive"
             } 
            : account 
        )
      };
    default:
      return state;
  }
};

export default Reducer;