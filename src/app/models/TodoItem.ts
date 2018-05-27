import { Timestamp } from '@firebase/firestore-types';

export class TodoItem {
    $key: string;
    title: string;
    desc: string;
    due: Date;
    completed: boolean;

    constructor(title: string, desc: string, due: Date, completed: boolean) {
        this.title = title;
        this.desc = desc;
        this.due = due;
        this.completed = completed;
    }
}

export function todoToObject(item: TodoItem): any {
    return {
        title: item.title,
        desc: item.desc,
        due: item.due,
        completed: item.completed
    };
}

export function todoFromObject(object: any): TodoItem {
    const ret = new TodoItem(object.title, object.desc, new Date(object.due.seconds * 1000), object.completed);
    ret.$key = object.$key;
    return ret;
}
