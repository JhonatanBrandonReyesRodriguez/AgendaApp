import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contacts-container',
  templateUrl: './contacts-container.component.html',
  styleUrls: ['./contacts-container.component.css'],
})
export class ContactsContainerComponent implements OnInit {
  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.initContacts();
  }
  public contacts = new Array();
  public total = 0;
  public id = '';
  public image = '';
  initContacts(): void {
    this.contactsService
      .getContacts({
        offset: 0,
        limit: 10,
        searchTerm: '',
      })
      .subscribe(
        (response) => {
          if (response.succeed) {
            console.log('Datos: ', response);
            this.contacts = response.result.list;
            this.total = response.result.count;
            this.id = response.result.list[0].contactId;
          } else {
            console.log('No se pudieron cargar los datos', response.error);
          }
        },

        (error) => {
          console.log('Error: ', error);
        }
      );
  }
  toCardContact() {
    this.router.navigate(['contact-info', { id: this.id }]);
  }
}
