import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddContactFormRoutingModule } from './add-contact-form-routing.module';
import { AddContactFormComponent } from './pages/add-contact-form/add-contact.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddContactFormComponent],
  imports: [
    CommonModule,
    AddContactFormRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class AddContactFormModule {}
