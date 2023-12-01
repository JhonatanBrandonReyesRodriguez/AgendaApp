import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: any;

  private url = environment.API_URL;

  private userLogin = this.url + 'auth/login';
  private userLogout = this.url + 'auth/logout';

  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('X-API-Key', '7802c4c0');

  login(data: any): Observable<any> {
    return this.http.put(this.userLogin, data, { headers: this.headers });
  }

  logout(): Observable<any> {
    if (this.getAuth() != undefined) {
      localStorage.clear();
    }
    return this.http.delete(this.userLogout, {
      headers: this.headers.set('Authorization', 'Bearer ' + '12345678at'),
    });
  }

  getAuth(): any {
    let lsValue = localStorage.getItem('auth');

    if (lsValue !== undefined && lsValue !== null) {
      let auth = JSON.parse(lsValue);
      return auth;
    } else {
      return undefined;
    }
  }
}
