/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContactsService } from './services/contacts.service';

describe('Service: Contacts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactsService],
    });
  });

  it('should ...', inject([ContactsService], (service: ContactsService) => {
    expect(service).toBeTruthy();
  }));
});
