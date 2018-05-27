import * as fromTodos from './todo';
import { ActionReducerMap, ActionReducer, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from '../../environments/environment.prod';

export interface State {
    todos: fromTodos.State;
}

export const reducers: ActionReducerMap<State> = {
    todos: fromTodos.reducer
};

export function logger(reducer: ActionReducer<State>): any {
    return storeLogger()(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];

export const getTodosState = createFeatureSelector<fromTodos.State>('todos');
export const getTodos = createSelector(getTodosState, state => state.todos);
