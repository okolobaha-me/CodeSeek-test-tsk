import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactItemComponent } from './components/contact-item/contact-item.component';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { FormComponent } from './components/form/form.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

const appRoutes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'details/:id', component: DetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactItemComponent,
    DetailsComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'this field is required' },
      ],
    }),
    FormlyBootstrapModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
