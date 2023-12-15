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
import { MatSnackBar } from '@angular/material/snack-bar';

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

  //individual values
  phoneValue: string = 'phoneValue';
  tagValue: string = 'tagValue';
  emailValue: string = 'emailValue';
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
    private localStorageService: LocalStorageService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.displayContactInfo();
    this.initForm();
    this.setFormData();
  }

  initForm() {
    this.editContactForm = this.formBuilder.group({
      contactId: this.contact.contactId,
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

  public displayContactInfo() {
    this.contact = this.localStorageService.getItem('contact');
    console.log('Info del contacto', this.contact);
  }

  setFormData() {
    this.editContactForm.patchValue({
      contactId: this.contact.contactId,
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
      const emailFormGroup = new FormGroup({
        emailId: new FormControl(email.emailId),
        emailValue: new FormControl(email.emailValue),
      });
      this.emailsArray.push(emailFormGroup);
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
      const tagFormGroup = new FormGroup({
        tagId: new FormControl(tag.tagId),
        tagValue: new FormControl(tag.tagValue),
      });
      this.tagsArray.push(tagFormGroup);
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
    this.phoneIndex = this.dynamicHost.indexOf(this.componentRef.hostView) + 1;
  }

  //dynamic component functions
  public addNewPhone(): void {
    const phoneFormGroup = new FormGroup({
      phoneId: new FormControl(
        this.phoneIndex + this.contactPhonesFormArray.length + 1,
        Validators.required
      ),
      phoneValue: new FormControl('', Validators.required),
      phoneType: new FormControl('mobile', Validators.required),
    });

    const phone = phoneFormGroup.controls.phoneValue;
    this.auxPhoneArray.push(phoneFormGroup);

    if (this.componentReference) {
      this.createComponent(phoneFormGroup, phone);
    }
  }

  public addNewEmail() {
    const emailFormGroup = new FormGroup({
      emailId: new FormControl(
        this.phoneIndex + this.contactPhonesFormArray.length + 1
      ),
      emailValue: new FormControl(''),
    });

    this.contactEmailsFormArray.push(emailFormGroup);
  }

  public deleteEmail(index: number) {
    this.contactEmailsFormArray.removeAt(index - 1);
    console.log('deleted email: ', index);
  }

  deleteTag(index: number) {
    this.contactTagsFormArray.removeAt(index - 1);
    console.log('deleted tag: ', index);
  }

  deletePhone(index: number) {
    this.contactPhonesFormArray.removeAt(index - 1);
    console.log('deleted phone: ', index);
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
    }
  }

  resetValues() {
    this.auxPhoneArray = [];
    this.componentReference = [];
  }

  //Update contact info
  public updateContactInfo() {
    // if (this.editContactForm.valid) {
    this.validateInputInsertion();
    this.deleteAllComponents();

    const contactData = this.editContactForm.value;
    const contactId = this.contact.contactId;

    this.localStorageService.setItem('contact', contactData);

    this.displayContactInfo();

    this.resetValues();

    // console.log('Formulario con nuevos datos:', contactData);

    this.updateContactService.updateContact(contactData, contactId).subscribe({
      next: (response) => {
        if (response.succeed) {
          console.log('Actualización exitosa: ', response);

          this._snackBar.open('Actualización exitosa', 'Aceptar', {
            duration: 5000,
            panelClass: ['green-snackbar'],
          });
        } else {
          console.log('No se pudieron cargar los datos', response.error);
        }
      },
      error: (error) => {
        console.log('Error: ', error);
      },
    });
    // }
  }
}
