import { TodoItem } from './TodoItem';

export interface TodoCategory {
    title: string;
    items: TodoItem[];
}
