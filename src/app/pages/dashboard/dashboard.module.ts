import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { HeaderModule } from '../../components/header/header.module';
import { MaterialModule } from '../../styles/material.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    HeaderModule,
    DashboardRoutingModule,
    MaterialModule
  ],
  providers: [DashboardService]
})

export class DashboardModule {}