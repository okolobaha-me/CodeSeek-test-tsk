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
  private filter: string = '';
  private filterSubject = new Subject<any>();

  constructor() {}

  setFilter(newFilter: string) {
    this.filter = newFilter;
    this.filterSubject.next(this.filter);
    this.subject.next(this.getVisibleContacts());
  }

  getFilter(): Observable<any> {
    return this.filterSubject.asObservable();
  }

  getVisibleContacts() {
    const filter = this.filter.toLowerCase();
    return this.contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(filter) ||
        c.phoneNumber.toLowerCase().includes(filter) ||
        c.surname.toLowerCase().includes(filter)
    );
  }

  onAddContact(newContact: IContact) {
    this.contacts.push(newContact);
    this.filter = '';
    this.filterSubject.next(this.filter);
    this.subject.next(this.getVisibleContacts());
  }

  getExistingContacts() {
    return this.contacts;
  }

  onDelete(contact: IContact): void {
    this.contacts = this.contacts.filter((c) => c.id !== contact.id);
    this.subject.next(this.getVisibleContacts());
  }

  getContacts(): Observable<any> {
    return this.subject.asObservable();
  }

  getContactDetails(id: string): IContact {
    let c: IContact = {
      id: '',
      name: '',
      surname: '',
      phoneNumber: '',
      birthDate: '',
      email: '',
      address: '',
    };

    for (const contact of this.contacts) {
      if (contact.id === id) {
        c = contact;
        return contact;
      }
    }

    return c;
  }
}
