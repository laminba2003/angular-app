import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports:[
    HeaderComponent,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class ComponentsModule { }
