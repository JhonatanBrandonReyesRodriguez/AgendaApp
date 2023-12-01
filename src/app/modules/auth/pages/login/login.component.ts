import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  //
  userControl: string = 'authUser';
  passwordControl: string = 'authPassword';
  //

  formLogin = new FormGroup({
    authUser: new FormControl('', [
      Validators.minLength(2),
      Validators.required,
    ]),
    authPassword: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    console.log('is form valid?', this.formLogin.valid);
    const userData = this.formLogin.value;
    if (this.formLogin.valid) {
      this.authService.login(userData).subscribe({
        next: (response) => {
          if (response.succeed) {
            console.log('Sesión: ', response);
            this._snackBar.open('¡Bienvenido!', 'Aceptar', {
              duration: 3000,
              panelClass: ['green-snackbar'],
            });

            localStorage.setItem('accessToken', response.result.accessToken);
            localStorage.setItem('refreshToken', response.result.refreshToken);
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
            'Error en la comunicación con el servidor',
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
}
