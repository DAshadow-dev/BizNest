
import staffActions from "./actions";

// reducers/productReducer.js

// import staffActions from '../actions/staffActions';

const initialState = {
  staffs: [],
  loading: false,
  error: null,
};

const staffReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case staffActions.FETCH_STAFFS:
    case staffActions.CREATE_STAFF:
    case staffActions.UPDATE_STAFF:
    case staffActions.DELETE_STAFF:
    case staffActions.FETCH_STAFF_DETAIL: 
      return { ...state, loading: true };

    case staffActions.FETCH_STAFFS_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case staffActions.CREATE_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        staffs: [...state.staffs, action.payload],
      };

      case staffActions.UPDATE_STAFF_SUCCESS:
        return {
          ...state,
          loading: false,
          products: state.staffs.map((staff) =>
            staff._id === action.payload._id ? action.payload : staff
          ),
        };
      
    //
    case staffActions.DELETE_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        staffs: state.staffs.filter(
          (staff) => staff.id !== action.payload
        ),
      };

    case staffActions.FETCH_STAFF_DETAIL_SUCCESS: 
      return { ...state, loading: false, productDetail: action.payload };

    case staffActions.FETCH_STAFFS_FAILURE:
    case staffActions.CREATE_STAFF_FAILURE:
    case staffActions.UPDATE_STAFF_FAILURE:
    case staffActions.DELETE_STAFF_FAILURE:
    case staffActions.FETCH_STAFF_DETAIL_FAILURE: 
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default staffReducer;
