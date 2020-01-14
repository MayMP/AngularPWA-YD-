import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderService } from './header.service';
import { AuthService } from '../../services/auth.service';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent],
  providers: [AuthService, HeaderService]
})

export class HeaderModule {}