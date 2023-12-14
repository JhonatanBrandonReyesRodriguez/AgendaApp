import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/modules/auth/services/user.service';
import { UserInfoService } from 'src/app/shared/services/userInfo.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private userInfoService: UserInfoService,
    private localStorageService: LocalStorageService
  ) {}

  userControl: string = 'authUser';
  passwordControl: string = 'authPassword';

  formLogin = new FormGroup({
    authUser: new FormControl('', [
      Validators.minLength(2),
      Validators.required,
    ]),
    authPassword: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    const userData = this.formLogin.value;
    if (this.formLogin.valid) {
      this.authService.login(userData).subscribe({
        next: (response) => {
          if (response.succeed) {
            console.log('datos: ', response);
            this._snackBar.open('¡Bienvenido!', 'Aceptar', {
              duration: 5000,
              panelClass: ['green-snackbar'],
            });

            this.localStorageService.setItem(
              'accessToken',
              response.result.accessToken
            );
            this.localStorageService.setItem(
              'refreshToken',
              response.result.refreshToken
            );

            this.setUserInfo();

            this.router.navigate(['home/contacts']);
          } else {
            console.log('Inicio de sesión fallido:', response.message);
            this._snackBar.open(
              'Inicio de sesión fallido, usuario o contraseña incorrectos',
              'Aceptar',
              {
                duration: 3000,
                panelClass: ['red-snackbar'],
              }
            );
          }
        },
        error: (error) => {
          console.log(error);
          this._snackBar.open(
            'Error en la comunicación con el servidor, intentelo más tarde',
            'Aceptar',
            {
              duration: 3000,
              panelClass: ['red-snackbar'],
            }
          );
        },
      });
    }
  }

  setUserInfo() {
    let user: any;
    this.userService.getUserInfo().subscribe({
      next: (response) => {
        if (response.succeed) {
          console.log('User: ', response);
          user = response.result.user;
          this.userInfoService.changeUserData(user);
        }
      },
      error: (error) => {
        console.log('Error:', error);
      },
    });
  }

  toRegisterPage() {
    this.router.navigate(['auth/register']);
  }
}
