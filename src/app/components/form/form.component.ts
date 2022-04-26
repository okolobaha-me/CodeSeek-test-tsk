import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { IContact } from '../../../utils/types';
import { ContactsService } from '../../services/contacts.service';
import { Notify } from 'notiflix';
import { nanoid } from 'nanoid';

export function IpValidator(control: FormControl): ValidationErrors {
  // @ts-ignore
  return /(\d{1,3}\.){3}\d{1,3}/.test(control.value) ? null : { ip: true };
}

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
  form = new FormGroup({});

  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
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

  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        placeholder: 'Enter name',
        required: true,
        maxLength: 20,
      },
      validation: {
        messages: {
          minLength: 'hi',
        },
      },
      expressionProperties: {
        'templateOptions.disabled': 'formState.disabled',
      },
    },
    {
      key: 'surname',
      type: 'input',
      templateOptions: {
        label: 'Surname',
        placeholder: 'Enter surname',
        required: false,
        maxLength: 20,
      },
      expressionProperties: {
        'templateOptions.disabled': 'formState.disabled',
      },
    },
    {
      key: 'phoneNumber',
      type: 'input',
      templateOptions: {
        type: 'tel',
        label: 'Phone number',
        placeholder: 'Enter phone',
        required: true,
        pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) => {
            const value = field.formControl;
            if (typeof value === 'object') {
              return `"${value.value}" is not a valid phone number`;
            }
            return ``;
          },
        },
      },
      expressionProperties: {
        'templateOptions.disabled': 'formState.disabled',
      },
    },
    {
      key: 'birthDate',
      type: 'input',
      templateOptions: {
        type: 'date',
        label: 'Birth date',
        placeholder: 'Enter phone',
        required: false,
      },
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        label: 'Email address',
        placeholder: 'Enter email',
        required: false,
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) => {
            const value = field.formControl;
            if (typeof value === 'object') {
              return `"${value.value}" is not a valid email`;
            }
            return ``;
          },
        },
      },
      expressionProperties: {
        'templateOptions.disabled': 'formState.disabled',
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
