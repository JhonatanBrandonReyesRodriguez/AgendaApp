import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Router } from '@angular/router';
import { DeleteContactService } from '../../services/deleteContact.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list-container.component.html',
  styleUrls: ['./contacts-list-container.component.css'],
})
export class ContactsListContainerComponent implements OnInit {
  constructor(
    private contactsService: ContactsService,
    private router: Router,
    private deleteContactService: DeleteContactService
  ) {}

  public counter: number = 0;
  ngOnInit(): void {
    this.initContacts();
  }
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.initContacts();
  }
  public currentPage = 1;
  public contacts = new Array();
  public total = 0;

  initContacts(): void {
    const offset = (this.currentPage - 1) * 10;
    this.contactsService
      .getContacts({
        offset: offset,
        limit: 10,
        searchTerm: '',
      })
      .subscribe({
        next: (response) => {
          if (response.succeed) {
            console.log('offset:', offset);

            console.log('Listado de contactos: ', response);
            this.contacts = response.result.list;
            this.total = response.result.count;
          } else {
            console.log('No se pudieron cargar los datos', response.error);
          }
        },
        error: (error) => {
          console.log('Error: ', error);
        },
      });
  }

  toCardContactPage(item: Object): void {
    localStorage.setItem('contact', JSON.stringify(item));
    this.router.navigate(['contact-info']);
  }

  toAddContactPage(): void {
    this.router.navigate(['add-contact']);
  }

  deleteContact(id: number): void {
    let close = confirm('¿Seguro que deseas eliminar el contacto?');
    if (close) {
      this.deleteContactService.deleteContact(id).subscribe({
        next: (response) => {
          if (response.succeed) {
            console.log('usuario borrado: ', response);
            this.counter += 1;
            console.log('Borrados: ', this.counter);
            this.initContacts();
          }
        },
        error: (error) => {
          console.log('error de borrar usuario', error);
        },
      });
    }
  }
}
