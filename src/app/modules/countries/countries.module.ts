import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountryListViewComponent } from './country-list-view/country-list-view.component';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    CountryListViewComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    ComponentsModule
  ]
})
export class CountriesModule { }
