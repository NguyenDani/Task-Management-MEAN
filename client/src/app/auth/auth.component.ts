import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  username: string = "";
  password: string = "";

  isRegister: boolean = false;

  toggleAuthMode(): void {
    this.username = '';
    this.password = '';
    this.isRegister = !this.isRegister;
  }

  handleAuth(): void {
    console.log(this.username);
  }
}
