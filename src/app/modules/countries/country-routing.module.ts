import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListViewComponent } from './country-list-view/country-list-view.component';

const routes: Routes = [{
  path: '', pathMatch: 'full', component: CountryListViewComponent
},
{
  path: ':name', component: CountryListViewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
