import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material-module/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormComponents } from './components/form';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { EnglishCharOnlyDirective } from './directives/english-char-only.directive';
import { ArabicCharOnlyDirective } from './directives/arabic-char-only.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';




@NgModule({
  declarations: [
    ...FormComponents,
    DataGridComponent,
    NumbersOnlyDirective,
    EnglishCharOnlyDirective,
    ArabicCharOnlyDirective,
    DataGridComponent,
    DeleteDialogComponent,
    NumbersOnlyDirective,
    EnglishCharOnlyDirective,
    ArabicCharOnlyDirective,
    DataGridComponent,
    DeleteDialogComponent,
   
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    FlexModule,
    MatIconModule,
    MatTooltipModule,
    MaterialModule ,
    RouterModule.forChild([])
  ],
  exports: [
    ...FormComponents,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    HttpClientModule,
    FlexLayoutModule,
    FlexModule,
    DataGridComponent,
    DeleteDialogComponent,
    MatIconModule,
    MaterialModule ,
  
  ]
})
export class SharedModule {}
