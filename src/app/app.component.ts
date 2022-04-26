import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CodeSeek';
  isOpenAddModal: boolean = false;

  constructor(private router: Router) {}

  hasRoute(route: string) {
    return this.router.url === route;
  }

  toggleOpenModal() {
    this.isOpenAddModal = !this.isOpenAddModal;
  }
}
