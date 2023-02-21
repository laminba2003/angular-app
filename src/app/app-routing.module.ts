import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminComponent } from '@app/components/admin/admin.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'countries',
    component: AdminComponent,
    loadChildren: () => import('./modules/countries/country.module').then(m => m.CountryModule), canActivate: [AuthGuard]
  },
  {
    path: 'persons', 
    component: AdminComponent,
    loadChildren: () => import('./modules/persons/person.module').then(m => m.PersonModule), canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
