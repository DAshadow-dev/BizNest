import type { User, UserReducer } from '@type/user.types';
import AuthActions from './actions';

const initState: UserReducer = {
  Auth: {
    id: 0,
    email: '',
    username: '',
    phone: '',
    verified: false,
    isAuthenticated: false,
  }
};

const AuthReducer = (
  state = initState,
  action: { type: string; payload?: { user?: User } },
) => {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
    case AuthActions.REGISTER_SUCCESS:
      return {
        ...state,
        Auth: {
          ...state.Auth,
          ...action.payload?.user,
          isAuthenticated: true,
        },
      };
      
    case AuthActions.LOGIN_FAILURE:
    case AuthActions.REGISTER_FAILURE:
      return {
        ...state,
        Auth: {
          ...state.Auth,
          isAuthenticated: false,
        },
      };

    case AuthActions.VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        Auth: {
          ...state.Auth,
          verified: true,
        },
      };

    default:
      return state;
  }
};

export default AuthReducer;
