import { Component, OnInit, Input } from '@angular/core';
import { TodoItem } from '../models/TodoItem';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { Edit } from '../actions/todos';
import * as todos from '../actions/todos';
import { TodoService } from '../todo.service';
import { EditTodoModalComponent } from '../edit-todo-modal/edit-todo-modal.component';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo: TodoItem;
  dateTimeStr: string;
  constructor(private store: Store<fromRoot.State>, private db: TodoService, private dialog: NgbModal) {
  }

  ngOnInit() {
    this.dateTimeStr = this.todo.due.toLocaleString('en-us');
  }

  edit() {
    const editTodoRef = this.dialog.open(EditTodoModalComponent);
    editTodoRef.componentInstance.todo = this.todo;
  }

  delete() {
    console.log(this.todo.$key);
    this.store.dispatch(new todos.Remove(this.todo.$key));
  }

  finishedChange() {
    this.todo.completed = !this.todo.completed;
    console.log(this.todo.completed);
    this.store.dispatch(new Edit(this.todo.$key, {
      completed: this.todo.completed
    }));
  }
}
