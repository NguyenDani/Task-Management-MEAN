import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  constructor( private router: Router ) {}

  logoutButton(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
