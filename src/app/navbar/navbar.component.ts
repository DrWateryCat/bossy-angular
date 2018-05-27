import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  buttonText = 'Log In';

  @Output() clickedAction: EventEmitter<void>;
  constructor(public auth: AngularFireAuth) {
    auth.authState.subscribe(state => {
      if (state) {
        this.buttonText = 'Log Out';
      } else {
        this.buttonText = 'Log In';
      }
    });
  }

  ngOnInit() {
  }

  buttonAction() {
    this.auth.auth.signOut().then(() => {
    });
  }
}
