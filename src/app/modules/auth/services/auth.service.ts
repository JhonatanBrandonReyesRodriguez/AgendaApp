import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://my.api.mockaroo.com/sa/exercise/auth/login';
  private urlLogout = 'https://my.api.mockaroo.com/sa/exercise/auth/logout';

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders().set('X-API-Key', '7802c4c0');
  login(data: any): Observable<any> {
    return this.http.put(this.url, data, { headers: this.headers });
  }

  logout(): Observable<any> {
    const headersLogout = new HttpHeaders().set(
      'Authorization',
      'Bearer 12345678at'
    );

    return this.http.delete(this.urlLogout, {
      headers: this.headers.set('Authorization', 'Bearer ' + '12345678at'),
    });
  }
}
