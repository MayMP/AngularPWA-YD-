import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

// Store data in project
import { Store, select } from '@ngrx/store';
import { UserState } from '../../store/reducers/user.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userInfo: any;
  userData: any = [];

  constructor(
    private store: Store<UserState>,
    private dashboardService: DashboardService
  ) {
    this.store.pipe(select( (state: any) => state.yd.user )).subscribe(user => {
      if( user['user'] ){
        this.userInfo = user['user'];
      } 
    })
  }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userData = undefined;
    this.dashboardService.getUserData(this.userInfo.id).then(result => {
      if( result != undefined )
        this.userData = result;
    });
  }
}
