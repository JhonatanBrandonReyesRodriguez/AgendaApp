import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactsListComponent } from './pages/contacts-list/contacts-list.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';

@NgModule({
  declarations: [ContactsListComponent, SidebarComponent],
  imports: [CommonModule, ContactsRoutingModule, SharedModule],
})
export class ContactsModule {}
