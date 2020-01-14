import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { SnackbarService } from '../services/snackbar.service';
import { ApiService } from './api.service';

// Store data in project
import { Store } from '@ngrx/store';
import { UserLogin } from '../store/actions/user.actions';
import { UserState } from '../store/reducers/user.reducer';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userInfo: any;
  currentPage: any;

  constructor(
    private store: Store<UserState>,
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService,
    private loadingService: LoadingService,
    private snackbarService: SnackbarService
  ){}

  SignIn( email, password ){
    this.loadingService.show();
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(result => {
      this.ngZone.run(() => {
        this.router.navigate(['dashboard'], { replaceUrl: true });
      });

      this.apiService.getUser(result.user.email).then(userInfo => {
        if( userInfo ){
          this.userInfo = userInfo;
          this.store.dispatch(new UserLogin({
            user: {
              id: this.userInfo._id,
              name: this.userInfo.name,
              credit: this.userInfo.available_credit,
              isLogin: true
            }
          }));
        }else{
          this.SignOut();
          this.snackbarService.openSnackBar('Your account is not registered in Yes Doc.', 'close', -1);
        }
        this.loadingService.hide();
      });
    }).catch(error => {
      this.loadingService.hide();
      this.snackbarService.openSnackBar(error.message, 'close', -1);
    });
  }

  SignOut() {
    this.loadingService.show();
    return this.afAuth.auth.signOut().then(() => {
      this.userInfo = null;
      this.router.navigate(['signin'], { replaceUrl: true });
      this.loadingService.hide();
    });
  }

  /** To check if user is authenticated */
  isAuthenticated() {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        if( user ){
          this.apiService.getUser(user.email).then(userInfo => {
            if( userInfo ){
              this.userInfo = userInfo;
              this.store.dispatch(new UserLogin({
                user: {
                  id: this.userInfo._id,
                  name: this.userInfo.name,
                  credit: this.userInfo.available_credit,
                  isLogin: true
                }
              }));
              resolve(userInfo);
            }else{
              this.SignOut();
              this.router.navigate(['signin'], { replaceUrl: true });
              reject(this.userInfo);
            }
          });
        }else{
          this.userInfo = null;
          this.router.navigate(['signin'], { replaceUrl: true });
          reject(this.userInfo);
        }
      })
    })
  }
}