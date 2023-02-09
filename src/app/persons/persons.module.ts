import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonListViewComponent } from './person-list-view/person-list-view.component';
import { ComponentsModule } from '../components/components.module';

import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    PersonListViewComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    ComponentsModule,
    MatTableModule
  ]
})
export class PersonsModule { }
