import type {ChangePassword, UpdateInformation, User, UserReducer} from '@type/user.types';

import UserActions from './actions';

const initState: UserReducer = {
  Auth: {
    id: 0,
  },
};

const Reducer = (
  state = initState,
  action: { type: string; payload: { c: User, data: ChangePassword, UpdateInformation: UpdateInformation}},
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
      };
    default:
      return state;
  }
};

export default Reducer;
