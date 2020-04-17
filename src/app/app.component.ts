import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'producto';
  currentUser: any;

  constructor(
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.userService.auth.authState.subscribe(user => {
        this.currentUser = user;
    });
  }

  logout(): void {
    this.userService.logout();
  }

}
