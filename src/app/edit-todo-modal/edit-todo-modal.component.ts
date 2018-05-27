import { Component, OnInit, Input, Inject, ViewChild } from '@angular/core';
import { TodoItem, todoToObject } from '../models/TodoItem';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as todos from '../actions/todos';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DlDateTimePickerChange, DlDateTimePickerComponent } from 'angular-bootstrap-datetimepicker';

@Component({
  selector: 'app-edit-todo-modal',
  templateUrl: './edit-todo-modal.component.html',
  styleUrls: ['./edit-todo-modal.component.scss']
})
export class EditTodoModalComponent implements OnInit {
  @ViewChild('dateTimePicker') dateTimePicker: DlDateTimePickerComponent<Date>;
  @Input() todo: TodoItem;

  editTodoGroup: FormGroup;
  showDateTimePicker = false;
  constructor(@Inject(FormBuilder) fb: FormBuilder,
               private dialog: NgbActiveModal, private store: Store<fromRoot.State>) {
      this.editTodoGroup = fb.group({
        titleControl: ['', Validators.required],
        descControl: ['', Validators.required]
      });
      console.log(this.editTodoGroup);
  }

  ngOnInit() {
    this.editTodoGroup.controls['titleControl'].setValue(this.todo.title);
    this.editTodoGroup.controls['descControl'].setValue(this.todo.desc);
  }

  onDateTimeChange(event: DlDateTimePickerChange<Date>) {
    this.todo.due = event.value;
  }

  submit() {
    this.todo.title = this.editTodoGroup.get('titleControl').value;
    this.todo.desc = this.editTodoGroup.get('descControl').value;
    this.store.dispatch(new todos.Edit(this.todo.$key, todoToObject(this.todo)));
    this.dialog.close();
  }

  cancel() {
    this.dialog.close();
  }
}
