import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRoutingModule } from './persons-routing.module';
import { PersonListViewComponent } from './person-list-view/person-list-view.component';
import { ComponentsModule } from '../../components/components.module';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxsModule } from '@ngxs/store';
import { PersonState } from './person.state';

@NgModule({
  declarations: [
    PersonListViewComponent,
    PersonDetailsComponent
  ],
  imports: [
    CommonModule,
    PersonsRoutingModule,
    ComponentsModule,
    MatPaginatorModule,
    NgxsModule.forFeature([PersonState])
  ]
})
export class PersonsModule { }
