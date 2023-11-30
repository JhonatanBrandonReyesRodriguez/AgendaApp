import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ContactImageComponent } from './components/contact-image/contact-image.component';

@NgModule({
  declarations: [NavbarComponent, LogoutComponent, ContactImageComponent],
  imports: [CommonModule],
  exports: [NavbarComponent, LogoutComponent, ContactImageComponent],
})
export class SharedModule {}
