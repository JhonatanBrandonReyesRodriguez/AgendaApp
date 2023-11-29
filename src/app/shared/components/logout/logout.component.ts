import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logout() {
    let res = confirm('¿Desea cerrar sesion?');

    if (res) {
      this.authService.logout().subscribe(
        (response) => {
          console.log(response);

          if (response.succeed) {
            console.log('sesion: ', response);

            this.router.navigate(['auth']);
          } else {
            console.log(response.error);
          }
        },
        (error) => console.log(error)
      );
    }
  }
}
