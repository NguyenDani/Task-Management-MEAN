import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, ToastrService],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  isRegistering: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  handleAuth(): void {
    if (!this.username || !this.password) {
      this.toastr.error("Please provide both username and password!");
      return;
    }
    if (this.isRegistering) {
      this.http.post('http://localhost:5001/auth/register', { username: this.username, password: this.password })
        .subscribe({
          next: () => {
            this.toastr.success("Account created!");
            this.toggleAuthMode();
          },
          error: (error) => {
            this.toastr.error("There was a problem registering, please try again.");
          }
        });
    } else {
      this.http.post('http://localhost:5001/auth/login', { username: this.username, password: this.password })
      .subscribe({
        next: () => {
          this.toastr.success("Login successful!");
          this.router.navigate(['/chat']);
        },
        error: (error) => {
          this.toastr.error("Invalid username or password");
        }
      });
    }
  }

  toggleAuthMode(): void {
    this.username = '';
    this.password = '';
    this.isRegistering = !this.isRegistering;
  }
}
