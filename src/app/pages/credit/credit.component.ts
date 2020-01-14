import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util.service';
import { CreditService } from './credit.service';
import { LoadingService } from '../../services/loading.service';
import { SnackbarService } from '../../services/snackbar.service';
import * as moment from 'moment';

// Store data in project
import { Store, select } from '@ngrx/store';
import { UserState } from '../../store/reducers/user.reducer';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss']
})
export class CreditComponent implements OnInit {

  credit_score: FormControl = new FormControl();
  credit_date: FormControl = new FormControl();

  userInfo: any;
  error: any = {
    credit_score: '',
    credit_date: ''
  }

  constructor(
    private router: Router,
    private store: Store<UserState>,
    private utilService: UtilService,
    private creditService: CreditService,
    private loadingService: LoadingService,
    private snackbarService: SnackbarService
  ) {
    this.store.pipe(select( (state: any) => state.yd.user )).subscribe(user => {
      if( user['user'] ){
        this.userInfo = user['user'];
      } 
    })
  }

  ngOnInit() {
    this.onChangeDate();
  }

  onChangeDate(){
    this.credit_date.valueChanges.subscribe(result => {
      this.error.credit_date = "";
    });
  }

  checkCredit() {
    this.error.credit_score = "";

    if( this.credit_score.value != "" ){
      if( this.utilService.numberIsValid(this.credit_score.value) ) {
        this.error.credit_score = "Please only enter number except 0!";

      }else{
        let score = Number(this.credit_score.value);
        if( score == 0 )
          this.error.credit_score = "Please only enter number except 0!";
        
        this.credit_score.setValue(score);
      }
    }
  }

  cancelCredit(){
    this.router.navigate(['dashboard'], { replaceUrl: true });
  }

  updateCredit(){
    let checked = this.checkError();

    if( checked ){

      this.error = { credit_score: '', credit_date: '' };

      let credit = {
        id: this.userInfo.id,
        available_credit: Number(this.userInfo.credit),
        used_credit: Number(this.credit_score.value),
        date: moment(this.credit_date.value).format("YYYY-MM-DD")
      };

      this.loadingService.show();

      this.creditService.updateCreditData( credit ).then(result => {
        this.loadingService.hide();
        if( result['success'] == true ){
          this.store.pipe(select( (state: any) => state.yd.user )).subscribe(user => {
            if( user['user'] ){
              user['user']['credit'] = result['data'];
            } 
          })
          this.snackbarService.openSnackBar(result['message'], 'close', 1);
          this.router.navigate(['dashboard'], { replaceUrl: true });
        }else{
          this.snackbarService.openSnackBar(result['message'], 'close', -1);
        }
      });
    }
  }

  checkError() {

    let checked = false;

    if( this.credit_score.value == null || this.error.credit_score != "" ){
      this.error.credit_score = "Please enter number except 0!";
      checked                 = false;
      return checked;
    }else{
      checked = true;
    }

    if( this.credit_date.value == null || this.error.credit_date != "" ){
      this.error.credit_date = "Please enter date!";
      checked                = false;
      return checked;
    }else{
      checked = true;
    }

    return checked;
  }

}
