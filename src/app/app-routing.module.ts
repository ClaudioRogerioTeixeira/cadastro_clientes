import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './core/components/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'clientes', loadChildren: () => import('./components/clientes/clientes.module').then((m) => m.ClientesModule) },
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then((m) => m.DashboardModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
