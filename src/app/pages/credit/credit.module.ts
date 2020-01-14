import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreditRoutingModule } from './credit-routing.module';
import { CreditComponent } from './credit.component';
import { CreditService } from './credit.service';
import { HeaderModule } from '../../components/header/header.module';
import { MaterialModule } from '../../styles/material.module'; 

@NgModule({
  declarations: [CreditComponent],
  imports: [
    CommonModule,
    HeaderModule,
    CreditRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [CreditService]
})

export class CreditModule {}