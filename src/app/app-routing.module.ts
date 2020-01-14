import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'signin', loadChildren: () => import('./pages/signin/signin.module').then(mod => mod.SigninModule) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(mod => mod.DashboardModule), canLoad: [AuthGuard] },
  { path: 'credit', loadChildren: () => import('./pages/credit/credit.module').then(mod => mod.CreditModule), canLoad: [AuthGuard] },
  { path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(mod => mod.NotFoundModule), canLoad: [AuthGuard] },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
