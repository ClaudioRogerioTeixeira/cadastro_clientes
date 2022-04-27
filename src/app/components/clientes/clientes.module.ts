import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material/material.module';
import { ClientesRoutingModule } from './clientes-routing.module';

import { ClientesComponent } from './clientes.component';
import { ClientesGridComponent } from './clientes-grid/clientes-grid.component';
import { ClienteCadastroComponent } from './cliente-cadastro/cliente-cadastro.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ClientesComponent, ClientesGridComponent, ClienteCadastroComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
  ],
  exports: [
    ClientesComponent
  ]
})
export class ClientesModule { }
