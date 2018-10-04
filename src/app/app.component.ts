import { Component } from '@angular/core';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contacts';

  contacts = [];
  current = null;
  query = null;
  name = null;
  email = null;

  constructor(private contactsService: ContactsService) {
  }

  loadContacts() {
    this.contactsService.getContacts().subscribe((data) => this.contacts = data.data.contacts);
  }

  ngOnInit() {
    this.loadContacts();
  }

  onSearch() {
    this.contactsService.getContact(this.query).subscribe((data) => this.current = data.data.contact);
  }

  onCreate() {
    this.contactsService.addContact(this.name, this.email).subscribe((data) => this.loadContacts());
  }
}
