import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private url = environment.API_URL;
  private urlUserInfo = this.url + 'users/profile/123';
  headers = new HttpHeaders().set('X-API-Key', '7802c4c0');
  // S
  getUserInfo(): Observable<any> {
    return this.http.get(this.urlUserInfo, {
      headers: this.headers.set('Authorization', 'Bearer ' + '12345678at'),
    });
  }
}
