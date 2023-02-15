import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesRoutingModule } from './countries-routing.module';
import { CountryListViewComponent } from './country-list-view/country-list-view.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { ComponentsModule } from '../../components/components.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxsModule } from '@ngxs/store';
import { CountryState } from '../countries/country.state';


@NgModule({
  declarations: [
    CountryListViewComponent,
    CountryDetailsComponent
  ],
  imports: [
  CommonModule,
    CountriesRoutingModule,
    ComponentsModule,
    ComponentsModule,
    MatPaginatorModule,
    NgxsModule.forFeature([CountryState])
  ]
})
export class CountriesModule { }
