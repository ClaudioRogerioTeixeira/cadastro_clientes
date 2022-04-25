import { NgModule } from '@angular/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';

const MODULES = [
  MatToolbarModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatTooltipModule,
  MatInputModule,
  MatRadioModule,
  MatFormFieldModule,
  MatTabsModule,
  MatSelectModule,
  MatSnackBarModule,
  MatDialogModule,
  MatPaginatorModule
]

@NgModule({
  declarations: [],
  imports: [MODULES],
  exports: [MODULES]
})
export class MaterialModule { }
