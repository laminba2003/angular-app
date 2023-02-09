import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'countries',
    component: LayoutComponent,
    loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule), canActivate: [AuthGuard]
  },
  {
    path: 'persons', 
    component: LayoutComponent,
    loadChildren: () => import('./persons/persons.module').then(m => m.PersonsModule), canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
