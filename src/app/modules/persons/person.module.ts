import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonRoutingModule } from './person-routing.module';
import { PersonListViewComponent } from './person-list-view/person-list-view.component';
import { ComponentsModule } from '@components//components.module';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { NgxsModule } from '@ngxs/store';
import { PersonState } from './person.state';
import { DirectivesModule } from '@directives/directives.module';

@NgModule({
  declarations: [
    PersonListViewComponent,
    PersonDetailsComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    ComponentsModule,
    DirectivesModule,
    NgxsModule.forFeature([PersonState])
  ]
})
export class PersonModule { }