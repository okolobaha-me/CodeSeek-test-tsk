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
  contacts: contactList = this.contactService.getExistingContacts();
  subscription: Subscription;

  constructor(private contactService: ContactsService) {
    this.subscription = this.contactService
      .getContacts()
      .subscribe((value) => (this.contacts = value));
  }

  ngOnInit(): void {}

  deleteContact(contact: IContact) {
    this.contactService.onDelete(contact);
  }
}
