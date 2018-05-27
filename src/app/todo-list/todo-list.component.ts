import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from '../models/TodoItem';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() category: string;
  @Input() todos: Array<TodoItem>;
  constructor() {
  }

  ngOnInit() {
  }
}
