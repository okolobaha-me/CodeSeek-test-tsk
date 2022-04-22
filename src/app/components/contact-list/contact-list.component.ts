import { Component, OnInit } from '@angular/core';
import { baselineElements } from '../../../utils/baselineElements';
import { IContact } from '../../../utils/types';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: IContact[] = baselineElements;
  constructor() {}

  ngOnInit(): void {}
}
