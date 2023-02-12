import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";

export class FetchRequest {
    static readonly type = '[Request] Fetch';
    constructor(public isLoading : boolean) { }
}

export class AppStateModel {
    isLoading: boolean
}

@State<AppStateModel>({
    name: 'appstate',
    defaults: {
        isLoading: false
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
        console.log(ctx.getState().isLoading);
    }

}