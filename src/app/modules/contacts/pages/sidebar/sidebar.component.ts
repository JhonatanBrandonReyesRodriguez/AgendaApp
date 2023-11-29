import { Component } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private contactsService: ContactsService) {}
  ngOnInit(): void {
    this.initList();
  }

  public contacts = new Array();

  initList(): void {
    this.contactsService
      .getContacts({ offset: 1, limit: 10, searchTerm: 'contacto' })
      .subscribe(
        (response) => {
          if (response.succeed) {
            console.log('Datos:', response);
            this.contacts = response.result.list;
          } else {
            console.log('no se pudieron cargar los datos', response.message);
          }
        },
        (error) => console.log('ERROR: ', error)
      );
  }
}
