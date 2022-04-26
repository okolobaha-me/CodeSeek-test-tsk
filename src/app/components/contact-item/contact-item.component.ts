import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IContact } from '../../../utils/types';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css'],
})
export class ContactItemComponent implements OnInit {
  @Input() contact: IContact;
  @Output() onDeleteContact: EventEmitter<IContact> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDelete(contact: IContact) {
    this.onDeleteContact.emit(contact);
  }
}
