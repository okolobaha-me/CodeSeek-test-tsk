import { Component, OnInit, Input } from '@angular/core';
import { IContact } from '../../../utils/types';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css'],
})
export class ContactItemComponent implements OnInit {
  @Input() contact: IContact;

  constructor() {}

  ngOnInit(): void {}
}
