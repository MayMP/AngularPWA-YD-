import { UserActionTypes } from '../types/user.types';
import { UserModule } from '../../modules/user.module';

export interface UserState {
  user: UserModule
}

export const initialLoginState: UserState = {
  user: new UserModule({
    id: '',
    name: '',
    credit: '',
    isLogin: false
  })
}

export function UserReducer(state = initialLoginState, action): UserState {
  switch (action.type) {
    case UserActionTypes.ACTION_LOGOUT:
      return {
        ...state,
        user: new UserModule({
          isLogin: false
        })
      };
    case UserActionTypes.ACTION_LOGIN:
      return {
        ...state,
        user: new UserModule({
          ...action.payload
        })
      };
  }
  return state;
}