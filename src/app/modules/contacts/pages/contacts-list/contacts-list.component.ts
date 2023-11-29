import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
})
export class ContactsListComponent implements OnInit {
  constructor(private contactsService: ContactsService) {}
  ngOnInit(): void {
    // this.initList();
  }

  public contacts = new Array();

  // initList(): void {
  //   this.contactsService
  //     .getContacts({ offset: 1, limit: 10, searchTerm: 'contacto' })
  //     .subscribe(
  //       (response) => {
  //         if (response.succeed) {
  //           console.log('datos: ', response);
  //           this.contacts = response.result.list;
  //         } else {
  //           console.log('no se pudieron cargar los datos', response.message);
  //         }
  //       },
  //       (error) => console.log('ERROR: ', error)
  //     );
  // }

  ///
}
