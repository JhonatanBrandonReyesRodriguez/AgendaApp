import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  OnInit,
} from '@angular/core';
import { DynamicHostDirective } from 'src/app/shared/directives/dynamic-host.directive';
import { DynamicPhoneComponent } from '../../../../shared/components/dynamic-phone/dynamic-phone.component';
import { AddContactService } from '../../services/add-contact.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactFormComponent implements OnInit {
  //form control names
  contactPhoto: string = 'contactPhoto';
  contactFirstName: string = 'contactFirstName';
  contactLastName: string = 'contactLastName';
  contactCompany: string = 'contactCompany';
  contactEmails: string = 'contactEmails';
  contactBirthday: string = 'contactBirthday';
  contactAlias: string = 'contactAlias';
  contactNotes: string = 'contactNotes';
  contactTags: string = 'contactTags';
  contactPhones: string = 'contactPhones';
  phoneValue: string = 'phoneValue';

  //form group
  addContactForm!: FormGroup;

  //form arrays
  emailsArray: any;
  phonesArray: any;
  tagsArray: any;

  @ViewChild(DynamicHostDirective, { read: ViewContainerRef })
  public dynamicHost!: ViewContainerRef;
  private componentRef!: ComponentRef<DynamicPhoneComponent>;
  public componentReference: ComponentRef<DynamicPhoneComponent>[] = [];

  public phoneIndex!: number;

  auxPhoneArray: any = [];

  constructor(
    private addContactService: AddContactService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.addContactForm = this.formBuilder.group({
      contactPhoto: new FormControl(''),
      contactFirstName: new FormControl('', [Validators.required]),
      contactLastName: new FormControl('', [Validators.required]),
      contactCompany: new FormControl(''),
      contactEmails: this.formBuilder.array([]),
      contactBirthday: new FormControl('', [Validators.required]),
      contactAlias: new FormControl(''),
      contactNotes: new FormControl(''),
      contactTags: this.formBuilder.array([]),
      contactPhones: this.formBuilder.array([]),
    });
  }
  ngOnInit(): void {}

  public createComponent(
    phoneGroup: FormGroup,
    phoneControl: FormControl
  ): void {
    this.componentRef = this.dynamicHost.createComponent(DynamicPhoneComponent);
    this.componentRef.instance.phoneGroup = phoneGroup;
    this.componentRef.instance.phoneControl = phoneControl;
    this.componentReference.push(this.componentRef);
    this.phoneIndex = this.componentReference.length;
  }

  //returns PHONES as a form array
  get contactPhonesFormArray(): FormArray {
    return this.addContactForm.get('contactPhones') as FormArray;
  }

  public addNewPhone(): void {
    const phoneFormGroup = new FormGroup({
      phoneId: new FormControl('', Validators.required),
      phoneValue: new FormControl('', Validators.required),
      phoneType: new FormControl('', Validators.required),
    });

    const phone = phoneFormGroup.controls.phoneValue;
    this.auxPhoneArray.push(phoneFormGroup);

    if (this.componentReference) {
      this.createComponent(phoneFormGroup, phone);
    }
  }
  public deleteComponent(index: number): void {
    this.contactPhonesFormArray.removeAt(index);
    if (this.componentReference[index]) {
      this.componentReference[index].destroy();
      this.componentReference.splice(index, 1);
    }
  }

  //
  validateInputInsertion() {
    if (this.auxPhoneArray.length > 0) {
      for (let i = 0; i < this.phoneIndex; i++) {
        this.contactPhonesFormArray.push(this.auxPhoneArray[i]);
      }
    }
  }

  public addContact(): void {
    this.validateInputInsertion();
    const contactData = this.addContactForm.value;

    this.localStorageService.setItem('new contact', contactData);
    console.log('Información del nuevo contacto: ', contactData);

    if (this.addContactForm.valid) {
      this.addContactService.addContact(contactData).subscribe({
        next: (response) => {
          if (response.succeed) {
            console.log('Contacto creado :', response);
            this._snackBar.open('Contacto creado con éxito', 'Aceptar', {
              duration: 5000,
              panelClass: ['green-snackbar'],
            });

            this.router.navigate(['home/contacts']);
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
}
