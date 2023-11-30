import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsContainerComponent } from './contacts-container.component';

describe('ContactsListComponent', () => {
  let component: ContactsContainerComponent;
  let fixture: ComponentFixture<ContactsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsContainerComponent],
    });
    fixture = TestBed.createComponent(ContactsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
