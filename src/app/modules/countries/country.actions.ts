import { Country } from '@app/model/country';

export class GetCountries {
    static readonly type = '[Countries] Fetch';
    constructor(public pageNumber : number, public pageSize : number ) { }
}

export class GetCountry {
    static readonly type = '[Country] Fetch';
    constructor(public name : string) { }
}

export class CreateCountry {
    static readonly type = '[Country] Create';
    constructor(public country: Country) { }
}

export class UpdateCountry {
    static readonly type = '[Country] Edit';
    constructor(public name: string, public country: Country) { }
}

export class DeleteCountry {
    static readonly type = '[Country] Delete';
    constructor(public name: string) { }
}

export class SearchCountries {
    static readonly type = '[Countries] Search';
    constructor(public query: string, public pageNumber : number, public pageSize : number) { }
}