import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientesComponent } from './clientes.component';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';


const routes: Routes = [
  { path: '', component: ClientesComponent},
  { path: ':new', component: ClienteCadastroComponent},
  { path: ':id', component: ClienteCadastroComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
