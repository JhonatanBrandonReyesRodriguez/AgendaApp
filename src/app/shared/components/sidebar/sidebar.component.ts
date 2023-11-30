import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactsService } from '../../../modules/contacts/services/contacts.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private contactsService: ContactsService) {}
  ngOnInit(): void {
    this.initContacts();
  }
  @Output() contact = new EventEmitter<number>();
  public contacts = new Array();
  public total = 0;
  public id = '';

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
            this.contact.emit(response.result.list.contactId);
          } else {
            console.log('No se pudieron cargar los datos', response.error);
          }
        },

        (error) => {
          console.log('Error: ', error);
        }
      );
  }
}
