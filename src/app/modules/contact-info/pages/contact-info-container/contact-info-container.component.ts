import { Component, OnInit } from '@angular/core';
import { ContactInfoService } from '../../services/contact-info.service';

@Component({
  selector: 'app-contact-info-container',
  templateUrl: './contact-info-container.component.html',
  styleUrls: ['./contact-info-container.component.css'],
})
export class ContactInfoContainerComponent implements OnInit {
  constructor(private contactInfoService: ContactInfoService) {}

  ngOnInit() {
    this.initContactInfo();
  }
  //
  public contact = new Array();
  initContactInfo(): void {
    this.contactInfoService.getOneContact({ idContact: '1' }).subscribe({
      next: (response) => {
        if (response.succeed) {
          console.log('Datos: ', response);
          this.contact = response.result.list;
        } else {
          console.log('No se pudieron cargar los datos', response.error);
        }
      },
      error: (error) => {
        console.log('Error: ', error);
      },
    });
  }
}
