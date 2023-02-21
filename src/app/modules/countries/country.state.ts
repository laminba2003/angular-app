import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Page } from "@app/model/page";
import { Country } from "@app/model/country";
import { CountryService } from './country-service';
import { DeleteCountry, GetCountry, GetCountries, SearchCountries, UpdateCountry, CreateCountry } from './country.actions';

export class CountryStateModel {
    page: Page<Country>;
    country: Country
}

@State<CountryStateModel>({
    name: 'countrystate',
    defaults: {
        page: new Page<Country>(),
        country: new Country()
    }
})
@Injectable()
export class CountryState {
    constructor(private countryService: CountryService) { }

    @Action(GetCountries)
    getCountries(ctx: StateContext<CountryStateModel>, { pageNumber, pageSize }: GetCountries) {
        return this.countryService.getCountries(pageNumber, pageSize).pipe(tap(page => {
            ctx.patchState({
                page: page
            });
        }))
    }

    @Action(GetCountry)
    getCountry(ctx: StateContext<CountryStateModel>, { name }: GetCountry) {
        return this.countryService.getCountry(name).pipe(tap(country => {
            ctx.patchState({
                country: country
            });
        }))
    }

    @Action(CreateCountry)
    createCountry(ctx: StateContext<CountryStateModel>, { country }: CreateCountry) {
        return this.countryService.createCountry(country).pipe(tap(country => {
            const state = ctx.getState();
            const page = state.page;
            page.content.unshift(country);
            page.content = page.content.slice(0, page.size);
            page.totalElements++;
            ctx.patchState({
                page: page,
                country: country
            });
        }))
    }

    @Action(UpdateCountry)
    updateCountry(ctx: StateContext<CountryStateModel>, { name, country }: UpdateCountry) {
        return this.countryService.updateCountry(name, country).pipe(tap(country => {
            const state = ctx.getState();
            const page = state.page;
            const index = page.content.findIndex(country => country.name === name);
            page.content[index] = country;
            ctx.patchState({
                page: page,
                country: country
            });
        }))
    }


    @Action(DeleteCountry)
    deleteCountry(ctx: StateContext<CountryStateModel>, { name }: DeleteCountry) {
        return this.countryService.deleteCountry(name).pipe(tap(() => {
            const state = ctx.getState();
            const page = state.page;
            page.content = page.content.filter(country => country.name !== name);
            page.totalElements--;
            ctx.patchState({
                page: page
            });
        }))
    }

    @Action(SearchCountries)
    searchCountries(ctx: StateContext<CountryStateModel>, { query, pageNumber, pageSize }: SearchCountries) {
        return this.countryService.searchCountries(query, pageNumber, pageSize).pipe(tap(page => {
            ctx.patchState({
                page: page
            });
        }))
    }
}