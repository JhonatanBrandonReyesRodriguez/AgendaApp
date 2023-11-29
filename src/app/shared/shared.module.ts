import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from '../modules/contacts/pages/sidebar/sidebar.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [NavbarComponent, LogoutComponent],
  imports: [CommonModule],
  exports: [NavbarComponent, LogoutComponent],
})
export class SharedModule {}
