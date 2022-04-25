import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';

const appRoutes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'details/:id', component: DetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactItemComponent,
    AddFormComponent,
    DetailsComponent,
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
