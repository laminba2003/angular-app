import { Component, OnInit } from '@angular/core';
import { ListViewComponent, State } from '@components/ListViewComponent';
import { Country } from '@app/model/country';
import { CountryDetailsComponent } from '../country-details/country-details.component';
import { GetCountries, GetCountry, DeleteCountry, SearchCountries, CreateCountry, UpdateCountry } from '../country.actions';
import { CountryEditComponent } from '../country-edit/country-edit.component';

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

  ngOnInit(): void {
    this.getParam('name').subscribe(name => this.getCountry(name));
  }

  getCountries(): void {
    this.getResources(new GetCountries(this.page.number, this.page.size));
  }

  getCountry(name: string): void {
    this.getResource(new GetCountry(name), CountryDetailsComponent);
  }

  createCountry(): void {
    this.createResource(CountryEditComponent, (country: Country) => new CreateCountry(country));
  }

  updateCountry(name: string): void {
    this.editResource(new GetCountry(name), CountryEditComponent, (country: Country) => new UpdateCountry(name, country));
  }

  deleteCountry(name: string): void {
    this.deleteResource(new DeleteCountry(name));
  }

  override handleSearch(query: string): void {
    this.getResources(new SearchCountries(query, this.page.number, this.page.size));
  }

}