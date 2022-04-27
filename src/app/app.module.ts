import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from "@angular/common/http";

// Modules
// import { ClientesModule } from './components/clientes/clientes.module';
// import { DashboardModule } from './components/dashboard/dashboard.module';
import { CoreModule } from './core/core.module';

// Angular Material
import { MaterialModule } from './material/material.module';

// ngx-mask
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // @angular
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // feature
    // ClientesModule,
    // DashboardModule,

    // app
    FlexLayoutModule,
    MaterialModule,
    CoreModule,

    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
