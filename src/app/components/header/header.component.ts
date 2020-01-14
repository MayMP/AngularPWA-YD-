import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Store data in project
import { Store, select } from '@ngrx/store';
import { UserState } from '../../store/reducers/user.reducer';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() mode;
  userInfo: any;
  available_credit: number;

  constructor(
    private store: Store<UserState>,
    private router: Router,
    private authService: AuthService
  ) { 
    this.store.pipe(select( (state: any) => state.yd.user )).subscribe(user => {
      if( user['user'] ){
        this.userInfo = user['user'];
      } 
    })
  }

  ngOnInit() {
    this.available_credit = this.userInfo.credit;
  }

  useCredit(){
    this.router.navigate(['credit'], { replaceUrl: true });
  }

  logout(){
    this.authService.SignOut();
  }

}
