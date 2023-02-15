import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ListView } from 'src/app/components/ListView';
import { Country } from 'src/app/model/country';
import { AuthService } from 'src/app/services/auth.service';
import { CountryDetailsComponent } from '../country-details/country-details.component';
import { GetCountries, GetCountry, DeleteCountry, SearchCountries } from '../country.actions';

@Component({
  selector: 'app-country-list-view',
  templateUrl: './country-list-view.component.html',
  styleUrls: ['./country-list-view.component.css']
})
export class CountryListViewComponent extends ListView<Country> implements OnInit {

  constructor(public auth: AuthService, private route: ActivatedRoute, store: Store, dialog: MatDialog) {
    super(store, dialog, () => { return this.getCountries() }, {
      page: (state) => state.countrystate.page,
      entity: (state) => state.countrystate.country
    }, ['name', 'capital', 'population', 'actions']);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    const id = this.route.snapshot.paramMap.get('name');
    if (id) {
      this.getCountry(id);
    }
  }

  getCountries(): void {
    this.getEntities(new GetCountries(this.page.number, this.page.size));
  }

  getCountry(name: string): void {
    this.getEntity(new GetCountry(name), CountryDetailsComponent);
  }

  editCountry(name: string, event: Event): void {
    this.editEntity(new GetCountry(name), CountryDetailsComponent, event);
  }

  deleteCountry(name: string, event: Event): void {
    this.deleteEntity(new DeleteCountry(name), event);
  }

  override handleSearch(query: string): void {
    this.getEntities(new SearchCountries(query, this.page.number, this.page.size));
  }

}