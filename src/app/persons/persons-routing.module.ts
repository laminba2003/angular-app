import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListViewComponent } from './person-list-view/person-list-view.component';

const routes: Routes = [{
  path: '', component: PersonListViewComponent,
},
{
  path: ':id', component: PersonListViewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }
