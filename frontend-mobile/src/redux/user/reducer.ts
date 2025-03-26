import type {ChangePassword, UpdateInformation, User, UserReducer} from '@type/user.types';

import UserActions from './actions';

const initState: UserReducer = {
  Auth: {
    _id: 0,
    username: '',
    email: '',
    phone: '',
    image: '',
  },
};

const Reducer = (
  state = initState,
  action: { type: string; payload: { user: User, data: any}},
) => {
  switch (action.type) {
    case UserActions.LOGIN_SUCCESS:
    case UserActions.REGISTER_SUCCESS:
      return {
        ...state,
        Auth: {
          ...action.payload?.user,
          isAuthenticated: true
        },
      };
      
    case UserActions.LOGIN_FAILURE:
    case UserActions.REGISTER_FAILURE:
      return {
        ...state,
        Auth: {
          ...state.Auth,
          isAuthenticated: false,
        },
      };

    case UserActions.VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        Auth: {
          ...state.Auth,
          verified: true,
        },
      };
    case UserActions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        Auth: {
          ...state.Auth,
          password: action.payload.data.newPassword, 
        },
      };
    case UserActions.UPDATE_INFORMATION_SUCCESS:
      return {
        ...state,
        Auth:{
          ...state.Auth,
          username: action.payload.data.username,
          email: action.payload.data.email,
          phone: action.payload.data.phone,
          image: action.payload.data.image,
        }
      };
    default:
      return state;
  }
};

export default Reducer;
