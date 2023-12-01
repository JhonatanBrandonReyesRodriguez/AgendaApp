import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public userService: UserService) {}
  ngOnInit(): void {
    this.getUser();
  }

  public user: any;

  public getUser() {
    this.userService.getUserInfo().subscribe({
      next: (response) => {
        if (response.succeed) {
          console.log('User: ', response);
          this.user = response.result.user;
        }
      },
      error: (error) => {
        console.log('Error: ', error);
      },
    });
  }
}
