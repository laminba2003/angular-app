import { Person } from '@app/model/person';

export class GetPersons {
    static readonly type = '[Persons] Fetch';
    constructor(public pageNumber : number, public pageSize : number ) { }
}

export class GetPerson {
    static readonly type = '[Person] Fetch';
    constructor(public id : number) { }
}

export class AddPerson {
    static readonly type = '[Person] Add';
    constructor(public payload: Person) { }
}

export class UpdatePerson {
    static readonly type = '[Person] Update';
    constructor(public payload: Person, public id: number) { }
}

export class DeletePerson {
    static readonly type = '[Person] Delete';
    constructor(public id: number) { }
}

export class SearchPersons {
    static readonly type = '[Persons] Search';
    constructor(public query: string, public pageNumber : number, public pageSize : number) { }
}