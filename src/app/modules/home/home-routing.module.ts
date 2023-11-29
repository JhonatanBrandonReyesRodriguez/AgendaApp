import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'contacts',
    loadChildren: () =>
      import('../contacts/contacts.module').then((m) => m.ContactsModule),
  },

  {
    path: '**',
    redirectTo: 'contacts',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
