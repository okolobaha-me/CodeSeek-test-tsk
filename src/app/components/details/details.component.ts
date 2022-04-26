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
  idSubscription: Subscription;
  detailsSubscription: Subscription;
  isEditing: boolean = false;
  editingModel: IContact;

  name: string = '';
  surname: string = '';
  phoneNumber: string = '';
  birthDate: string = '';
  email: string = '';
  address: string = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private contactsService: ContactsService
  ) {
    this.idSubscription = activateRoute.params.subscribe((params) => {
      this.contact = this.contactsService.getContactDetails(params['id']);
      this.id = params['id'];
    });
  }

  ngOnInit(): void {}

  toggleEditing() {
    this.editingModel = Object.assign({}, this.contact);
    this.isEditing = !this.isEditing;
  }

  handleEdit(newDetails: IContact) {
    this.contact = newDetails;

    this.toggleEditing();
  }
}
