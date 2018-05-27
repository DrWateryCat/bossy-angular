import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { AddTodoModalComponent } from './add-todo-modal/add-todo-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from './todo.service';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { TodosEffects } from './effects/todo';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EditTodoModalComponent } from './edit-todo-modal/edit-todo-modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoComponent,
    AddTodoModalComponent,
    EditTodoModalComponent,
    LoginModalComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgbModule.forRoot(),
    DlDateTimePickerDateModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([TodosEffects]),
  ],
  providers: [TodoService],
  bootstrap: [AppComponent],
  entryComponents: [
    AddTodoModalComponent,
    EditTodoModalComponent,
    LoginModalComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
