import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonListViewComponent } from './person-list-view/person-list-view.component';
import { ComponentsModule } from '../components/components.module';

import {MatTableModule} from '@angular/material/table';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    PersonListViewComponent,
    PersonDetailsComponent,
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    ComponentsModule,
    MatTableModule,
    MatDialogModule
  ]
})
export class PersonsModule { }
