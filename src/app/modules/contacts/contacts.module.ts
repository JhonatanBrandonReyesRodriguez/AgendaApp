import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactsContainerComponent } from './pages/contacts-container/contacts-container.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@NgModule({
  declarations: [ContactsContainerComponent, SidebarComponent],
  imports: [CommonModule, ContactsRoutingModule, SharedModule],
  providers: [SidebarComponent],
})
export class ContactsModule {}
