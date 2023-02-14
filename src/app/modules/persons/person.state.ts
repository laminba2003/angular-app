import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Page } from "../../model/page";
import { Person } from "../../model/person";
import { PersonService } from './person-service';
import { DeletePerson, GetPerson, GetPersons, SearchPersons } from './person.actions';

export class PersonStateModel {
    page: Page<Person>;
    person: Person
}

@State<PersonStateModel>({
    name: 'personstate',
    defaults: {
        page: new Page<Person>(),
        person: new Person()
    }
})
@Injectable()
export class PersonState {
    constructor(private personService: PersonService) { }

    @Action(GetPersons)
    getPersons(ctx: StateContext<PersonStateModel>, { pageNumber, pageSize }: GetPersons) {
        return this.personService.getPersons(pageNumber, pageSize).pipe(tap(page => {
            const state = ctx.getState();
            ctx.setState({
                ...state,
                page: page
            })
        }))
    }

    @Action(GetPerson)
    getPerson(ctx: StateContext<PersonStateModel>, { id }: GetPerson) {
        return this.personService.getPerson(id).pipe(tap(person => {
            const state = ctx.getState();
            ctx.setState({
                ...state,
                person: person
            })
        }))
    }

    @Action(DeletePerson)
    deletePerson(ctx: StateContext<PersonStateModel>, { id }: DeletePerson) {
        return this.personService.deletePerson(id).pipe(tap(() => {
            const state=ctx.getState();
            state.page.content = state.page.content.filter(person => person.id!==id);
            state.page.totalElements--;
            ctx.setState({
                ...state,
                page: state.page
            })
        }))
    }

    @Action(SearchPersons)
    searchPersons(ctx: StateContext<PersonStateModel>, { query, pageNumber, pageSize }: SearchPersons) {
        return this.personService.searchPersons(query, pageNumber, pageSize).pipe(tap(page => {
            const state = ctx.getState();
            ctx.setState({
                ...state,
                page: page
            })
        }))
    }
}