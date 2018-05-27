import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors} from '@angular/forms';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import { UserCredential } from '@firebase/auth-types';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({selector: 'app-login-modal', templateUrl: './login-modal.component.html', styleUrls: ['./login-modal.component.scss']})
export class LoginModalComponent implements OnInit {
  currentStateStr = 'Sign in';
  emailInUse = false;
  passwordInvalid = false;
  loginError = '';

  loginForm = new FormGroup({
    emailInput: new FormControl('', [Validators.required, Validators.email]),
    passwordInput: new FormControl('', [
      Validators.required, Validators.minLength(8)
    ])
  });

  signupForm = new FormGroup({
    emailInput: new FormControl('', [Validators.required, Validators.email]),
    passwordInput: new FormControl('', [
      Validators.required, Validators.minLength(8)
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required, this.matchesOther('passwordInput')
    ])
  });

  loginEmailClasses = {
    'form-control': true,
    'is-invalid': !this.signupForm.valid
  };

  get signupEmail() {
    return this
      .signupForm
      .get('emailInput');
  }
  get signupEmailErrorMessage() {
    return this
      .signupEmail
      .hasError('required')
      ? 'You must enter an email address'
      : this
        .signupEmail
        .hasError('email')
        ? 'The email address you enterred was invalid.'
      : this.emailInUse
        ? 'That email address already exists in our database. Try a new one?'
      : '';
  }
  constructor(private modal: NgbActiveModal, private auth: AngularFireAuth) {}

  ngOnInit() {}

  emailSubmit() {
    if (this.loginForm.valid) {
      const userPass = this.loginForm.value;
      this.auth.auth.signInWithEmailAndPassword(userPass.emailInput, userPass.passwordInput).then(res => {
        this.modal.close();
      }).catch(err => {
        console.log(err);
        const errorCode = err.code;
        const errorMessage = err.message;
        if (errorCode === 'auth/wrong-password') {
          this.loginError = 'Wrong Password, or that email doesn\'t exist in our database.';
        }
      });
    }
  }

  emailSignup() {
    if (this.signupForm.valid) {
      const user = this.signupForm.value;
      console.log(user);
      this.auth.auth.createUserWithEmailAndPassword(user.emailInput, user.passwordInput).then((value: UserCredential) => {
        console.log('Created user ' + value.user.displayName);
        this.modal.close();
      }).catch(reason => {
        switch (reason.code) {
          case 'auth/email-already-in-use':
            this.emailInUse = true;
            break;
          case 'auth/weak-password':
          default:
            break;
        }
      });
    }
  }

  signInSuccessful() {}

  matchesOther(other: string): ValidatorFn {
    let thisControl: FormControl;
    let thatControl: FormControl;

    return function matchOtherValidate(control: FormControl): ValidationErrors {
      if (!control.parent) {
        return null;
      }

      if (!thisControl) {
        thisControl = control;
        thatControl = control
          .parent
          .get(other)as FormControl;

        thatControl
          .valueChanges
          .subscribe(() => {
            thisControl.updateValueAndValidity();
          });
      }

      if (!thatControl) {
        return null;
      }

      if (thatControl.value !== thisControl.value) {
        return {matchOther: true};
      }

      return null;
    };
  }

  googleLogin() {
    this
      .auth
      .auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(this.signInSuccessful);
  }

  phoneLogin() {
    this
      .auth
      .auth
      .signInWithPopup(new firebase.auth.PhoneAuthProvider())
      .then(this.signInSuccessful);
  }
}
