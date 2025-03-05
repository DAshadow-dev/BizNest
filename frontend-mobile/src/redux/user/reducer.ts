import type {ChangePassword, UpdateInformation, User, UserReducer} from '@type/user.types';

import UserActions from './actions';

const initState: UserReducer = {
  Auth: {
    id: 0,
    username: '',
    email: '',
    phone: '',
    image: '',
  },
};

const Reducer = (
  state = initState,
  action: { type: string; payload: { c: User, data: any}},
) => {
  switch (action.type) {
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
