import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'yd-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  userForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  error: any = {
    email: '',
    password: ''
  }

  passwordType: any;
  year: number = new Date().getFullYear();

  constructor(
    private router: Router,
    private authService: AuthService,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.passwordType = 'password';
    this.authService;
  }

  onKeyup( val ){
    // if( this.user[val].length ) this.error[val] = null
  }

  passwordToggle( type ){
    this.passwordType = type;
  }

  onSubmit( evt ){
    evt.preventDefault();
    let email           = this.userForm.get('email');
    let password        = this.userForm.get('password');
    this.error.email    = '';
    this.error.password = '';
    if( email.errors ){
      this.error.email = 'Required Email!';
    }if( password.errors ){
      this.error.password = 'Required Password!';
    }else{
      if( !this.util.emailIsValid(email.value) ){
        this.error.email  = 'Invalid Email!';
      }else{
        if( this.util.emailIsValid(email.value) ){
          if( !password.errors ){
            this.authService.SignIn(email.value, password.value);
          }
        }
      }
    }
  }
}
