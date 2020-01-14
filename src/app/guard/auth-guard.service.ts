import { Injectable } from '@angular/core';
import { Router, Route, CanLoad } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Store data in project
import { Store, select } from '@ngrx/store';
import { UserState } from '../store/reducers/user.reducer';

@Injectable()

export class AuthGuard implements CanLoad {
  userInfo: any;
  loadedPage: any;
  urlparam: any;

  constructor(
    private store: Store<UserState>,
    private router: Router,
    private authService: AuthService
  ){
    this.store.pipe(select( (state: any) => state.yd.user )).subscribe(user => {
      if( user['user'] ){
        this.userInfo = user['user'];
      } 
    })
  }

  /**
   * To guard route, if user is logined in
   * @param route
   */
  canLoad(route: Route): any {
    this.loadedPage = window.location.pathname;
    this.urlparam   = window.location.search;

    if( this.userInfo && this.userInfo.isLogin )
      return true;

    return this.authService.isAuthenticated().then(user => {
      if( user )
        return true;
      else{
        this.router.navigate(['/signin']);
        return false;
      }
    });
  }
}