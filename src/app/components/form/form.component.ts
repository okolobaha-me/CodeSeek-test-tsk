import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IContact } from '../../../utils/types';
import { ContactsService } from '../../services/contacts.service';
import { Notify } from 'notiflix';
import { nanoid } from 'nanoid';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input()
  type: 'add' | 'edit';
  @Input()
  contact: IContact = {
    id: '',
    name: '',
    surname: '',
    phoneNumber: '',
    birthDate: '',
    email: '',
    address: '',
  };

  @Output()
  submit: EventEmitter<IContact> = new EventEmitter();

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {}

  onSubmit(model: IContact) {
    if (!model.name || !model.phoneNumber) {
      Notify.failure('Please fill name & phone number fields');
      return;
    }

    if (this.type === 'edit') {
      this.contactsService.onEditContact(this.contact);
      this.submit.emit(this.contact);
      return;
    }
    model.id = nanoid();
    this.contactsService.onAddContact(model);
    this.contact = {
      id: '',
      name: '',
      surname: '',
      phoneNumber: '',
      birthDate: '',
      email: '',
      address: '',
    };
  }

  form = new FormGroup({});

  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        placeholder: 'Enter name',
        required: true,
      },
    },
    {
      key: 'surname',
      type: 'input',
      templateOptions: {
        label: 'Surname',
        placeholder: 'Enter surname',
        required: false,
      },
    },
    {
      key: 'phoneNumber',
      type: 'tel',
      templateOptions: {
        label: 'Phone number',
        placeholder: 'Enter phone',
        required: false,
      },
    },
    {
      key: 'birthDate',
      type: 'input',
      templateOptions: {
        label: 'Birth date',
        placeholder: 'Enter phone',
        required: false,
      },
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: false,
      },
    },
    {
      key: 'address',
      type: 'input',
      templateOptions: {
        label: 'Address',
        placeholder: 'Enter address',
        required: false,
      },
    },
  ];
}
