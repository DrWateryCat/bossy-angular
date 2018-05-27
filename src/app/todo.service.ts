import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument, DocumentChangeAction } from 'angularfire2/firestore';
import { TodoItem, todoToObject, todoFromObject } from './models/TodoItem';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { DocumentReference, Timestamp } from '@firebase/firestore-types';

@Injectable()
export class TodoService {
  todosRef: AngularFirestoreCollection<TodoItem>;
  userRef: AngularFirestoreDocument<any>;
  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    auth.authState.subscribe((user) => {
      if (user !== null) {
        this.userRef = db.collection('/users').doc('/' + user.uid);
        this.todosRef = this.userRef.collection<TodoItem>('/todos');
        this.userRef.set({
          userName: user.displayName
        });
      }
    });
  }

  getTodoList(): Observable<TodoItem[]> {
    return this.todosRef.snapshotChanges().map((arr) => {
      return arr.map((snap) => {
        const doc = snap.payload.doc;
        const data = doc.data();
        return Object.assign(todoFromObject(data), {$key: doc.id});
      });
    });
  }

  getTodo(id: string): Observable<TodoItem | null> {
    return this.todosRef.doc(id).snapshotChanges().map(it => {
      const todo = todoFromObject(it.payload.data());
      todo.$key = it.payload.id;
      return todo;
    }) as Observable<TodoItem | null>;
  }

  addTodo(todo: TodoItem): TodoItem {
    this.todosRef.add(todoToObject(todo)).then((doc) => {
      todo.$key = doc.id;
    });
    return todo;
  }

  updateTodo(id: string, value: any) {
    this.todosRef.doc(id).update(value);
  }

  deleteTodo(id: string) {
    this.todosRef.doc(id).delete();
  }
}
