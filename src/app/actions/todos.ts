import { Action } from '@ngrx/store';

export const ADD = '[Todos] Add';
export const REMOVE = '[Todos] Remove';
export const EDIT = '[Todos] Edit';
export const LOAD = '[Todos] Load';
export const LOAD_SUCCESS = '[Todos] Load Success';
export const LOAD_FAILURE = '[Todos] Load Failed';

export class Add implements Action {
    readonly type = ADD;

    constructor(public payload: any) {}
}

export class Remove implements Action {
    readonly type = REMOVE;

    constructor(public id: string) {}
}

export class Edit implements Action {
    readonly type = EDIT;

    constructor(public id: string, public payload: any) {}
}

export class Load implements Action {
    readonly type = LOAD;
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload: any) {}
}

export class LoadFailure implements Action {
    readonly type = LOAD_FAILURE;

    constructor(public payload: any) {}
}

export type Actions = Add | Remove | Edit | Load | LoadSuccess | LoadFailure;
