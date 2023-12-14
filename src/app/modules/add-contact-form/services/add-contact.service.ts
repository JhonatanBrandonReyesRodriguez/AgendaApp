import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddContactService {
  constructor(private http: HttpClient) {}
  private url = environment.apiUrl;
  private updateUserUrl = this.url + 'contacts/create';
  private apiKey = environment.apiKey;

  addContact(contactData: any): Observable<any> {
    const url = `${this.updateUserUrl}?key=${this.apiKey}`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer 12345678at',
    });

    return this.http.post(url, contactData, { headers });
  }
}
