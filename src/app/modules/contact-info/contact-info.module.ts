import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactInfoRoutingModule } from './contact-info-routing.module';
import { ContactCardComponent } from 'src/app/shared/components/contact-card/contact-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactInfoContainerComponent } from './pages/contact-info-container/contact-info-container.component';

@NgModule({
  declarations: [ContactInfoContainerComponent, ContactCardComponent],
  imports: [CommonModule, ContactInfoRoutingModule, SharedModule],
})
export class ContactInfoModule {}
