import { Component, OnInit } from '@angular/core';
import { ListViewComponent, State } from '@components/ListViewComponent';
import { Country } from '@app/model/country';
import { CountryDetailsComponent } from '../country-details/country-details.component';
import { GetCountries, GetCountry, DeleteCountry, SearchCountries } from '../country.actions';

@Component({
  selector: 'app-country-list-view',
  templateUrl: './country-list-view.component.html',
  styleUrls: ['./country-list-view.component.css']
})
export class CountryListViewComponent extends ListViewComponent<Country> implements OnInit {

  constructor() {
    super(new State(state => state.countrystate.page, state => state.countrystate.country),
      () => { return this.getCountries() }, ['name', 'capital', 'population', 'actions']);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    const name = this.getParam('name');
    if (name) {
      this.getCountry(name);
    }
  }

  getCountries(): void {
    this.getResources(new GetCountries(this.page.number, this.page.size));
  }

  getCountry(name: string): void {
    this.getResource(new GetCountry(name), CountryDetailsComponent);
  }

  editCountry(name: string, event: Event): void {
    this.editResource(new GetCountry(name), CountryDetailsComponent, event);
  }

  deleteCountry(name: string, event: Event): void {
    this.deleteResource(new DeleteCountry(name), event);
  }

  override handleSearch(query: string): void {
    this.getResources(new SearchCountries(query, this.page.number, this.page.size));
  }

}