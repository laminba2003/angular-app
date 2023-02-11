import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Page } from "../model/page";
import { Person } from "../model/person";
import { PersonService } from './person-service';
import { GetPerson, GetPersons } from './person.actions';

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

    @Selector()
    static selectStatePersonsData(state: PersonStateModel) {
        return state.page;
    }
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

    @Selector()
    static selectStatePersonData(state: PersonStateModel) {
        return state.person;
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
}