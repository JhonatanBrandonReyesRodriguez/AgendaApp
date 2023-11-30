import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactCardComponent } from 'src/app/shared/components/contact-card/contact-card.component';
import { ContactsContainerComponent } from './pages/contacts-container/contacts-container.component';

const routes: Routes = [{ path: '', component: ContactsContainerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsRoutingModule {}
