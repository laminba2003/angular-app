import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryRoutingModule } from './country-routing.module';
import { CountryListViewComponent } from './country-list-view/country-list-view.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { ComponentsModule } from '@components/components.module';
import { NgxsModule } from '@ngxs/store';
import { CountryState } from './country.state';
import { DirectivesModule } from '@directives/directives.module';
import { CountryEditComponent } from './country-edit/country-edit.component';

@NgModule({
  declarations: [
    CountryListViewComponent,
    CountryDetailsComponent,
    CountryEditComponent
  ],
  imports: [
  CommonModule,
    CountryRoutingModule,
    ComponentsModule,
    DirectivesModule,
    NgxsModule.forFeature([CountryState])
  ]
})
export class CountryModule { }
