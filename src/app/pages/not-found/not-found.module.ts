import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { HeaderModule } from '../../components/header/header.module';
import { MaterialModule } from '../../styles/material.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    HeaderModule,
    MaterialModule,
    NotFoundRoutingModule
  ]
})

export class NotFoundModule {  }