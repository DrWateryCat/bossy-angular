import * as todos from '../actions/todos';
import { TodoItem } from '../models/TodoItem';

export interface State {
    todos: Array<TodoItem>;
}

const initialState: State = {
    todos: []
};

export function reducer(state = initialState, action: todos.Actions): State {
    switch (action.type) {
        case todos.LOAD_SUCCESS:
            return {
                ...state, todos: action.payload
            };
        default:
            return state;
    }
}

