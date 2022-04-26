import { Injectable } from '@angular/core';
import { contactList, IContact } from '../../utils/types';
import { baselineElements } from '../../utils/baselineElements';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private key: string = 'contacts storage';
  private contacts: contactList = this.getBaseContacts();
  private contactListSubject = new Subject<any>();
  private filterSubject = new Subject<any>();
  private filter: string = '';

  constructor() {}

  //filter options
  setFilter(newFilter: string) {
    this.filter = newFilter;
    this.filterSubject.next(this.filter);
    this.contactListSubject.next(this.getVisibleContacts());
  }

  getFilter(): Observable<string> {
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

  //contact list options
  getExistingContacts() {
    return this.contacts;
  }

  getContacts(): Observable<contactList> {
    return this.contactListSubject.asObservable();
  }

  onAddContact(newContact: IContact) {
    this.contacts.push(newContact);
    this.filter = '';
    this.filterSubject.next(this.filter);
    this.contactListSubject.next(this.getVisibleContacts());
    this.updateLocalStorage();
  }

  onDelete(contact: IContact): void {
    console.log(this.contacts);
    this.contacts = this.contacts.filter((c) => c.id !== contact.id);
    this.contactListSubject.next(this.getVisibleContacts());
    this.updateLocalStorage();
  }

  onEditContact(newDetails: IContact): void {
    this.contacts.map((contact) => {
      if (contact.id === newDetails.id) {
        Object.assign(contact, newDetails);
        this.contactListSubject.next(this.contacts);
      }
    });
    this.updateLocalStorage();
  }

  //contact details
  getContactDetails(id: string): IContact {
    let contactDetails: IContact = {
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
        contactDetails = contact;
        return contactDetails;
      }
    }

    return contactDetails;
  }

  //local storage
  updateLocalStorage() {
    localStorage.setItem(this.key, JSON.stringify(this.contacts));
  }

  getLocalStorageContacts() {
    const storage = localStorage.getItem(this.key);
    if (typeof storage === 'string') {
      return JSON.parse(storage);
    }
    return null;
  }

  getBaseContacts() {
    if (this.getLocalStorageContacts()) {
      return this.getLocalStorageContacts();
    }

    return baselineElements;
  }
}
