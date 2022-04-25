import { Component, OnInit } from '@angular/core';
import { IContact } from '../../../utils/types';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  id: string = '';
  contact: IContact;
  subscription: Subscription;

  constructor(
    private activateRoute: ActivatedRoute,
    private contactsService: ContactsService
  ) {
    this.subscription = activateRoute.params.subscribe((params) => {
      this.contact = this.contactsService.getContactDetails(params['id']);

      this.id = params['id'];
    });
  }

  ngOnInit(): void {}
}
