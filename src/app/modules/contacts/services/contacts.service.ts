import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('X-API-Key', '7802c4c0');

  urlContacts = 'https://my.api.mockaroo.com/sa/exercise/contacts';
  getContacts(data: any): Observable<any> {
    return this.http.put(this.urlContacts, data, {
      headers: this.headers.set('Authorization', 'Bearer ' + '12345678at'),
    });
  }
}
