import { Injectable } from '@angular/core';
import { contactList, IContact } from '../../utils/types';
import { baselineElements } from '../../utils/baselineElements';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private contacts: contactList = baselineElements;
  private subject = new Subject<any>();

  constructor() {}

  onAddContact(newContact: IContact) {
    this.contacts.push(newContact);
    this.subject.next(this.contacts);
  }

  getExistingContacts() {
    return this.contacts;
  }

  onDelete(contact: IContact): void {
    this.contacts = this.contacts.filter((c) => c.id !== contact.id);
    this.subject.next(this.contacts);
  }

  getContacts(): Observable<any> {
    return this.subject.asObservable();
  }
}
