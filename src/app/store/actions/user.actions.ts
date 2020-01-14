import { Action } from '@ngrx/store';
import { UserActionTypes } from '../types/user.types';
import { UserModule } from '../../modules/user.module';

export class UserLogin implements Action {
  readonly type = UserActionTypes.ACTION_LOGIN;
  constructor(
    public payload: { user: UserModule }
  ) {}
}

export class UserLogout implements Action {
  readonly type = UserActionTypes.ACTION_LOGOUT;
}