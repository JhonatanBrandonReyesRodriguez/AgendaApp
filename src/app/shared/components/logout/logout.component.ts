import { Component } from '@angular/core';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {}
  onLogout(): void {
    let close = confirm('¿Seguro que deseas scerrar sesión?');
    if (close) {
      this.authService.logout().subscribe(
        (response) => {
          if (response.succeed) {
            console.log('logaut', response);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            this.router.navigate(['auth']);
          } else {
            console.log('error: ', response.error);
          }
        },
        (error) => {
          console.log('errorsillo', error);
        }
      );
    }
  }
}
