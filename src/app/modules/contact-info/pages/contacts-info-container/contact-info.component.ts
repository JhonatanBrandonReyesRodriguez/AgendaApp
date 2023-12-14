import {
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Email } from 'src/app/core/interfaces/email';
import { Phone } from 'src/app/core/interfaces/phone';
import { Tag } from 'src/app/core/interfaces/tag';
import { DynamicPhoneComponent } from 'src/app/shared/components/dynamic-phone/dynamic-phone.component';
import { DynamicHostDirective } from 'src/app/shared/directives/dynamic-host.directive';
import { UpdateContactService } from '../../services/update-contact.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css'],
})
export class ContactInfoContainerComponent implements OnInit {
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
  editContactForm!: FormGroup;

  //form arrays
  emailsArray: any;
  phonesArray: any;
  tagsArray: any;

  //dynamic components related
  @ViewChild(DynamicHostDirective, { read: ViewContainerRef })
  public dynamicHost!: ViewContainerRef;
  private componentRef!: ComponentRef<DynamicPhoneComponent>;
  public phoneIndex: number = 0;
  public componentReference: ComponentRef<DynamicPhoneComponent>[] = [];
  auxPhoneArray: any = [];

  //user data from local storage
  public contact: any;

  constructor(
    private formBuilder: FormBuilder,
    private updateContactService: UpdateContactService,
    private localStorageService: LocalStorageService
  ) {
    this.editContactForm = this.formBuilder.group({
      contactPhoto: new FormControl('', [Validators.required]),
      contactFirstName: new FormControl('', [Validators.required]),
      contactLastName: new FormControl('', [Validators.required]),
      contactCompany: new FormControl('', [Validators.required]),
      contactEmails: this.formBuilder.array([]),
      contactBirthday: new FormControl('', [Validators.required]),
      contactAlias: new FormControl('', [Validators.required]),
      contactNotes: new FormControl('', [Validators.required]),
      contactTags: this.formBuilder.array([]),
      contactPhones: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.displayContactInfo();
    this.setFormData();
  }

  public displayContactInfo() {
    this.contact = this.localStorageService.getItem('contact');
  }

  setFormData() {
    this.editContactForm.patchValue({
      contactPhoto: this.contact.contactPhoto,
      contactCompany: this.contact.contactCompany,
      contactFirstName: this.contact.contactFirstName,
      contactLastName: this.contact.contactLastName,
      // contactEmails: this.contact.contactEmails,
      contactBirthday: this.contact.contactBirthday,
      contactAlias: this.contact.contactAlias,
      contactNotes: this.contact.contactNotes,
      // contactTags: this.contact.contactTags,
      // contactPhones: this.contact.contactPhones,
    });

    //EMAILS
    this.emailsArray = this.editContactForm.get('contactEmails') as FormArray;
    this.emailsArray.clear();
    this.contact.contactEmails.map((email: Email) => {
      this.emailsArray.push(
        new FormControl(email.emailValue, [
          Validators.required,
          Validators.email,
        ])
      );
    });

    //PHONES
    this.phonesArray = this.editContactForm.get('contactPhones') as FormArray;
    this.phonesArray.clear();
    this.contact.contactPhones.map((phone: Phone) => {
      const phoneFormGroup = new FormGroup({
        phoneId: new FormControl(phone.phoneId, Validators.required),
        phoneValue: new FormControl(phone.phoneValue, Validators.required),
        phoneType: new FormControl(phone.phoneType, Validators.required),
      });

      this.phonesArray.push(phoneFormGroup);
    });

    //TAGS
    this.tagsArray = this.editContactForm.get('contactTags') as FormArray;
    this.tagsArray.clear();
    this.contact.contactTags.map((tag: Tag) => {
      this.tagsArray.push(new FormControl(tag.tagValue));
    });
  }

  //getters for form arrays

  //returns EMAILS as a form array
  get contactEmailsFormArray(): FormArray {
    return this.editContactForm.get('contactEmails') as FormArray;
  }

  //returns PHONES as a form array
  get contactPhonesFormArray(): FormArray {
    return this.editContactForm.get('contactPhones') as FormArray;
  }

  //returns TAGS as a form array
  get contactTagsFormArray(): FormArray {
    return this.editContactForm.get('contactTags') as FormArray;
  }

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

  //dynamic component functions
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

  public deleteAllComponents() {
    this.componentReference.forEach((component) => {
      component.destroy();
    });
  }

  public deleteComponent(index: number): void {
    this.contactPhonesFormArray.removeAt(index);
    if (this.componentReference[index]) {
      this.componentReference[index].destroy();
      this.componentReference.splice(index, 1);
    }
  }

  validateInputInsertion() {
    if (this.auxPhoneArray.length > 0) {
      for (let i = 0; i < this.phoneIndex; i++) {
        this.contactPhonesFormArray.push(this.auxPhoneArray[i]);
      }
    } else {
      alert('No has modificado los datos');
    }
  }

  resetValues() {
    this.auxPhoneArray = [];
    this.componentReference = [];
  }

  //Update contact info
  public updateContactInfo() {
    this.validateInputInsertion();
    this.deleteAllComponents();

    const contactData = this.editContactForm.value;
    const contactId = this.contact.contactId;

    //descomentar lo de abajo justo cuando tenga resuelto lo de los correos y etiquetas
    // this.localStorageService.setItem('contact', contactData);

    console.log('info del form del usuaio', contactData);

    console.log(
      'info de usuario de localStorage',
      this.localStorageService.getItem('contact')
    );

    this.resetValues();

    console.log('Formulario con datos actualizados:', contactData);

    this.updateContactService.updateContact(contactData, contactId).subscribe({
      next: (response) => {
        if (response.succeed) {
          console.log('Actualización exitosa: ', response);
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
