import { Component, OnInit } from '@angular/core';
import { Notify } from 'notiflix';
import { IContact } from '../../../utils/types';
import { nanoid } from 'nanoid';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
})
export class AddFormComponent implements OnInit {
  name: string;
  surname: string;
  phoneNumber: string;
  birthDate: string;
  email: string;
  address: string;

  constructor(private contactService: ContactsService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.name || !this.phoneNumber) {
      Notify.failure('Please fill name & phone number fields');
      return;
    }

    const newContact: IContact = {
      id: nanoid(),
      name: this.name,
      surname: this.surname,
      phoneNumber: this.phoneNumber,
      birthDate: this.birthDate,
      email: this.email,
      address: this.address,
    };

    this.contactService.onAddContact(newContact);

    this.name = '';
    this.surname = '';
    this.phoneNumber = '';
    this.birthDate = '';
    this.email = '';
    this.address = '';
  }
}
