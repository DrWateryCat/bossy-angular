import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { TodoItem } from '../models/TodoItem';
import { NgForm, FormControl, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as todos from '../actions/todos';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DlDateTimePickerChange } from 'angular-bootstrap-datetimepicker';

@Component({
  selector: 'app-add-todo-modal',
  templateUrl: './add-todo-modal.component.html',
  styleUrls: ['./add-todo-modal.component.css']
})
export class AddTodoModalComponent implements OnInit {
  todo = new TodoItem('', '', new Date(), false);
  constructor(private activeModal: NgbActiveModal, private store: Store<fromRoot.State>) { }

  ngOnInit() {
  }

  onClose() {
    this.activeModal.close();
  }

  onDateTimeChange(event: DlDateTimePickerChange<Date>) {
    this.todo.due = event.value;
  }

  submit() {
    this.store.dispatch(new todos.Add(this.todo));
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.close();
  }
}
