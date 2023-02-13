import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";

export class FetchRequest {
    static readonly type = '[Request] Fetch';
    constructor(public isLoading : boolean) { }
}

export class SetRoles {
    static readonly type = '[roles] setRoles';
    constructor(public roles : string[]) { }
}

export class AppStateModel {
    isLoading: boolean;
    roles: string[]
}

@State<AppStateModel>({
    name: 'appstate',
    defaults: {
        isLoading: false,
        roles: []
    }
})
@Injectable()
export class AppState {

    constructor() { }

    @Action(FetchRequest)
    setLoading(ctx: StateContext<AppStateModel>, {isLoading} : FetchRequest) {
        ctx.patchState({
            isLoading: isLoading
        });
    }

    @Action(SetRoles)
    setRoles(ctx: StateContext<AppStateModel>, {roles} : SetRoles) {
        ctx.patchState({
            roles: roles
        });
    }

}