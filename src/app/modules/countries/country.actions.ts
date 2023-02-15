import { Country } from '../../model/country';

export class GetCountries {
    static readonly type = '[Countries] Fetch';
    constructor(public pageNumber : number, public pageSize : number ) { }
}

export class GetCountry {
    static readonly type = '[Country] Fetch';
    constructor(public name : string) { }
}

export class AddCountry {
    static readonly type = '[Country] Add';
    constructor(public payload: Country) { }
}

export class UpdateCountry {
    static readonly type = '[Country] Update';
    constructor(public payload: Country, public id: number) { }
}

export class DeleteCountry {
    static readonly type = '[Country] Delete';
    constructor(public name: string) { }
}

export class SearchCountries {
    static readonly type = '[Countries] Search';
    constructor(public query: string, public pageNumber : number, public pageSize : number) { }
}