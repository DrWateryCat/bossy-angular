import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TodoService } from '../todo.service';
import * as Todos from '../actions/todos';
import { mergeMap, map, catchError, exhaustMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TodosEffects {
    @Effect()
    loadTodos$ = this.actions$.ofType(Todos.LOAD).pipe(mergeMap( action => {
        return this.todoService.getTodoList()
                               .pipe(map(res => new Todos.LoadSuccess(res)),
                                catchError(error => of(new Todos.LoadFailure(error))));
    }));

    @Effect({dispatch: false})
    loadFailure$ = this.actions$.ofType(Todos.LOAD_FAILURE).pipe(
        map((action: Todos.LoadFailure) => action.payload),
        exhaustMap(errors => {
            console.log('Server error: ', errors);
            return of(null);
        })
    );
    @Effect({dispatch: false})
    addTodos$ = this.actions$.ofType(Todos.ADD).pipe(
        map((action: Todos.Add) => action.payload),
        exhaustMap(payload => {
            const todo = this.todoService.addTodo(payload);
            return of(null);
        })
    );

    @Effect({dispatch: false})
    removeTodos$ = this.actions$.ofType<Todos.Remove>(Todos.REMOVE).map(action => {
        this.todoService.deleteTodo(action.id);
    });

    @Effect({dispatch: false})
    editTodos$ = this.actions$.ofType(Todos.EDIT).pipe(
        map((action: Todos.Edit) => {
            this.todoService.updateTodo(action.id, action.payload);
        })
    );
    constructor(private actions$: Actions, private todoService: TodoService) {}
}
