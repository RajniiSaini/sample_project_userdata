import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';


const modules = [MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatTableModule,
  MatSortModule,
  MatTooltipModule,
  MatDialogModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 1000 } }
  ]
})
export class MaterialModule { }
