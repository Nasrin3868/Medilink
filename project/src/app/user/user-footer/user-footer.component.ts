import { Component } from '@angular/core';

@Component({
  selector: 'app-user-footer',
  templateUrl: './user-footer.component.html',
  styleUrls: ['./user-footer.component.css']
})
export class UserFooterComponent {
  footerLinks = [
    { label: 'About Us' },
    { label: 'Terms and Conditions' },
    { label: 'Account' },
    { label: 'License' }
  ];
}
