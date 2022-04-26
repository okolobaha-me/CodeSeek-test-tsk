import { Component, OnInit } from '@angular/core';
import { contactList, IContact } from '../../../utils/types';
import { ContactsService } from '../../services/contacts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  filter: string;
  contacts: contactList = this.contactService.getExistingContacts();
  subscription: Subscription;
  filterSubscription: Subscription;

  constructor(private contactService: ContactsService) {
    this.subscription = this.contactService
      .getContacts()
      .subscribe((value) => (this.contacts = value));

    this.filterSubscription = this.contactService
      .getFilter()
      .subscribe((value) => (this.filter = value));
  }

  ngOnInit(): void {}

  deleteContact(contact: IContact) {
    this.contactService.onDelete(contact);
  }

  setFilter() {
    this.contactService.setFilter(this.filter);
  }
}
