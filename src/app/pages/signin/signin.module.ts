import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SigninComponent } from './signin.component';
import { SigninRoutingModule } from './signin-routing.module';

@NgModule({
  declarations: [SigninComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SigninRoutingModule
  ]
})

export class SigninModule {}