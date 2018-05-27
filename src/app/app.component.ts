import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { TodoItem } from './models/TodoItem';
import * as fromRoot from './reducers';
import * as todos from './actions/todos';
import { Store } from '@ngrx/store';
import { AddTodoModalComponent } from './add-todo-modal/add-todo-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  needsToLogIn = true;
  displayName = '';
  showAddScreen = false;
  todoModel = new TodoItem('', '', new Date(), false);

  public todos$: Observable<TodoItem[]>;
  constructor(public auth: AngularFireAuth, private store: Store<fromRoot.State>, private dialog: NgbModal) {
    const firestore = firebase.firestore();
    const settings = {
      timestampsInSnapshots: true
    };
    firestore.settings(settings);
  }

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      if (user !== null) {
        console.log(user);
        this.store.dispatch(new todos.Load());
        this.todos$ = this.store.select(fromRoot.getTodos);
        this.todos$.forEach(it => it.forEach(item => console.log(item)));
      } else {
        this.dialog.open(LoginModalComponent);
      }
    });
  }

  signinSuccessful() {
  }

  googleSignIn() {
    this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(this.signinSuccessful);
  }

  phoneSignIn() {
    this.auth.auth.signInWithPopup(new firebase.auth.PhoneAuthProvider()).then(this.signinSuccessful);
  }

  emailSignIn() {
    this.auth.auth.signInWithPopup(new firebase.auth.EmailAuthProvider()).then(this.signinSuccessful);
  }

  logout() {
    this.auth.auth.signOut().then(() => this.needsToLogIn = true);
  }

  submit() {
  }

  showAddTodo() {
    const dialogRef = this.dialog.open(AddTodoModalComponent);
  }
}
